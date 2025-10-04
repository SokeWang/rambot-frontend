import { Tool, Message } from '../types';

export const INITIAL_TOOLS: Tool[] = [
  {
    id: 'web-search',
    name: '网络搜索',
    description: '搜索最新的网络信息和资料',
    enabled: true
  },
  {
    id: 'code-interpreter',
    name: '代码解释器',
    description: '执行和解释代码片段',
    enabled: false
  },
  {
    id: 'image-generator',
    name: '图像生成',
    description: '生成和编辑图像内容',
    enabled: false
  },
  {
    id: 'file-analyzer',
    name: '文件分析',
    description: '分析和处理上传的文件',
    enabled: true
  },
  {
    id: 'calculator',
    name: '计算器',
    description: '执行数学计算和公式',
    enabled: false
  }
];

export const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hello! Welcome to our chat app. How can I help you today?",
  sender: 'assistant',
  timestamp: new Date()
};
