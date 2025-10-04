import React, { useState } from 'react';
import { Send, Settings, X, Check } from 'lucide-react';
import { Message, Tool } from '../types';
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
            <button
              onClick={() => setShowToolsModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 hover:bg-white border border-gray-200/50 rounded-xl transition-all duration-300 hover:shadow-md group"
            >
              <Settings className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Tools ({enabledToolsCount})
              </span>
            </button>
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
                  <p className="text-sm leading-relaxed">{message.text}</p>
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
