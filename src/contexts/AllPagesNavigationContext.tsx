import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ViewName =
  | "splashscreen"
  | "healthcare"
  | "dashboard"
  | "hospital-login"
  | "dentist-login"
  | "pharmacy-login"
  | "loading"
  | "incompatible"
  | "";

interface AllPageNavigationContextType {
  currentView: ViewName;
  navigateTo: (view: ViewName) => void;
}

const AllPageNavigationContext = createContext<
  AllPageNavigationContextType | undefined
>(undefined);

export const AllPageNavigationProvider: React.FC<{
  children: ReactNode;
  initialView?: ViewName;
}> = ({ children, initialView = "splashscreen" }) => {
  const [currentView, setCurrentView] = useState<ViewName>(initialView);

  const navigateTo = (view: ViewName) => {
    setCurrentView(view);
  };

  return (
    <AllPageNavigationContext.Provider value={{ currentView, navigateTo }}>
      {children}
    </AllPageNavigationContext.Provider>
  );
};

export const useAllPageNavigation = () => {
  const context = useContext(AllPageNavigationContext);
  if (!context)
    throw new Error(
      "useAllPageNavigation must be used within an AllPageNavigationProvider"
    );
  return context;
};
