/**
 * Chat History Context
 * Stores all LLM conversations across all pages, persisted per user
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface ChatHistoryItem {
  id: string;
  question: string;
  answer: string;
  page: 'patient' | 'revenue' | 'pricing' | 'ai-assistant';
  timestamp: string;
  date: string; // YYYY-MM-DD format
}

interface ChatHistoryContextType {
  history: ChatHistoryItem[];
  addToHistory: (question: string, answer: string, page: ChatHistoryItem['page']) => void;
  clearHistory: () => void;
  getHistoryByDate: (date: string) => ChatHistoryItem[];
  getTodayHistory: () => ChatHistoryItem[];
  getYesterdayHistory: () => ChatHistoryItem[];
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);

  /**
   * Load history from localStorage when user changes
   */
  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const storageKey = `chatHistory_${user.id}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch (err) {
        console.error("Error loading chat history:", err);
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, [user?.id]);

  /**
   * Save history to localStorage whenever it changes
   */
  useEffect(() => {
    if (!user) return;

    const storageKey = `chatHistory_${user.id}`;
    localStorage.setItem(storageKey, JSON.stringify(history));
  }, [history, user?.id]);

  /**
   * Add new conversation to history
   */
  const addToHistory = (question: string, answer: string, page: ChatHistoryItem['page']) => {
    const now = new Date();
    const newItem: ChatHistoryItem = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      question,
      answer,
      page,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0], // YYYY-MM-DD
    };

    setHistory(prev => [newItem, ...prev]); // Add to beginning
  };

  /**
   * Clear all history for current user
   */
  const clearHistory = () => {
    setHistory([]);
    if (user) {
      const storageKey = `chatHistory_${user.id}`;
      localStorage.removeItem(storageKey);
    }
  };

  /**
   * Get history for a specific date
   */
  const getHistoryByDate = (date: string): ChatHistoryItem[] => {
    return history.filter(item => item.date === date);
  };

  /**
   * Get today's history
   */
  const getTodayHistory = (): ChatHistoryItem[] => {
    const today = new Date().toISOString().split('T')[0];
    return getHistoryByDate(today);
  };

  /**
   * Get yesterday's history
   */
  const getYesterdayHistory = (): ChatHistoryItem[] => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];
    return getHistoryByDate(yesterdayDate);
  };

  const value = {
    history,
    addToHistory,
    clearHistory,
    getHistoryByDate,
    getTodayHistory,
    getYesterdayHistory,
  };

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider");
  }
  return context;
}
