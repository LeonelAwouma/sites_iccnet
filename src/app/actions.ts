'use server';

import { detectCompanyEntity } from '@/ai/flows/detect-company-entity';
import { generateContextualResponse } from '@/ai/flows/generate-contextual-response';
import { knowledgeBase } from '@/lib/kb';
import type { Message, Entity } from '@/lib/types';

export interface ChatState {
  messages: Message[];
  error?: string;
}

export async function sendMessage(
  state: ChatState,
  formData: FormData
): Promise<ChatState> {
  const userInput = formData.get('message') as string;
  const selectedEntity = formData.get('entity') as Entity | null;

  if (!userInput?.trim()) {
    return state;
  }

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content: userInput,
  };

  const messagesWithUser = [...state.messages, userMessage];

  try {
    let entity: Entity;
    let retrievedContent: string | undefined;

    if (selectedEntity && selectedEntity !== 'Unknown') {
      entity = selectedEntity;
      retrievedContent = knowledgeBase[entity];
    } else {
      const detectionResult = await detectCompanyEntity({ text: userInput });
      entity = detectionResult.entity;
      retrievedContent = knowledgeBase[entity] || knowledgeBase['Groupe ICC Net'];
    }

    if (!retrievedContent) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          "Désolé, je n'ai pas trouvé d'informations pour cette entité. Veuillez préciser votre demande.",
      };
      return {
        messages: [...messagesWithUser, errorMessage],
      };
    }

    const { response } = await generateContextualResponse({
      entity: entity,
      query: userInput,
      retrievedContent: retrievedContent,
    });

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
    };

    return {
      messages: [...messagesWithUser, assistantMessage],
    };
  } catch (error) {
    console.error('AI Action Error:', error);
    return {
      messages: messagesWithUser,
      error:
        "Désolé, une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer.",
    };
  }
}
