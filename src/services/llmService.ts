/**
 * OpenAI LLM Service for Helda V2
 * Handles all LLM interactions across Patient Intelligence, Revenue Performance,
 * Pricing Intelligence, and AI Assistant pages
 */

import type { LLMRequest, LLMResponse, LLMMessage, LLMError, StreamChunk } from '../types/llm.types';

class OpenAIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openai.com/v1';
  private model: string;
  private maxTokens: number;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo-preview';
    this.maxTokens = parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '1000');

    if (!this.apiKey) {
      console.error('OpenAI API key is not configured');
    }
  }

  /**
   * Detect if prompt contains PII (personally identifiable information)
   */
  private detectPII(text: string): boolean {
    // Simple PII detection patterns
    const piiPatterns = [
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
      /\b\d{3}[\s-]?\d{3}[\s-]?\d{4}\b/, // Phone numbers
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email addresses
      /\b\d{16}\b/, // Credit card numbers
      /\b\d{1,5}\s\w+\s(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|boulevard|blvd)\b/i, // Street addresses
    ];

    return piiPatterns.some(pattern => pattern.test(text));
  }

  /**
   * Check if prompt asks for individual medical advice
   */
  private isRequestingMedicalAdvice(text: string): boolean {
    const medicalAdvicePatterns = [
      /should\s+i\s+(take|use|do|get|see)/i,
      /what\s+treatment\s+(should|can|do)/i,
      /diagnose\s+me/i,
      /am\s+i\s+(sick|ill|having)/i,
      /my\s+(symptoms|pain|condition)/i,
      /what\s+medicine/i,
      /prescribe/i,
    ];

    return medicalAdvicePatterns.some(pattern => pattern.test(text));
  }

  /**
   * Get system context based on page type with safety guardrails
   */
  private getSystemContext(pageContext?: string): string {
    const baseRules = `

CRITICAL SAFETY RULES:

1. NO PERSONALLY IDENTIFIABLE INFORMATION (PII):
   - If user provides PII, respond: "It looks like your message contains personal information. For privacy and security reasons, please remove or anonymize any PII before continuing."

2. NO INDIVIDUALIZED MEDICAL ADVICE:
   - Only discuss general healthcare/dentistry topics and population-level insights
   - Never provide diagnosis, treatment plans, or "what should I do?" recommendations for individuals
   - If asked, respond: "I can share general information, but I can't provide medical advice for an individual. It's best to speak with a qualified healthcare professional about your specific situation."

3. RESPONSE LENGTH LIMIT:
   - Keep ALL responses under 300 characters (excluding the mandatory disclaimer)
   - Be concise, direct, and focused on key insights only
   - Use bullet points and brief phrases for clarity
   - Example: "Q3 retention: 68% (+4% YoY). Top factors: service quality, pricing."

4. TRANSPARENCY & SOURCE CITATION:
   - Always state data time windows, filters, denominators, and caveats
   - Show exact logic or aggregation method used
   - Example: "Based on user data from Jan–Jun 2023, filtered to active accounts aged 18+, 62% (±3%) reported using the service weekly."

5. NUMERICAL HYGIENE:
   - Round or bin sensitive metrics
   - Show confidence intervals where applicable
   - Never expose raw row-level patient data
   - Use ranges for sensitive counts: "Around 1,200 – 1,500 users participated (95% CI)"

6. MANDATORY DISCLAIMER:
   Every response with insights MUST include:
   "⚠️ This tool provides aggregated analytics and general healthcare-related information only. It does not provide medical advice for individuals."

7. SCOPE LIMITATION:
   - ALLOWED: trends, rates, utilization, costs, quality measures, general knowledge with citations
   - DISALLOWED: clinical advice for individuals, emergency guidance, claims that a metric implies clinical outcomes without stating limitations

8. FORMATTING REQUIREMENTS:
   - Use brief, concise Markdown formatting
   - Use bullet points (-, *) for lists
   - Use **bold** for key metrics ONLY
   - Keep formatting minimal due to 300 character limit
   - Example format:
     **Q3 Findings:**
     - Metric 1: Value
     - Metric 2: Value
     
     Top driver: [insight]
`;

    const contexts = {
      'patient': `You are Helda, an AI assistant for healthcare patient intelligence analytics. 
You analyze AGGREGATED patient data, retention metrics, demographics, and satisfaction scores ONLY. 
Provide concise, data-driven insights focused on population-level patterns and outcomes.
STRICT: Responses MUST be under 300 characters (excluding disclaimer).
${baseRules}`,
      
      'revenue': `You are Helda, an AI assistant for healthcare revenue analytics. 
You analyze AGGREGATED revenue streams, financial performance, billing patterns, and operational costs. 
Provide actionable financial insights for healthcare providers based on population-level data.
STRICT: Responses MUST be under 300 characters (excluding disclaimer).
${baseRules}`,
      
      'pricing': `You are Helda, an AI assistant for healthcare pricing intelligence. 
You analyze AGGREGATED pricing strategies, market benchmarks, service costs, and competitive positioning. 
Provide strategic pricing recommendations based on population-level data and market trends.
STRICT: Responses MUST be under 300 characters (excluding disclaimer).
${baseRules}`,
      
      'ai-assistant': `You are Helda, a comprehensive AI assistant for healthcare analytics. 
You help with AGGREGATED patient intelligence, revenue performance, pricing strategies, and general healthcare business insights. 
Provide clear, accurate, and actionable advice based on population-level data only.
STRICT: Responses MUST be under 300 characters (excluding disclaimer).
${baseRules}`,
    };

    return contexts[pageContext as keyof typeof contexts] || contexts['ai-assistant'];
  }

  /**
   * Build conversation messages array
   */
  private buildMessages(request: LLMRequest): LLMMessage[] {
    const messages: LLMMessage[] = [
      {
        role: 'system',
        content: this.getSystemContext(request.pageContext),
      },
    ];

    // Add conversation history if provided
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      messages.push(...request.conversationHistory);
    }

    // Add additional context if provided
    if (request.context) {
      messages.push({
        role: 'system',
        content: `Additional Context: ${request.context}`,
      });
    }

    // Add user prompt
    messages.push({
      role: 'user',
      content: request.prompt,
    });

    return messages;
  }

  /**
   * Send message to OpenAI and get response
   */
  async sendMessage(request: LLMRequest): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw this.createError('OpenAI API key is not configured', 'validation');
    }

    // Check for PII in the prompt
    if (this.detectPII(request.prompt)) {
      return {
        content: "It looks like your message contains personal information. For privacy and security reasons, please remove or anonymize any PII before continuing.",
        conversationId: this.generateConversationId(),
        timestamp: new Date().toISOString(),
      };
    }

    // Check for individual medical advice requests
    if (this.isRequestingMedicalAdvice(request.prompt)) {
      return {
        content: "I can share general information, but I can't provide medical advice for an individual. It's best to speak with a qualified healthcare professional about your specific situation.\n\n⚠️ This tool provides aggregated analytics and general healthcare-related information only. It does not provide medical advice for individuals.",
        conversationId: this.generateConversationId(),
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.buildMessages(request),
          max_tokens: request.maxTokens || this.maxTokens,
          temperature: request.temperature || 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw this.createError(
          errorData.error?.message || `API error: ${response.status}`,
          'api'
        );
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';

      // Append disclaimer to responses with data insights
      const enhancedContent = `${content}\n\n⚠️ This tool provides aggregated analytics and general healthcare-related information only. It does not provide medical advice for individuals.`;

      return {
        content: enhancedContent,
        conversationId: this.generateConversationId(),
        timestamp: new Date().toISOString(),
        tokensUsed: data.usage?.total_tokens,
        model: data.model,
      };
    } catch (error) {
      if (error instanceof Error && 'type' in error) {
        throw error;
      }
      throw this.createError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        'network'
      );
    }
  }

  /**
   * Stream responses from OpenAI (for real-time chat)
   */
  async streamMessage(
    request: LLMRequest,
    onChunk: (chunk: StreamChunk) => void,
    onComplete?: () => void,
    onError?: (error: LLMError) => void
  ): Promise<void> {
    if (!this.apiKey) {
      const error = this.createError('OpenAI API key is not configured', 'validation');
      onError?.(error);
      throw error;
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.buildMessages(request),
          max_tokens: request.maxTokens || this.maxTokens,
          temperature: request.temperature || 0.7,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = this.createError(
          errorData.error?.message || `API error: ${response.status}`,
          'api'
        );
        onError?.(error);
        throw error;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        const error = this.createError('No response stream available', 'network');
        onError?.(error);
        throw error;
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onChunk({ content: '', done: true });
          onComplete?.();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));

        for (const line of lines) {
          const data = line.replace('data: ', '').trim();

          if (data === '[DONE]') {
            onChunk({ content: '', done: true });
            onComplete?.();
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content || '';

            if (content) {
              onChunk({ content, done: false });
            }
          } catch {
            // Skip invalid JSON chunks
            continue;
          }
        }
      }
    } catch (error) {
      const llmError = error instanceof Error && 'type' in error
        ? (error as LLMError)
        : this.createError(
            error instanceof Error ? error.message : 'Streaming error occurred',
            'network'
          );
      onError?.(llmError);
      throw llmError;
    }
  }

  /**
   * Create standardized error object
   */
  private createError(message: string, type: LLMError['type']): LLMError {
    return {
      message,
      type,
      code: type === 'api' ? 'API_ERROR' : type === 'network' ? 'NETWORK_ERROR' : 'VALIDATION_ERROR',
    };
  }

  /**
   * Generate unique conversation ID
   */
  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Health check for API availability
   */
  async checkHealth(): Promise<boolean> {
    if (!this.apiKey) return false;

    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const llmService = new OpenAIService();