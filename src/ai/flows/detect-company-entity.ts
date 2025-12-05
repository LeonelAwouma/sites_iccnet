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
    .enum(['Matrix', 'LVB', 'Perle', 'ICC SOFT', 'Newtelnet', 'ADAC'])
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
  prompt: `Determine which company entity the following text is most relevant to. The possible entities are: Matrix, LVB, Perle, ICC SOFT, Newtelnet, ADAC. Return ONLY the name of the entity.

Text: {{{text}}}`,
});

const detectCompanyEntityFlow = ai.defineFlow(
  {
    name: 'detectCompanyEntityFlow',
    inputSchema: DetectCompanyEntityInputSchema,
    outputSchema: DetectCompanyEntityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

