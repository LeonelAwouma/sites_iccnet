# **App Name**: ICC Net Assistant

## Core Features:

- Entity Detection: Automatically detect the relevant company entity (Matrix, LVB, Perle, ICC SOFT, Newtelnet) from the user's input using AI text analysis tool.
- Data Ingestion: Periodically scrape and cache content from the specified websites (ADAC, Matrix Telecoms, ICC SOFT, New Telnet, Groupe ICC Net) into a Firestore knowledge base.
- Knowledge Base: Organize each company's scraped web pages into vector embeddings inside a Firestore database to make similarity search.
- RAG Integration: Implement Retrieval-Augmented Generation to retrieve relevant data from Firestore based on detected entity, augmenting prompts to the LLM.
- AI Response Generation: Generate contextual and helpful responses using Gemini (via Vertex AI) based on the retrieved content and entity context tool.
- Multilingual Chat Interface: Develop a web-based chat interface with Firebase Hosting, supporting multilingual input (French/English) and conversational display of responses.
- Chat History: Display Real-time chat updates using Firestore listeners for a dynamic conversation history.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for a trustworthy and professional feel.
- Background color: Light gray (#F0F2F5), creating a clean and modern look.
- Accent color: Cyan (#00BCD4) for interactive elements and highlights.
- Body font: 'Inter', a grotesque-style sans-serif with a modern look for readability.
- Headline font: 'Space Grotesk', a proportional sans-serif, complementing body font with computerized feel.
- Use a consistent set of simple, professional icons relevant to each company entity (e.g., telecom, software).
- Design a clean and intuitive chat layout, with clear separation of user input and bot responses.
- Implement subtle animations (e.g., typing indicators, message loading) to enhance the user experience.