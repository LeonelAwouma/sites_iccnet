'use client';

import { useFormState } from 'react-dom';
import { sendMessage, type ChatState } from '@/app/actions';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import ChatSidebar from '@/components/chat/chat-sidebar';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const initialState: ChatState = {
  messages: [
    {
      id: 'init',
      role: 'assistant',
      content:
        "Bonjour! Je suis l'assistant virtuel du Groupe ICC. Comment puis-je vous aider aujourd'hui?",
    },
  ],
};

export default function Home() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(sendMessage, initialState);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset className="h-svh flex flex-col">
        <form
          action={formAction}
          className="flex flex-col h-full overflow-hidden"
        >
          <ChatHeader />
          <ChatMessages messages={state.messages} />
          <ChatInput />
        </form>
      </SidebarInset>
    </SidebarProvider>
  );
}
