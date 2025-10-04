import React from 'react';
import { User, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-gray-900">Rambot</div>
            <div className="flex space-x-6">
              <button
                onClick={() => onPageChange('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === 'home'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                HOME
              </button>
              <button
                onClick={() => onPageChange('chat')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === 'chat'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                <MessageCircle className="inline-block w-4 h-4 mr-2" />
                CHAT
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === 'about'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                ABOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
