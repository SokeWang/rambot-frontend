import React from 'react';
import { MessageCircle, User, Send, Heart, Github } from 'lucide-react';
import { Page } from '../types';

interface HomePageProps {
  onPageChange: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
            <MessageCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Rambot
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            All you need is one chat! Feel free to talk with Rambot.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div 
          onClick={() => onPageChange('chat')}
          className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group hover:scale-105"
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">Smart chatting</h3>
              <p className="text-gray-600">Start chatting</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Have a natural conversation with AI assistant, get instant replies and help. The interface is simple and elegant, and supports real-time message transmission.
          </p>
          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
            <span>Start chatting</span>
            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        <div 
          onClick={() => onPageChange('about')}
          className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group hover:scale-105"
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">About Author</h3>
              <p className="text-gray-600">Learn more</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Learn more about the developer's background, skills and creative ideas. Explore more information about the technical stack and design ideas.
          </p>
          <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors duration-300">
            <span>View more details</span>
            <User className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-3xl font-bold text-gray-900 mb-2">Real-time</h4>
            <p className="text-gray-600">Instant message transmission</p>
          </div>
          <div className="group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-3xl font-bold text-gray-900 mb-2">Elegant</h4>
            <p className="text-gray-600">Apple-style design</p>
          </div>
          <div className="group">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Github className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-3xl font-bold text-gray-900 mb-2">Open Source</h4>
            <p className="text-gray-600">Modern technical stack</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
