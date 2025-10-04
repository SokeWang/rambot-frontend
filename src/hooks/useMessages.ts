import { useState, useRef, useEffect } from 'react';
import { Message, ToolCall, ContentBlock } from '../types';
import { INITIAL_MESSAGE } from '../constants';
import { scrollToBottom, ChatHistoryItem } from '../utils';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef<number>(INITIAL_MESSAGE.id + 1);
  const blockOrderRef = useRef<Record<number, number>>({}); // 记录每个消息的当前块顺序

  useEffect(() => {
    scrollToBottom(messagesEndRef.current);
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'assistant') => {
    const id = nextIdRef.current++;
    const newMessage: Message = {
      id,
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateAssistantResponse = () => {
    setTimeout(() => {
      addMessage("Thank you for your message! This is a demo response from the assistant.", 'assistant');
    }, 1000);
  };

  const startAssistantMessage = (): number => {
    const newId = nextIdRef.current++;
    const newMessage: Message = {
      id: newId,
      text: '',
      sender: 'assistant',
      timestamp: new Date(),
      blocks: []
    };
    blockOrderRef.current[newId] = 0; // 初始化块顺序计数器
    setMessages(prev => [...prev, newMessage]);
    return newId;
  };

  const appendToMessage = (id: number, chunk: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const blocks = m.blocks || [];
        const lastBlock = blocks[blocks.length - 1];
        
        // 如果最后一个块是文本块，追加到它；否则创建新的文本块
        if (lastBlock && lastBlock.type === 'text') {
          const updatedBlocks = [...blocks];
          updatedBlocks[updatedBlocks.length - 1] = {
            ...lastBlock,
            text: (lastBlock.text || '') + chunk
          };
          return { 
            ...m, 
            text: m.text + chunk,
            blocks: updatedBlocks 
          };
        } else {
          // 创建新的文本块
          const order = blockOrderRef.current[id]++;
          const newBlock: ContentBlock = {
            type: 'text',
            text: chunk,
            order
          };
          return { 
            ...m, 
            text: m.text + chunk,
            blocks: [...blocks, newBlock] 
          };
        }
      }
      return m;
    }));
  };

  const addToolCallToMessage = (id: number, toolCall: ToolCall, isCompleted: boolean = false) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const blocks = m.blocks || [];
        
        // 查找是否已存在该工具调用的 started 块
        const existingIndex = blocks.findIndex(
          b => b.type === 'tool_call_started' && b.toolCall?.tool_call_id === toolCall.tool_call_id
        );
        
        if (existingIndex >= 0 && isCompleted) {
          // 如果是完成事件，替换 started 块为 completed 块（保持相同的 order）
          const updatedBlocks = [...blocks];
          updatedBlocks[existingIndex] = {
            type: 'tool_call_completed',
            toolCall,
            order: updatedBlocks[existingIndex].order  // 保持原有顺序
          };
          return { ...m, blocks: updatedBlocks };
        } else if (existingIndex >= 0) {
          // 更新现有的 started 块
          const updatedBlocks = [...blocks];
          updatedBlocks[existingIndex] = {
            ...updatedBlocks[existingIndex],
            toolCall
          };
          return { ...m, blocks: updatedBlocks };
        } else {
          // 添加新的工具调用 started 块
          const order = blockOrderRef.current[id]++;
          const newBlock: ContentBlock = {
            type: 'tool_call_started',
            toolCall,
            order
          };
          return { ...m, blocks: [...blocks, newBlock] };
        }
      }
      return m;
    }));
  };

  const loadHistory = (history: ChatHistoryItem[]) => {
    const historyMessages: Message[] = [];
    let currentMessage: Message | null = null;
    let blockOrder = 0;

    for (let i = 0; i < history.length; i++) {
      const item = history[i];

      if (item.role === 'user') {
        // 用户消息，如果有待完成的消息先添加
        if (currentMessage) {
          historyMessages.push(currentMessage);
          currentMessage = null;
        }
        // 创建新的用户消息
        historyMessages.push({
          id: nextIdRef.current++,
          text: item.content,
          sender: 'user',
          timestamp: new Date(item.created_at * 1000)
        });
      } else if (item.role === 'tool') {
        // 工具消息，创建或追加到当前 assistant 消息
        if (!currentMessage) {
          currentMessage = {
            id: nextIdRef.current++,
            text: '',
            sender: 'assistant',
            timestamp: new Date(item.created_at * 1000),
            blocks: []
          };
          blockOrder = 0;
        }

        // 尝试从内容中提取工具名称和参数
        let toolName = '工具调用';
        const toolArgs: Record<string, any> = {};
        
        // 简单解析：如果内容包含 "根据用户的问题:" 则判断为占卜工具
        if (item.content.includes('根据用户的问题:') || item.content.includes('得到卦象为:')) {
          toolName = '易经占卜';
          // 尝试提取问题
          const questionMatch = item.content.match(/根据用户的问题:\s*([^，,]+)/);
          if (questionMatch) {
            toolArgs.question = questionMatch[1].trim();
          }
        }

        // 解析工具消息内容并添加为 completed 块
        const toolBlock: ContentBlock = {
          type: 'tool_call_completed',
          toolCall: {
            tool_call_id: `history_${i}`,
            tool_name: toolName,
            tool_args: toolArgs,
            result: item.content
          },
          order: blockOrder++
        };
        currentMessage.blocks = currentMessage.blocks || [];
        currentMessage.blocks.push(toolBlock);
      } else if (item.role === 'assistant') {
        // Assistant 消息
        if (!currentMessage) {
          currentMessage = {
            id: nextIdRef.current++,
            text: '',
            sender: 'assistant',
            timestamp: new Date(item.created_at * 1000),
            blocks: []
          };
          blockOrder = 0;
        }

        // 添加文本块
        const textBlock: ContentBlock = {
          type: 'text',
          text: item.content,
          order: blockOrder++
        };
        currentMessage.text += item.content;
        currentMessage.blocks = currentMessage.blocks || [];
        currentMessage.blocks.push(textBlock);

        // Assistant 消息完成，添加到列表
        historyMessages.push(currentMessage);
        currentMessage = null;
      }
    }

    // 如果还有未完成的消息，添加它
    if (currentMessage) {
      historyMessages.push(currentMessage);
    }

    setMessages([INITIAL_MESSAGE, ...historyMessages]);
  };

  return {
    messages,
    messagesEndRef,
    addMessage,
    simulateAssistantResponse,
    startAssistantMessage,
    appendToMessage,
    addToolCallToMessage,
    loadHistory
  };
};
