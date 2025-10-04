import React from 'react';
import { User, Mail, Github, Heart, Loader2 } from 'lucide-react';
import { useAuthorInfo } from '../hooks';

const AboutPage: React.FC = () => {
  const { authorInfo, loading, error } = useAuthorInfo();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            <span className="ml-3 text-gray-600">Loading author information...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <User className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Loading failed</h2>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!authorInfo) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">暂无用户信息</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
            {authorInfo.avatar ? (
              <img 
                src={authorInfo.avatar} 
                alt={authorInfo.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About {authorInfo.name}</h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Introduction</h3>
              <p className="text-gray-700 leading-relaxed">
                {authorInfo.bio}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills and Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {authorInfo.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${authorInfo.contact.email}`}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
                >
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>{authorInfo.contact.email}</span>
                </a>
                <a
                  href={authorInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
                >
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-300">
                    <Github className="w-5 h-5" />
                  </div>
                  <span>{authorInfo.contact.github}</span>
                </a>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interesting Facts</h3>
              <div className="space-y-3">
                {authorInfo.funFacts.map((fact, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-700">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Thank you for viewing this chat application!
            <br />
            Built with React, TypeScript and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
