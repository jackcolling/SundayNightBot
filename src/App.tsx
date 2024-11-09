import React, { useState, useCallback } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { createChatService } from './services/chatService';
import { FLOWISE_CONFIG } from './config';

interface Message {
  text: string;
  isBot: boolean;
}

const chatService = createChatService(FLOWISE_CONFIG);

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hey there! Welcome to our AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (message: string) => {
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(message);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { 
          text: "I'm sorry, I encountered an error. Please try again later.", 
          isBot: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Chat Container */}
      <div className="max-w-4xl mx-auto pb-24 px-4">
        <div className="space-y-6 pt-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
            />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>

      {/* Input Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent pb-6 pt-10">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;