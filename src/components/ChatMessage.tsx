import React from 'react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-3">
          <img 
            src="/bot-icon.png" 
            alt="Bot Icon" 
            className="w-5 h-5 object-contain"
          />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-3xl px-6 py-4 ${
          isBot
            ? 'bg-gray-800 text-gray-100'
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}