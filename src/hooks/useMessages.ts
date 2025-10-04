import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { INITIAL_MESSAGE } from '../constants';
import { scrollToBottom, ChatHistoryItem } from '../utils';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef<number>(INITIAL_MESSAGE.id + 1);

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
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newId;
  };

  const appendToMessage = (id: number, chunk: string) => {
    setMessages(prev => prev.map(m => (
      m.id === id ? { ...m, text: m.text + chunk } : m
    )));
  };

  const loadHistory = (history: ChatHistoryItem[]) => {
    const historyMessages: Message[] = history.map((item) => ({
      id: nextIdRef.current++,
      text: item.content,
      sender: item.role === 'user' ? 'user' : 'assistant',
      timestamp: new Date(item.created_at * 1000)
    }));
    
    setMessages([INITIAL_MESSAGE, ...historyMessages]);
  };

  return {
    messages,
    messagesEndRef,
    addMessage,
    simulateAssistantResponse,
    startAssistantMessage,
    appendToMessage,
    loadHistory
  };
};
