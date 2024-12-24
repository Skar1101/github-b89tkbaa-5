import React from 'react';
import { X, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  mode: string;
}

export default function ChatHeader({ mode }: ChatHeaderProps) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Ana</h2>
            <p className="text-sm text-gray-400">{mode}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/chat')}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-400">
        <span>{today}</span>
      </div>
    </div>
  );
}