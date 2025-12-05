'use server';

import { detectCompanyEntity } from '@/ai/flows/detect-company-entity';
import { generateContextualResponse } from '@/ai/flows/generate-contextual-response';
import { knowledgeBase } from '@/lib/kb';
import type { Message } from '@/lib/types';

export interface ChatState {
  messages: Message[];
  error?: string;
}

export async function sendMessage(
  state: ChatState,
  formData: FormData
): Promise<ChatState> {
  const userInput = formData.get('message') as string;
  const file = formData.get('file');

  if (!userInput?.trim() && !file) {
    return state;
  }

  const userMessageContent = userInput + (file ? `\nFichier: ${(file as File).name}` : '');

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content: userMessageContent,
  };

  const messagesWithUser = [...state.messages, userMessage];

  try {
    const { entity } = await detectCompanyEntity({ text: userMessageContent });

    const retrievedContent = knowledgeBase[entity] || knowledgeBase['Groupe ICC Net'];

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
      query: userMessageContent,
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
