'use server';

/**
 * @fileOverview A tour package description generator AI agent.
 *
 * - generateTourPackageDescription - A function that generates tour package descriptions.
 * - GenerateTourPackageDescriptionInput - The input type for the generateTourPackageDescription function.
 * - GenerateTourPackageDescriptionOutput - The return type for the generateTourPackageDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttractionSchema = z.object({
  name: z.string().describe('The name of the attraction.'),
  description: z.string().describe('A short description of the attraction.'),
});

const GenerateTourPackageDescriptionInputSchema = z.object({
  destination: z.string().describe('The destination of the tour package.'),
  duration: z.string().describe('The duration of the tour package (e.g., 5 days, 1 week).'),
  activities: z.string().describe('A comma-separated list of activities included in the tour package.'),
});

export type GenerateTourPackageDescriptionInput = z.infer<typeof GenerateTourPackageDescriptionInputSchema>;

const GenerateTourPackageDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and informative description of the tour package.'),
});

export type GenerateTourPackageDescriptionOutput = z.infer<typeof GenerateTourPackageDescriptionOutputSchema>;

const findAttractions = ai.defineTool({
  name: 'findAttractions',
  description: 'Finds attractions and amenities based on tour package criteria from external websites.',
  inputSchema: z.object({
    destination: z.string().describe('The destination of the tour package.'),
    activities: z.string().describe('A comma-separated list of activities included in the tour package.'),
  }),
  outputSchema: z.array(AttractionSchema),
},
async (input) => {
  // Placeholder implementation: Replace with actual implementation to fetch attractions from external sources
  const attractions = [];
  if (input.destination.toLowerCase().includes('munnar')) {
    attractions.push({
      name: 'Tea Gardens',
      description: 'Lush green tea plantations offering scenic views.',
    });
    attractions.push({
      name: 'Eravikulam National Park',
      description: 'Home to the Nilgiri Tahr and offers stunning views of the surrounding hills.',
    });
  }
  if (input.activities.toLowerCase().includes('beach')) {
    attractions.push({
      name: 'Beaches',
      description: 'Visit beaches and enjoy the sunshine',
    });
  }
  return attractions;
}
);

export async function generateTourPackageDescription(
    input: GenerateTourPackageDescriptionInput
): Promise<GenerateTourPackageDescriptionOutput> {
  return generateTourPackageDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTourPackageDescriptionPrompt',
  input: {schema: GenerateTourPackageDescriptionInputSchema},
  output: {schema: GenerateTourPackageDescriptionOutputSchema},
  tools: [findAttractions],
  prompt: `You are an expert travel copywriter specializing in creating engaging and informative descriptions for tour packages.

  Based on the destination, duration, and activities, craft a compelling description that highlights the unique aspects of the tour package.
  Incorporate details about key attractions and amenities found by the findAttractions tool.

  Destination: {{{destination}}}
  Duration: {{{duration}}}
  Activities: {{{activities}}}
  Attractions: {{#each (findAttractions destination=destination activities=activities)}}{{{this.name}}} - {{{this.description}}}\n{{/each}}

  Write a description for this tour package:
`,
});

const generateTourPackageDescriptionFlow = ai.defineFlow(
    {
      name: 'generateTourPackageDescriptionFlow',
      inputSchema: GenerateTourPackageDescriptionInputSchema,
      outputSchema: GenerateTourPackageDescriptionOutputSchema,
    },
    async input => {
      const {output} = await prompt(input);
      return output!;
    }
);

