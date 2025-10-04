// 工具调用信息类型
export interface ToolCall {
  tool_call_id: string;
  tool_name: string;
  tool_args: Record<string, any>;
  result?: string;
  duration?: number;
}

// 内容块类型 - 可以是文本或工具调用
export interface ContentBlock {
  type: 'text' | 'tool_call_started' | 'tool_call_completed';
  text?: string;  // 当 type 为 'text' 时使用
  toolCall?: ToolCall;  // 当 type 为 'tool_call_*' 时使用
  order: number;  // 用于排序
}

// 基础消息类型
export interface Message {
  id: number;
  text: string;  // 保留用于向后兼容，但主要使用 blocks
  sender: 'user' | 'assistant';
  timestamp: Date;
  blocks?: ContentBlock[];  // 按顺序的内容块
}

// 工具类型
export interface Tool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// 页面类型
export type Page = 'home' | 'chat' | 'about';

// 聊天历史相关类型
export interface ChatHistoryItem {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  created_at: number;
}

export interface ChatHistoryResponse {
  success: boolean;
  data: {
    history: ChatHistoryItem[];
  };
  message?: string;
}

// API 错误类型
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// 流式响应事件类型
export type StreamEventType = 'RunContent' | 'RunCompleted' | 'RunError' | 'ToolCallStarted' | 'ToolCallCompleted';

export interface StreamEvent {
  type: StreamEventType;
  data: any;
}

// 工具调用事件数据类型
export interface ToolCallEventData {
  tool_call_id: string;
  tool_name: string;
  tool_args: Record<string, any>;
  tool_call_error?: boolean;
  result?: string;
  metrics?: {
    duration: number;
  };
  content?: string;
}

// 用户会话类型
export interface UserSession {
  id: string;
  userId: string;
  createdAt: Date;
  lastActivity: Date;
}

// 应用状态类型
export interface AppState {
  currentPage: Page;
  isLoading: boolean;
  error: string | null;
}

// 聊天状态类型
export interface ChatState {
  messages: Message[];
  sessionId?: string;
  isTyping: boolean;
}

// 工具状态类型
export interface ToolsState {
  tools: Tool[];
  enabledCount: number;
}

// 作者信息相关类型定义
export interface AuthorInfo {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  skills: string[];
  contact: {
    email: string;
    github: string;
  };
  funFacts: string[];
  additionalInfo?: {
    location?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// API响应类型
export interface AuthorInfoResponse {
  success: boolean;
  data: AuthorInfo;
  message?: string;
}

// 通用 API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 分页响应类型
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 事件处理器类型
export type EventHandler<T = any> = (event: T) => void;
export type AsyncEventHandler<T = any> = (event: T) => Promise<void>;

// 组件 Props 基础类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 表单相关类型
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface FormData {
  [key: string]: string | number | boolean;
}

// 主题相关类型
export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  current: Theme;
  system: Theme;
}
