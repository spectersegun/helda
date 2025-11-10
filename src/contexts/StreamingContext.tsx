import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ConversationItem {
  question: string;
  answer: string;
  timestamp: number;
}

interface StreamingState {
  isStreaming: boolean;
  currentQuestion: string;
  streamingResponse: string;
  pageContext: 'patient' | 'revenue' | 'pricing' | 'ai-assistant';
  conversationHistory: ConversationItem[];
}

interface StreamingContextType {
  streamingState: StreamingState | null;
  setStreamingState: (state: StreamingState | null) => void;
  clearStreamingState: () => void;
  updateStreamingResponse: (response: string) => void;
  addToConversation: (question: string, answer: string) => void;
}

const StreamingContext = createContext<StreamingContextType | undefined>(undefined);

export function StreamingProvider({ children }: { children: ReactNode }) {
  const [streamingState, setStreamingStateInternal] = useState<StreamingState | null>(null);

  const setStreamingState = useCallback((state: StreamingState | null) => {
    setStreamingStateInternal(state);
    
    // Also persist to sessionStorage for page refreshes
    if (state) {
      sessionStorage.setItem('helda_streaming_state', JSON.stringify(state));
    } else {
      sessionStorage.removeItem('helda_streaming_state');
    }
  }, []);

  const clearStreamingState = useCallback(() => {
    setStreamingStateInternal(null);
    sessionStorage.removeItem('helda_streaming_state');
  }, []);

  const updateStreamingResponse = useCallback((response: string) => {
    setStreamingStateInternal(prev => {
      if (!prev) return null;
      const updated = { ...prev, streamingResponse: response };
      sessionStorage.setItem('helda_streaming_state', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToConversation = useCallback((question: string, answer: string) => {
    setStreamingStateInternal(prev => {
      if (!prev) return null;
      const newItem: ConversationItem = {
        question,
        answer,
        timestamp: Date.now(),
      };
      const updated = {
        ...prev,
        conversationHistory: [...prev.conversationHistory, newItem],
        isStreaming: false,
        currentQuestion: '',
        streamingResponse: '',
      };
      sessionStorage.setItem('helda_streaming_state', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Load from sessionStorage on mount
  React.useEffect(() => {
    const saved = sessionStorage.getItem('helda_streaming_state');
    if (saved) {
      try {
        setStreamingStateInternal(JSON.parse(saved));
      } catch {
        sessionStorage.removeItem('helda_streaming_state');
      }
    }
  }, []);

  return (
    <StreamingContext.Provider value={{ 
      streamingState, 
      setStreamingState, 
      clearStreamingState,
      updateStreamingResponse,
      addToConversation 
    }}>
      {children}
    </StreamingContext.Provider>
  );
}

export function useStreaming() {
  const context = useContext(StreamingContext);
  if (context === undefined) {
    throw new Error('useStreaming must be used within a StreamingProvider');
  }
  return context;
}
