import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { getAIResponse } from '../../../../utils/openai';

interface ChatInterfaceProps {
  mode: 'Friendly Chat' | 'Guided Journey';
}

export default function ChatInterface({ mode }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'ana';
    timestamp: Date;
  }>>([]);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (isLoading) return;

    const newMessage = {
      id: crypto.randomUUID(),
      text,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsSessionStarted(true);
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(text, mode);
      const anaResponse = {
        id: crypto.randomUUID(),
        text: aiResponse,
        sender: 'ana' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, anaResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorResponse = {
        id: crypto.randomUUID(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: 'ana' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = () => {
    if (messages.length > 0) {
      const closingMessage = {
        id: crypto.randomUUID(),
        text: "Thank you for chatting with me. Take care, and remember I'm here whenever you need support.",
        sender: 'ana' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, closingMessage]);
    }
    setIsSessionStarted(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <ChatHeader mode={mode} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isSessionStarted={isSessionStarted}
            onEndSession={handleEndSession}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}