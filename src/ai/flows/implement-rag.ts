// Implements Retrieval-Augmented Generation (RAG) to retrieve relevant data from Firestore based on the detected entity and augment prompts to the LLM.

'use server';

/**
 * @fileOverview Implements RAG to retrieve relevant data from Firestore and augment prompts.
 *
 * - implementRAG - A function that handles the RAG process.
 * - ImplementRAGInput - The input type for the implementRAG function.
 * - ImplementRAGOutput - The return type for the implementRAG function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImplementRAGInputSchema = z.object({
  query: z.string().describe('The user query.'),
  entity: z.string().describe('The detected entity (e.g., Matrix, LVB, Perle, ICC SOFT, Newtelnet).'),
  retrievedData: z.string().describe('The relevant content retrieved from Firestore based on the entity.'),
});
export type ImplementRAGInput = z.infer<typeof ImplementRAGInputSchema>;

const ImplementRAGOutputSchema = z.object({
  response: z.string().describe('The LLM generated response augmented with retrieved data.'),
});
export type ImplementRAGOutput = z.infer<typeof ImplementRAGOutputSchema>;

export async function implementRAG(input: ImplementRAGInput): Promise<ImplementRAGOutput> {
  return implementRAGFlow(input);
}

const prompt = ai.definePrompt({
  name: 'implementRAGPrompt',
  input: {schema: ImplementRAGInputSchema},
  output: {schema: ImplementRAGOutputSchema},
  prompt: `Respond only based on the content of {{entity}} and the following retrieved data:

Retrieved Data:
{{retrievedData}}

User Query: {{query}}
`,
});

const implementRAGFlow = ai.defineFlow(
  {
    name: 'implementRAGFlow',
    inputSchema: ImplementRAGInputSchema,
    outputSchema: ImplementRAGOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
