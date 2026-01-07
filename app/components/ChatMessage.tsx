'use client';

import { User, Bot } from 'lucide-react';
import { useMemo } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // 格式化时间戳，确保在客户端一致
  const formattedTime = useMemo(() => {
    const date = message.timestamp instanceof Date 
      ? message.timestamp 
      : new Date(message.timestamp);
    
    // 使用固定的格式，避免时区差异
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [message.timestamp]);

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gray-900 dark:bg-white' 
          : 'bg-blue-500'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white dark:text-gray-900" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div className={`flex-1 ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 px-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}

