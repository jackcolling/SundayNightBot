interface FlowiseConfig {
  baseUrl: string;
  apiKey: string;
}

class ChatService {
  private config: FlowiseConfig;

  constructor(config: FlowiseConfig) {
    this.config = config;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/prediction/ff39dab3-3527-4a7f-ae67-2dc551229084`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          question: message,
          history: [] // Add chat history if needed
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Flowise');
      }

      const data = await response.json();
      return data.text || data.answer || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Error calling Flowise API:', error);
      throw error;
    }
  }
}

export const createChatService = (config: FlowiseConfig) => new ChatService(config);