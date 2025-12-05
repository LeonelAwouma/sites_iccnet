'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, CornerDownLeft, Paperclip } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useRef, useEffect, useState } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (formRef.current && !pending) {
      formRef.current.reset();
      setFile(null);
      inputRef.current?.focus();
    }
  }, [pending]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = (event.target as HTMLElement).closest('form');
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="p-4 border-t bg-background shrink-0">
      <div className="relative">
        <Textarea
          ref={inputRef}
          name="message"
          placeholder={file ? file.name : "Posez votre question ici..."}
          className="pr-28 min-h-[40px] resize-none leading-6"
          rows={1}
          onKeyDown={handleKeyDown}
          disabled={pending || !!file}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            onClick={() => fileInputRef.current?.click()}
            disabled={pending}
            aria-label="Attach file"
          >
            <Paperclip />
          </Button>
          <kbd className="hidden lg:inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CornerDownLeft size={14} /> Entrée
          </kbd>
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}
