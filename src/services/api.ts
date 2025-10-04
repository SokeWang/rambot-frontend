/**
 * API 服务层 - 处理所有与后端 API 的交互
 */

import { ChatHistoryItem, ChatHistoryResponse } from '../types';

const API_BASE_URL = 'https://ai-mindflicker.com/api/v1';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 获取聊天历史记录
 */
export const fetchChatHistory = async (sessionId: string): Promise<ChatHistoryItem[]> => {
  const url = `${API_BASE_URL}/sessions/${sessionId}`;
  const params = new URLSearchParams({ type: 'agent' });
  
  const response = await fetch(`${url}?${params}`);
  
  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`, response.status, response);
  }
  
  const data: ChatHistoryResponse = await response.json();
  
  if (data.success) {
    return data.data.history;
  } else {
    throw new ApiError(data.message || 'Failed to fetch chat history');
  }
};

/**
 * 流式运行 Agent
 */
export const streamAgentRun = async (
  message: string,
  userId: string,
  onLine: (line: string) => void,
  options?: { sessionId?: string; onRunCompleted?: (sessionId?: string) => void }
): Promise<void> => {
  const url = `${API_BASE_URL}/agents/rambot/runs`;

  const body = new URLSearchParams();
  body.append('message', message);
  body.append('user_id', userId);
  if (options?.sessionId) {
    body.append('session_id', options.sessionId);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => '');
    throw new ApiError(`HTTP ${response.status}: ${text}`, response.status, response);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let currentEvent: string | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      
      // 解析 SSE: event: X / data: Y
      if (line.startsWith('event:')) {
        currentEvent = line.slice(6).trim();
        continue;
      }
      
      if (line.startsWith('data:')) {
        const payload = line.slice(5).trim();
        
        // 仅在 RunContent 提取 content（避免 RunCompleted 重复展示）
        if (currentEvent === 'RunContent') {
          try {
            const obj = JSON.parse(payload);
            const content = typeof obj?.content === 'string' ? obj.content : '';
            if (content) onLine(content);
          } catch {
            // data 不是 JSON，忽略
          }
        } else if (currentEvent === 'RunCompleted') {
          // 记录 session_id（如果首条请求未带 session_id，后端会在 RunCompleted 中返回）
          try {
            const obj = JSON.parse(payload);
            if (options?.onRunCompleted) {
              const sid = typeof obj?.session_id === 'string' ? obj.session_id : undefined;
              options.onRunCompleted(sid);
            }
          } catch {
            // 忽略
          }
        }
        continue;
      }
      
      // 空行表示一个 event 块结束
      if (line === '') {
        currentEvent = null;
      }
    }
  }

  const last = buffer.trim();
  if (last) {
    if (last.startsWith('event:')) {
      currentEvent = last.slice(6).trim();
    } else if (last.startsWith('data:')) {
      const payload = last.slice(5).trim();
      if (currentEvent === 'RunContent') {
        try {
          const obj = JSON.parse(payload);
          const content = typeof obj?.content === 'string' ? obj.content : '';
          if (content) onLine(content);
        } catch {
          // 忽略
        }
      }
    }
  }
};
