'use server';

/**
 * @fileOverview A flow to detect the relevant company entity from user input.
 *
 * - detectCompanyEntity - Detects the company entity from the user input.
 * - DetectCompanyEntityInput - The input type for the detectCompanyEntity function.
 * - DetectCompanyEntityOutput - The return type for the detectCompanyEntity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectCompanyEntityInputSchema = z.object({
  text: z.string().describe('The user input text.'),
});
export type DetectCompanyEntityInput = z.infer<typeof DetectCompanyEntityInputSchema>;

const DetectCompanyEntityOutputSchema = z.object({
  entity: z
    .enum(['Matrix Telecoms', 'LVB', 'Perle', 'ICC SOFT', 'New Telnet', 'ADAC', 'CCEC', 'Groupe ICC Net'])
    .describe('The detected company entity.'),
});
export type DetectCompanyEntityOutput = z.infer<typeof DetectCompanyEntityOutputSchema>;

export async function detectCompanyEntity(input: DetectCompanyEntityInput): Promise<DetectCompanyEntityOutput> {
  return detectCompanyEntityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectCompanyEntityPrompt',
  input: {schema: DetectCompanyEntityInputSchema},
  output: {schema: DetectCompanyEntityOutputSchema},
  prompt: `Determine which company entity the following text is most relevant to. The possible entities are: Matrix Telecoms, LVB, Perle, ICC SOFT, New Telnet, ADAC (which stands for Africa Datacenter), CCEC (Caisse Camerounaise d'Épargne et de Crédit), Groupe ICC Net. Return ONLY the name of the entity.

If the query is general or mentions the group, prefer "Groupe ICC Net".

Text: {{{text}}}`,
});

const detectCompanyEntityFlow = ai.defineFlow(
  {
    name: 'detectCompanyEntityFlow',
    inputSchema: DetectCompanyEntityInputSchema,
    outputSchema: DetectCompanyEntityOutputSchema,
  },
  async input => {
    try {
        const {output} = await prompt(input);
        return output!;
    } catch(e) {
        // If the model fails to detect an entity, default to the group.
        return { entity: 'Groupe ICC Net' };
    }
  }
);
