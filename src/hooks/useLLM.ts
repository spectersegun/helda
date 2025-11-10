/**
 * Custom React Hook for LLM interactions
 * Provides state management and lifecycle methods for chat functionality
 */

import { useState, useCallback, useRef } from 'react';
import { llmService } from '../services/llmService';
import { useData } from '../contexts/DataContext';
import type { LLMRequest, LLMResponse, LLMMessage, LLMError } from '../types/llm.types';

interface UseLLMOptions {
  pageContext?: 'patient' | 'revenue' | 'pricing' | 'ai-assistant';
  onError?: (error: LLMError) => void;
  enableStreaming?: boolean;
  includeDataContext?: boolean; // Whether to include CSV data summary in context
}

interface UseLLMReturn {
  isLoading: boolean;
  error: LLMError | null;
  conversationHistory: LLMMessage[];
  sendMessage: (prompt: string, additionalContext?: string) => Promise<LLMResponse | null>;
  streamMessage: (prompt: string, onChunk: (text: string) => void, additionalContext?: string) => Promise<void>;
  clearHistory: () => void;
  isHealthy: boolean;
}

export function useLLM(options: UseLLMOptions = {}): UseLLMReturn {
  const { pageContext, onError, includeDataContext = true } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LLMError | null>(null);
  const [conversationHistory, setConversationHistory] = useState<LLMMessage[]>([]);
  const [isHealthy, setIsHealthy] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Get data context
  const { getDataSummary, dataSource } = useData();

  /**
   * Check API health on mount
   */
  useState(() => {
    llmService.checkHealth().then(setIsHealthy);
  });

  /**
   * Send message and get response
   */
  const sendMessage = useCallback(
    async (prompt: string, additionalContext?: string): Promise<LLMResponse | null> => {
      if (!prompt.trim()) return null;

      setIsLoading(true);
      setError(null);

      try {
        // Build context with data summary if enabled
        let contextString = additionalContext || '';
        
        if (includeDataContext && dataSource) {
          const dataSummary = getDataSummary();
          contextString = `${dataSummary}\n\n${contextString}`.trim();
        }

        const request: LLMRequest = {
          prompt: prompt.trim(),
          context: contextString,
          conversationHistory,
          pageContext,
        };

        const response = await llmService.sendMessage(request);

        // Update conversation history
        setConversationHistory(prev => [
          ...prev,
          { role: 'user', content: prompt },
          { role: 'assistant', content: response.content },
        ]);

        return response;
      } catch (err) {
        const llmError = err as LLMError;
        setError(llmError);
        onError?.(llmError);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [conversationHistory, pageContext, onError, includeDataContext, dataSource, getDataSummary]
  );

  /**
   * Stream message with real-time updates
   */
  const streamMessage = useCallback(
    async (prompt: string, onChunk: (text: string) => void, additionalContext: string = ''): Promise<void> => {
      if (!prompt.trim()) return;

      setIsLoading(true);
      setError(null);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      try {
        // Build context with data summary if enabled
        let contextString = additionalContext;
        
        if (includeDataContext && dataSource) {
          const dataSummary = getDataSummary();
          contextString = `${dataSummary}\n\n${contextString}`.trim();
        }

        const request: LLMRequest = {
          prompt: prompt.trim(),
          context: contextString,
          conversationHistory,
          pageContext,
        };

        let fullResponse = '';

        await llmService.streamMessage(
          request,
          (chunk) => {
            if (chunk.content) {
              fullResponse += chunk.content;
              onChunk(chunk.content);
            }
          },
          () => {
            // Update conversation history on completion
            setConversationHistory(prev => [
              ...prev,
              { role: 'user', content: prompt },
              { role: 'assistant', content: fullResponse },
            ]);
            setIsLoading(false);
          },
          (err) => {
            setError(err);
            onError?.(err);
            setIsLoading(false);
          }
        );
      } catch (err) {
        const llmError = err as LLMError;
        setError(llmError);
        onError?.(llmError);
        setIsLoading(false);
      }
    },
    [conversationHistory, pageContext, onError, includeDataContext, dataSource, getDataSummary]
  );

  /**
   * Clear conversation history
   */
  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    conversationHistory,
    sendMessage,
    streamMessage,
    clearHistory,
    isHealthy,
  };
}