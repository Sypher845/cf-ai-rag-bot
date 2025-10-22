# Cloudflare AI RAG Bot - Project Overview

## Product Vision
An AI chatbot that answers questions about Cloudflare's documentation through a web-based chat interface.

## Technology Stack

### Backend
- **Runtime**: Cloudflare Workers (TypeScript)
- **API Framework**: Hono
- **LLM**: Llama 3.3 via Cloudflare Workers AI
- **Knowledge Database**: Cloudflare Vectorize
- **Chat History/State**: Cloudflare Durable Objects

### Frontend
- **Platform**: Cloudflare Pages
- **Technology**: Static HTML/JavaScript/CSS

## Project Structure
This is a TypeScript-based Cloudflare Workers project with:
- Source code in `src/`
- Tests in `test/`
- Wrangler configuration for deployment
- Vitest for testing

## Key Components
1. **RAG Pipeline**: Document ingestion, vectorization, and retrieval
2. **Chat Interface**: Web-based user interaction
3. **AI Integration**: Llama 3.3 for response generation
4. **State Management**: Persistent chat history via Durable Objects
5. **Knowledge Base**: Vectorized Cloudflare documentation