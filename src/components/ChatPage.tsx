import React, { useState } from 'react';
import { Send, Settings, X, Check, Wrench, ChevronDown, ChevronUp } from 'lucide-react'; // Settings 用于注释掉的 Tools 按钮
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, Tool, ContentBlock } from '../types';
import { formatTime } from '../utils';

interface ChatPageProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onSendMessage: (e: React.FormEvent) => void;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  tools: Tool[];
  toggleTool: (toolId: string) => void;
  enabledToolsCount: number;
}

const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  messagesEndRef,
  onSendMessage,
  inputMessage,
  setInputMessage,
  tools,
  toggleTool,
  enabledToolsCount
}) => {
  const [showToolsModal, setShowToolsModal] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});

  const toggleBlock = (blockKey: string) => {
    setExpandedBlocks(prev => ({
      ...prev,
      [blockKey]: !prev[blockKey]
    }));
  };

  // 工具调用卡片组件
  const ToolCallCard: React.FC<{ 
    block: ContentBlock; 
    blockKey: string; 
    isStarted?: boolean;
  }> = ({ block, blockKey, isStarted = false }) => {
    if (!block.toolCall) return null;
    
    const isExpanded = expandedBlocks[blockKey] ?? false;
    const { tool_name, result, duration } = block.toolCall;
    
    return (
      <div className={`
        relative overflow-hidden rounded-2xl
        bg-white/40 backdrop-blur-xl
        border border-white/60
        shadow-lg shadow-gray-900/5
        transition-all duration-300
        hover:shadow-xl hover:shadow-gray-900/10
        ${isStarted ? 'animate-pulse' : ''}
      `}>
        {/* 工具头部 */}
        <button
          onClick={() => toggleBlock(blockKey)}
          className="w-full px-4 py-3 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-xl
              ${isStarted 
                ? 'bg-gradient-to-br from-amber-400/20 to-orange-400/20' 
                : 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20'
              }
              backdrop-blur-sm
              transition-transform duration-300
              ${isStarted ? 'animate-spin' : 'group-hover:scale-110'}
            `}>
              <Wrench className={`w-4 h-4 ${isStarted ? 'text-amber-600' : 'text-blue-600'}`} />
            </div>
            <div className="flex flex-col items-start">
              <span className={`
                font-semibold text-sm
                ${isStarted ? 'text-amber-900' : 'text-gray-900'}
              `}>
                {tool_name}
              </span>
              {duration && !isStarted && (
                <span className="text-xs text-gray-500">
                  {(duration * 1000).toFixed(0)}ms
                </span>
              )}
              {isStarted && (
                <span className="text-xs text-amber-600">运行中...</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isStarted && result && (
              <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50/60 rounded-lg">
                已完成
              </span>
            )}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
            )}
          </div>
        </button>

        {/* 可折叠内容 */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="px-4 pb-3 space-y-3">
            {/* 分割线 */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />

            {/* 结果部分 */}
            {result && !isStarted && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-green-400 to-emerald-400" />
                  <span className="text-xs font-semibold text-gray-700">结果</span>
                </div>
                <div className="
                  ml-3 p-3 rounded-xl text-xs leading-relaxed
                  bg-white/60 backdrop-blur-sm
                  text-gray-800
                  border border-white/80
                  shadow-inner
                  max-h-[400px] overflow-y-auto
                  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                  prose prose-sm prose-gray max-w-none
                  prose-headings:text-gray-900 prose-headings:font-semibold
                  prose-p:text-gray-800 prose-p:my-2
                  prose-ul:my-2 prose-ol:my-2
                  prose-li:text-gray-800 prose-li:my-1
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-800 prose-pre:text-gray-100
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 h-[calc(100vh-8rem)]">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 h-full flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200/50 bg-white/40 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Chat with Rambot</h1>
              <p className="text-gray-600">Have any questions? Ask me anything!</p>
            </div>
            {/* Tools 按钮 - 暂时隐藏，以后可能需要 */}
            {/* <button
              onClick={() => setShowToolsModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 hover:bg-white border border-gray-200/50 rounded-xl transition-all duration-300 hover:shadow-md group"
            >
              <Settings className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Tools ({enabledToolsCount})
              </span>
            </button> */}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gray-900 text-white rounded-br-md'
                      : 'bg-white/80 text-gray-900 rounded-bl-md backdrop-blur-sm border border-gray-200/50'
                  }`}
                >
                  {/* 如果有 blocks，按顺序显示；否则显示 text */}
                  {message.blocks && message.blocks.length > 0 ? (
                    <div className="space-y-3">
                      {message.blocks.map((block, index) => {
                        const blockKey = `${message.id}-${index}`;
                        return (
                          <div key={blockKey}>
                            {block.type === 'text' && block.text && (
                              <div className={`
                                text-sm leading-relaxed
                                prose prose-sm max-w-none
                                ${message.sender === 'user' 
                                  ? `prose-invert
                                     prose-headings:text-white prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
                                     prose-p:text-white prose-p:my-2
                                     prose-ul:my-2 prose-ol:my-2 prose-ul:list-disc prose-ol:list-decimal
                                     prose-li:text-white prose-li:my-1
                                     prose-strong:text-white prose-strong:font-bold
                                     prose-em:text-gray-200 prose-em:italic
                                     prose-code:text-blue-300 prose-code:bg-blue-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                                     prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4
                                     prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                     prose-blockquote:border-l-gray-500 prose-blockquote:text-gray-300 prose-blockquote:italic
                                     prose-hr:border-gray-600`
                                  : `prose-gray
                                     prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
                                     prose-p:text-gray-900 prose-p:my-2
                                     prose-ul:my-2 prose-ol:my-2 prose-ul:list-disc prose-ol:list-decimal
                                     prose-li:text-gray-900 prose-li:my-1
                                     prose-strong:text-gray-900 prose-strong:font-bold
                                     prose-em:text-gray-900 prose-em:italic
                                     prose-code:text-blue-700 prose-code:bg-blue-50/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                                     prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4
                                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                     prose-blockquote:border-l-gray-300 prose-blockquote:text-gray-700 prose-blockquote:italic
                                     prose-hr:border-gray-200`
                                }
                              `}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {block.text}
                                </ReactMarkdown>
                              </div>
                            )}
                            
                            {block.type === 'tool_call_started' && (
                              <ToolCallCard 
                                block={block} 
                                blockKey={blockKey}
                                isStarted={true}
                              />
                            )}
                            
                            {block.type === 'tool_call_completed' && (
                              <ToolCallCard 
                                block={block} 
                                blockKey={blockKey}
                                isStarted={false}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // 向后兼容：如果没有 blocks，显示 text
                    <div className={`
                      text-sm leading-relaxed
                      prose prose-sm max-w-none
                      ${message.sender === 'user'
                        ? `prose-invert
                           prose-headings:text-white prose-headings:font-semibold
                           prose-p:text-white prose-p:my-2
                           prose-ul:my-2 prose-ol:my-2
                           prose-li:text-white prose-li:my-1
                           prose-strong:text-white prose-strong:font-bold
                           prose-code:text-blue-300 prose-code:bg-blue-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                           prose-pre:bg-gray-950 prose-pre:text-gray-100
                           prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline`
                        : `prose-gray
                           prose-headings:text-gray-900 prose-headings:font-semibold
                           prose-p:text-gray-900 prose-p:my-2
                           prose-ul:my-2 prose-ol:my-2
                           prose-li:text-gray-900 prose-li:my-1
                           prose-strong:text-gray-900 prose-strong:font-bold
                           prose-code:text-blue-700 prose-code:bg-blue-50/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                           prose-pre:bg-gray-800 prose-pre:text-gray-100
                           prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline`
                      }
                    `}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  )}
                  
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200/50 bg-white/40">
            <form onSubmit={onSendMessage} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Please enter your message..."
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tools Selection Modal */}
      {showToolsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowToolsModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">选择工具</h2>
                <button
                  onClick={() => setShowToolsModal(false)}
                  className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-300"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">启用您需要的AI工具来增强聊天体验</p>
            </div>

            {/* Tools List */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-start space-x-4 p-4 bg-white/60 rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleTool(tool.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      tool.enabled
                        ? 'bg-gray-900 border-gray-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tool.enabled && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200/50 bg-white/40">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  已启用 {enabledToolsCount} 个工具
                </p>
                <button
                  onClick={() => setShowToolsModal(false)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium"
                >
                  完成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
