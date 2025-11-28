import {NextRequest} from 'next/server';
import {genkit} from '@/ai/genkit';
import {run} from '@genkit-ai/next';

export const POST = async (req: NextRequest) => {
  return run(genkit, async () => {}, {req});
};
