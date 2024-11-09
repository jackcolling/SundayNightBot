import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-6 py-4 bg-gray-800 text-gray-100 rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 border border-gray-700"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
        >
          <SendHorizontal size={24} />
        </button>
      </div>
    </form>
  );
}