import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAllPageNavigation } from "../../contexts/AllPagesNavigationContext";

export default function ProtectedRoute(Component: React.ComponentType) {
  const WrappedComponent: React.FC = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const { navigateTo, currentView } = useAllPageNavigation();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        if (
          !currentView.includes("healthcare") &&
          currentView !== "splashscreen" &&
          currentView !== "healthcare"
        ) {
          console.log("Redirecting unauthenticated user to healthcare.");
          navigateTo("healthcare");
        }
      }
    }, [isAuthenticated, loading, navigateTo, currentView]);

    if (!isAuthenticated) {
      navigateTo("healthcare");
      return null;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
}
