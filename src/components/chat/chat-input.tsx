'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, CornerDownLeft } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useRef, useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      disabled={pending}
      aria-label="Send message"
    >
      <SendHorizonal />
    </Button>
  );
}

export function ChatInput() {
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (formRef.current && !pending) {
      formRef.current.reset();
      inputRef.current?.focus();
    }
  }, [pending]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // Safely get the form element from the event target
      const form = (event.target as HTMLElement).closest('form');
      if (form) {
        // Need to create and dispatch a submit event
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  return (
    <div className="p-4 border-t bg-background shrink-0">
      <div className="relative">
        <Textarea
          ref={inputRef}
          name="message"
          placeholder="Posez votre question ici..."
          className="pr-20 min-h-[40px] resize-none leading-6"
          rows={1}
          onKeyDown={handleKeyDown}
          disabled={pending}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
          <kbd className="hidden lg:inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CornerDownLeft size={14} /> Entrée
          </kbd>
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}
