/**
 * ChatSession Durable Object
 * Manages persistent chat history for individual sessions
 */

interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp?: string;
}

export class ChatSession implements DurableObject {
	private messages: ChatMessage[] = [];

	constructor(private state: DurableObjectState, private env: Env) {
		this.messages = [];
	}

	/**
	 * Handle requests to the ChatSession Durable Object
	 * Expects POST requests with message objects
	 */
	async fetch(request: Request): Promise<Response> {
		try {
			if (request.method !== 'POST') {
				return new Response('Method not allowed', { status: 405 });
			}

			const body = await request.json() as ChatMessage;
			
			// Validate message structure
			if (!body.role || !body.content) {
				return new Response(
					JSON.stringify({ error: 'Message must have role and content fields' }), 
					{ 
						status: 400,
						headers: { 'Content-Type': 'application/json' }
					}
				);
			}

			// Add timestamp to message
			const messageWithTimestamp: ChatMessage = {
				...body,
				timestamp: new Date().toISOString()
			};

			// Add message to history
			this.messages.push(messageWithTimestamp);

			// Return full message history
			return new Response(
				JSON.stringify({ messages: this.messages }), 
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

		} catch (error) {
			return new Response(
				JSON.stringify({ error: 'Invalid JSON body' }), 
				{ 
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
	}
}