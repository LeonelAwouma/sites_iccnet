'use client';

import type { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatAvatar } from './chat-avatar';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
  </div>
);

export function ChatMessages({ messages }: { messages: Message[] }) {
  const { pending } = useFormStatus();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // We delay the scroll slightly to allow the new message to be rendered first
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, pending]);


  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef}>
      <div className="p-4 md:p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start gap-4',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && <ChatAvatar role="assistant" />}
            <div
              className={cn(
                'max-w-prose rounded-lg p-3 text-sm shadow-sm',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border'
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === 'user' && <ChatAvatar role="user" />}
          </div>
        ))}
        {pending && (
          <div className="flex items-start gap-4 justify-start">
            <ChatAvatar role="assistant" />
            <div className="bg-card border rounded-lg shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
