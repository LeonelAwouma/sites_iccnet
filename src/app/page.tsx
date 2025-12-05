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
  const [state, formAction, isPending] = useActionState(sendMessage, initialState);
  const [selectedEntity, setSelectedEntity] = useState<Entity>('Groupe ICC Net');

  // We need a separate state for messages derived from the action state
  // to properly handle resets when the entity changes.
  const [displayMessages, setDisplayMessages] = useState(initialState.messages);

  const createInitialMessage = (entity: Entity) => [
    {
      id: 'init',
      role: 'assistant' as const,
      content: `Bonjour! Je suis l'assistant virtuel de ${entity}. Comment puis-je vous aider aujourd'hui?`,
    },
  ];

  useEffect(() => {
    // When the entity changes, reset the chat and show the initial message for the new entity.
    setDisplayMessages(createInitialMessage(selectedEntity));
    // We also need to reset the action state, but useActionState doesn't have a built-in reset.
    // The best way to signal a "reset" to the action is to handle it on the next message send.
  }, [selectedEntity]);

  useEffect(() => {
    // When the action state updates with new messages, update our display messages.
    // Don't update if it's the initial empty state.
    if (state.messages.length > 0) {
      setDisplayMessages(state.messages);
    } else {
       // This handles the case where the state is reset after an entity change.
       setDisplayMessages(createInitialMessage(selectedEntity));
    }
  }, [state.messages]);


  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: state.error,
      });
    }
  }, [state.error, toast]);


  return (
    <SidebarProvider>
      <ChatSidebar
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
      />
      <SidebarInset className="h-svh flex flex-col">
        <form
          action={formAction}
          // Using a key that changes with the entity will force React to re-create
          // the form, ensuring the action state is reset correctly on entity change.
          key={selectedEntity}
          className="flex flex-col h-full overflow-hidden"
        >
          <ChatHeader selectedEntity={selectedEntity} />
          <ChatMessages messages={displayMessages} />
          <ChatInput isPending={isPending} selectedEntity={selectedEntity} />
        </form>
      </SidebarInset>
    </SidebarProvider>
  );
}
