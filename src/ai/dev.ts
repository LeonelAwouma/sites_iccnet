import { config } from 'dotenv';
config();

import '@/ai/flows/detect-company-entity.ts';
import '@/ai/flows/generate-contextual-response.ts';
import '@/ai/flows/implement-rag.ts';