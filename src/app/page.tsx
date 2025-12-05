'use client';

import { useActionState } from 'react';
import { sendMessage, type ChatState } from '@/app/actions';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import ChatSidebar from '@/components/chat/chat-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState, useTransition } from 'react';
import type { Entity } from '@/lib/types';

const initialState: ChatState = {
  messages: [],
};

export default function Home() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(sendMessage, initialState);
  const [isPending, startTransition] = useTransition();
  const [selectedEntity, setSelectedEntity] = useState<Entity>('Groupe ICC Net');

  const initialMessages = [
    {
      id: 'init',
      role: 'assistant' as const,
      content:
        `Bonjour! Je suis l'assistant virtuel de ${selectedEntity}. Comment puis-je vous aider aujourd'hui?`,
    },
  ];

  const chatState = state.messages.length > 0 ? state : { ...initialState, messages: initialMessages };

   useEffect(() => {
    // When selectedEntity changes, we want to reset the chat.
    // We can do this by updating the state's messages.
    // A more robust solution might involve a key on the chat components or a dedicated reset action.
    state.messages = [];
  }, [selectedEntity, state]);


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
      <ChatSidebar
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
      />
      <SidebarInset className="h-svh flex flex-col">
        <form
          action={(formData) => {
            startTransition(() => {
              formAction(formData);
            });
          }}
          className="flex flex-col h-full overflow-hidden"
        >
          <ChatHeader selectedEntity={selectedEntity} />
          <ChatMessages messages={chatState.messages} />
          <ChatInput isPending={isPending} selectedEntity={selectedEntity} />
        </form>
      </SidebarInset>
    </SidebarProvider>
  );
}
