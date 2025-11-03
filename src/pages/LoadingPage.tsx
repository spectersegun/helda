import React, { useEffect } from "react";
import "./LoadingPage.css";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";
import GreenWrapper from "../components/common/GreenWrapper";

const LoadingPage: React.FC = () => {
  const { currentView, navigateTo } = useAllPageNavigation();

  useEffect(() => {
    // Simulate loading time - navigate to dashboard after 3 seconds #segunspecter
    const timer = setTimeout(() => {
      // Navigate to dashboard when loadin is done #segunspecter
      navigateTo("dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentView]);

  return (
    <GreenWrapper className="loading-container">
      <div className="loading-rectangle">
        <div className="loading-content">
          <img
            src="/images/heldaFullLogo.png"
            alt="Helda Full Logo"
            className="helda-full-logo"
          />

          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </GreenWrapper>
  );
};

export default LoadingPage;
