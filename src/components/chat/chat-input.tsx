'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, CornerDownLeft, Loader2 } from 'lucide-react';
import { useRef, useEffect } from 'react';
import type { Entity } from '@/lib/types';

interface ChatInputProps {
  isPending: boolean;
  selectedEntity: Entity;
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      size="icon"
      disabled={isPending}
      aria-label="Send message"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <SendHorizonal />}
    </Button>
  );
}

export function ChatInput({ isPending, selectedEntity }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isPending && inputRef.current) {
      inputRef.current.form?.reset();
      inputRef.current.focus();
      inputRef.current.style.height = 'auto'; // Reset height
    }
  }, [isPending]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isPending && inputRef.current?.form) {
        // Manually create and dispatch a submit event
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        inputRef.current.form.dispatchEvent(submitEvent);
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="p-4 border-t bg-background shrink-0">
      <input type="hidden" name="entity" value={selectedEntity} />
      <div className="relative">
        <Textarea
          ref={inputRef}
          name="message"
          placeholder={"Posez votre question ici..."}
          className="pr-28 min-h-[40px] resize-none leading-6"
          rows={1}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={isPending}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
          <kbd className="hidden lg:inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CornerDownLeft size={14} /> Entrée
          </kbd>
          <SubmitButton isPending={isPending} />
        </div>
      </div>
    </div>
  );
}
