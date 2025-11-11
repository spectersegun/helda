/**
 * LLM Service Types for Helda V2
 * Defines interfaces for OpenAI integration across multiple pages
 */

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMRequest {
  prompt: string;
  context?: string;
  conversationHistory?: LLMMessage[];
  maxTokens?: number;
  temperature?: number;
  pageContext?: 'patient' | 'revenue' | 'pricing' | 'ai-assistant';
}

export interface LLMResponse {
  content: string;
  conversationId: string;
  timestamp: string;
  tokensUsed?: number;
  model?: string;
}

export interface StreamChunk {
  content: string;
  done: boolean;
}

export interface LLMError {
  message: string;
  code?: string;
  type: 'network' | 'api' | 'validation' | 'unknown';
}