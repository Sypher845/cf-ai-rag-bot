# RAG Implementation Guidelines

## Document Processing Pipeline
1. **Ingestion**: Load Cloudflare documentation
2. **Chunking**: Split documents into manageable pieces (500-1000 tokens)
3. **Embedding**: Generate vector embeddings using Workers AI
4. **Storage**: Store in Vectorize with metadata

## Retrieval Strategy
- Use semantic similarity search in Vectorize
- Implement hybrid search (semantic + keyword) if needed
- Return top-k relevant chunks (typically 3-5)
- Include source metadata for citations

## Context Assembly
- Combine retrieved chunks into coherent context
- Maintain source attribution
- Handle context length limits (typically 4k-8k tokens)
- Implement context compression if needed

## Prompt Engineering
```typescript
const systemPrompt = `You are a helpful assistant that answers questions about Cloudflare services and documentation. 
Use the provided context to answer questions accurately. If you cannot find the answer in the context, say so clearly.
Always cite your sources when possible.`;
```

## Response Generation
- Use Llama 3.3 with appropriate temperature settings
- Implement streaming responses for better UX
- Handle rate limits and errors gracefully
- Include source citations in responses

## Quality Measures
- Implement relevance scoring for retrieved chunks
- Add confidence indicators to responses
- Log queries and responses for improvement
- Consider user feedback mechanisms