import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { useMessages } from './hooks/useMessages';
import { useTools } from './hooks/useTools';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import AboutPage from './components/AboutPage';
import { getOrCreateUserId, getCachedSessionId, saveSessionId } from './utils';
import { streamAgentRun, fetchChatHistory } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | undefined>(getCachedSessionId());
  
  const { messages, messagesEndRef, addMessage, startAssistantMessage, appendToMessage, loadHistory } = useMessages();
  const { tools, toggleTool, enabledToolsCount } = useTools();
  const uvId = getOrCreateUserId();

  // 当进入聊天页面且有 session_id 时，加载历史记录
  useEffect(() => {
    if (currentPage === 'chat' && sessionId) {
      const loadChatHistory = async () => {
        try {
          const history = await fetchChatHistory(sessionId);
          loadHistory(history);
        } catch (err) {
          console.error('Failed to load chat history:', err);
        }
      };
      loadChatHistory();
    }
  }, [currentPage, sessionId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    setInputMessage('');
    const assistantId = startAssistantMessage();

    const uid = uvId; // 使用持久化的访客 UV ID
    try {
      await streamAgentRun(
        inputMessage,
        uid,
        (line) => {
          appendToMessage(assistantId, line);
        },
        {
          sessionId,
          onRunCompleted: (sid) => {
            if (sid) {
              setSessionId(sid);
              saveSessionId(sid);
            }
          }
        }
      );
    } catch (err) {
      appendToMessage(assistantId, `请求失败: ${err instanceof Error ? err.message : 'Unknown error'}\n`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="pt-20 pb-6">
        {currentPage === 'home' && <HomePage onPageChange={setCurrentPage} />}
        {currentPage === 'chat' && (
          <ChatPage
            messages={messages}
            messagesEndRef={messagesEndRef}
            onSendMessage={handleSendMessage}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            tools={tools}
            toggleTool={toggleTool}
            enabledToolsCount={enabledToolsCount}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
      </div>
    </div>
  );
}

export default App;