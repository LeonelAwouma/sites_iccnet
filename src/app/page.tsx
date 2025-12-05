'use client';

import { useActionState } from 'react';
import { sendMessage, type ChatState } from '@/app/actions';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import ChatSidebar from '@/components/chat/chat-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import type { Entity } from '@/lib/types';
import type { Message } from '@/lib/types';

const createInitialMessage = (entity: Entity): Message => ({
  id: 'init',
  role: 'assistant',
  content: `Bonjour! Je suis l'assistant virtuel de ${entity}. Comment puis-je vous aider aujourd'hui?`,
});

export default function Home() {
  const { toast } = useToast();
  const [selectedEntity, setSelectedEntity] = useState<Entity>('Groupe ICC Net');

  // Create a memoized initial state
  const initialState: ChatState = {
    messages: [createInitialMessage(selectedEntity)],
  };

  const [state, formAction, isPending] = useActionState(sendMessage, initialState);

  // When the entity changes, we need to reset the action state.
  // A key change on the form is the React way to reset the state of the form and its children.
  const [formKey, setFormKey] = useState(selectedEntity);
  const [displayMessages, setDisplayMessages] = useState(initialState.messages);

  useEffect(() => {
    // When the selected entity changes, update the key on the form to reset the action state,
    // and update the displayed messages to show the initial message for the new entity.
    setFormKey(selectedEntity);
    setDisplayMessages([createInitialMessage(selectedEntity)]);
  }, [selectedEntity]);

  useEffect(() => {
    // When the action state updates with new messages, update our display messages.
    if (state.messages.length > displayMessages.length || (state.messages.length === 1 && displayMessages.length > 1) ) {
       setDisplayMessages(state.messages);
    } else if (state.messages.length === 1 && displayMessages.length === 1 && state.messages[0].content !== displayMessages[0].content){
        // This case handles the very first message after an entity change.
        // The state would have been reset, so we show the user message and the new assistant message.
        setDisplayMessages(state.messages);
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
          key={formKey} // Changing the key resets the useActionState
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
