/**
 * Reusable LLM Chat Input Component
 * Can be used across Patient Intelligence, Revenue Performance, and Pricing Intelligence pages
 */

import { useState } from 'react';
import { SendIcon } from './Icons';
import { useLLM } from '../../hooks/useLLM';
import type { LLMError } from '../../types/llm.types';

interface LLMChatInputProps {
  pageContext: 'patient' | 'revenue' | 'pricing' | 'ai-assistant';
  onResponse: (response: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function LLMChatInput({
  pageContext,
  onResponse,
  placeholder = "Ask me anything",
  disabled = false,
  className = "",
}: LLMChatInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const { isLoading, error, sendMessage, isHealthy } = useLLM({
    pageContext,
    onError: (err: LLMError) => {
      console.error(`LLM Error in ${pageContext}:`, err);
    },
  });

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    
    if (!trimmedInput || isLoading || disabled) return;
    
    if (!isHealthy) {
      alert('AI assistant is currently unavailable. Please check your API configuration.');
      return;
    }

    setInputValue("");

    try {
      const response = await sendMessage(trimmedInput);

      if (response) {
        onResponse(response.content);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      onResponse("I apologize, but I'm having trouble connecting. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Error Display */}
      {error && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-red-50 border border-red-200 rounded-lg p-2">
          <p className="text-xs text-red-800">
            {error.message}
          </p>
        </div>
      )}

      {/* Health Warning */}
      {!isHealthy && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
          <p className="text-xs text-yellow-800">
            ⚠️ AI assistant unavailable
          </p>
        </div>
      )}

      <input
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading || disabled || !isHealthy}
        className="!pl-[0.8vw] !pr-[3.5vw] !rounded-[0.5vw] border w-full !h-[4.9vh] !text-[0.8vw] !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      />
      
      <button
        className="absolute right-[1.010vw] top-1/2 -translate-y-1/2 p-[0.8vh] rounded-lg !bg-white !outline-none hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        onClick={handleSendMessage}
        disabled={isLoading || !inputValue.trim() || disabled || !isHealthy}
        aria-label="Send message"
      >
        <SendIcon className="!h-[2.870vh] !w-auto" />
      </button>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <div className="animate-pulse text-emerald-800 text-xs">
            Thinking...
          </div>
        </div>
      )}
    </div>
  );
}