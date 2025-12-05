# ICC Net Assistant

This is a full-stack AI conversational assistant application built with Next.js and Firebase. The chatbot connects to multiple company websites to provide contextual responses based on the specific entity mentioned in the user's query.

## Features

- **Entity Detection**: Automatically detects the relevant company entity (Matrix, LVB, Perle, ICC SOFT, Newtelnet, ADAC) from user input.
- **Retrieval-Augmented Generation (RAG)**: Retrieves relevant data from a mock knowledge base to augment prompts for the LLM.
- **Contextual AI Responses**: Generates helpful responses using Genkit and a Large Language Model.
- **Multilingual Chat Interface**: A clean, responsive chat UI supporting both French and English.
- **Real-time feel**: With loading states for a dynamic conversation history.

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

This will start the Next.js application on `http://localhost:9002`.

## Project Structure

- `src/app/page.tsx`: The main entry point of the application, containing the chat interface.
- `src/app/actions.ts`: Contains the server action that handles the conversational AI logic.
- `src/components/chat/*`: UI components that make up the chat interface.
- `src/ai/flows/*`: Pre-defined Genkit flows for AI functionality.
- `src/lib/kb.ts`: A mock knowledge base simulating scraped website content.
