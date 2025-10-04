import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Export TabKey type for consistent usage across components
export type TabKey =
  | "home"
  | "pricing"
  | "revenue"
  | "patient"
  | "assistant"
  | "settings"
  | "profile";

interface NavigationContextType {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  navigateToTab: (tab: TabKey) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: ReactNode;
  defaultTab?: TabKey;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
  defaultTab = "home",
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);

  // Enhanced navigation function with optional side effects
  const navigateToTab = (tab: TabKey) => {
    setActiveTab(tab);
    // Optional: Add analytics tracking, URL updates, etc.
    console.log(`Navigated to: ${tab}`);
  };

  const value: NavigationContextType = {
    activeTab,
    setActiveTab,
    navigateToTab,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook for accessing navigation context
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
