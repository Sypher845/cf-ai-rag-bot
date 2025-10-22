import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { ChatSession } from './chat-session';

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

		// Get the CHAT_SESSION and AI bindings
		const { CHAT_SESSION, AI } = c.env;
		
		// Get a hardcoded ID for now
		const id = CHAT_SESSION.idFromName("default-session");
		
		// Get the object stub
		const stub = CHAT_SESSION.get(id);
		
		// Create the new message object
		const userMessage = { role: "user", content: body.message };
		
		// Fetch the stub, sending the userMessage object
		const userResponse = await stub.fetch('http://localhost/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userMessage)
		});
		
		// Get the full history from the stub's response (including the new user message)
		const messageHistory = await userResponse.json();
		
		// Define a system prompt
		const systemPrompt = { role: "system", content: "You are a helpful and friendly assistant." };
		
		// Create the message array to send to the AI (system prompt + message history)
		const aiMessages = [systemPrompt, ...messageHistory.messages];
		
		// Call the AI
		const aiResponse = await AI.run('@cf/meta/llama-3.1-8b-instruct', {
			messages: aiMessages
		});
		
		// Create the AI's message object
		const aiMessage = { role: "assistant", content: aiResponse.response };
		
		// Save the AI's response to the Durable Object
		const aiSaveResponse = await stub.fetch('http://localhost/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(aiMessage)
		});
		
		// Get the final complete history (including the AI's response)
		const finalHistory = await aiSaveResponse.json();
		
		// Return the final response to the user
		return c.json(finalHistory);
		
	} catch (error) {
		console.error('Chat endpoint error:', error);
		return c.json({ error: 'An error occurred processing your request' }, 500);
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

export { ChatSession };
