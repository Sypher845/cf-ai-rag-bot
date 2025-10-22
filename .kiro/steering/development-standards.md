# Development Standards

## Code Quality
- Use TypeScript with strict type checking
- Follow ESLint and Prettier configurations
- Write descriptive variable and function names
- Include JSDoc comments for public APIs

## Testing Strategy
- Use Vitest for unit and integration tests
- Test core business logic thoroughly
- Mock external dependencies (Cloudflare APIs) in tests
- Aim for meaningful test coverage, not just high percentages

## Cloudflare Workers Best Practices
- Keep bundle size minimal for fast cold starts
- Use appropriate response caching strategies
- Handle errors gracefully with proper HTTP status codes
- Implement proper CORS headers for frontend integration
- Use environment variables for configuration

## API Design
- Follow RESTful principles where applicable
- Use Hono's built-in validation and middleware
- Return consistent JSON response formats
- Include proper error messages and status codes
- Document API endpoints clearly

## Performance Considerations
- Optimize vector search queries
- Implement request/response streaming where beneficial
- Use appropriate caching strategies for static content
- Monitor and optimize LLM token usage