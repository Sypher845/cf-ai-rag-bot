import { Hono } from 'hono';
import { cors } from 'hono/cors';

/**
 * Cloudflare AI RAG Bot API
 * Built with Hono framework for Cloudflare Workers
 */

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for frontend integration
app.use('*', cors());

/**
 * Chat endpoint for RAG bot interactions
 * POST /api/chat
 * Body: { message: string }
 * Response: { response: string }
 */
app.post('/api/chat', async (c) => {
	try {
		const body = await c.req.json();
		
		// Validate request body
		if (!body.message || typeof body.message !== 'string') {
			return c.json({ error: 'Message field is required and must be a string' }, 400);
		}

		// For now, echo the message back
		const response = `You said: ${body.message}`;
		
		return c.json({ response });
	} catch (error) {
		return c.json({ error: 'Invalid JSON body' }, 400);
	}
});

// Health check endpoint
app.get('/health', (c) => {
	return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Default route
app.get('/', (c) => {
	return c.json({ 
		message: 'Cloudflare AI RAG Bot API',
		endpoints: {
			chat: 'POST /api/chat',
			health: 'GET /health'
		}
	});
});

export default app;
