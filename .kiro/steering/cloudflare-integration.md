# Cloudflare Integration Guidelines

## Workers AI Integration
- Use `@cloudflare/ai` package for LLM interactions
- Model: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- Implement proper error handling for AI API calls
- Consider token limits and response streaming

## Vectorize Database
- Use Cloudflare Vectorize for document embeddings
- Implement efficient similarity search
- Handle vector dimension consistency (typically 768 or 1536)
- Batch operations for better performance

## Durable Objects
- Use for persistent chat session storage
- Implement proper state serialization/deserialization
- Handle concurrent access patterns
- Consider storage limits and cleanup strategies

## Environment Configuration
```typescript
interface Env {
  AI: Ai;
  VECTORIZE: VectorizeIndex;
  CHAT_SESSIONS: DurableObjectNamespace;
  // Add other bindings as needed
}
```

## Wrangler Configuration
- Configure bindings in `wrangler.jsonc`
- Set up proper environment variables
- Configure compatibility dates appropriately
- Use appropriate resource limits

## Deployment
- Use `wrangler deploy` for production deployments
- Test in preview environment first
- Monitor usage and performance metrics
- Set up proper logging and error tracking