import React, { useEffect } from "react";
import "./LoadingPage.css";

// Import images
import backgroundImage from "./Slide1 1.jpg";
import heldaFullLogo from "./helda_full_logo.png";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";

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
    <div
      className="loading-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="loading-rectangle">
        <div className="loading-content">
          <img
            src={heldaFullLogo}
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
    </div>
  );
};

export default LoadingPage;
