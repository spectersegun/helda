import React, { useEffect } from "react";
import "./LoadingPage.css";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";
import GreenWrapper from "../components/common/GreenWrapper";
import HeldaGradientGlowBar from "../components/HeldaGradientGlowBar";

const LoadingPage: React.FC = () => {
  const { currentView, navigateTo } = useAllPageNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo("dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentView]);

  return (
    <GreenWrapper className="relative ">
      <div className=" w-[55vw] h-[85vh] !mx-auto flex-shrink-0 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-[7.4vh] p-[2vw] w-full ">
          <img
            src="/images/heldaFullLogo.png"
            alt="Helda Full Logo"
            className="!w-auto !h-[27.315vh] !mb-[5.407vh]"
          />

          <div className=" flex flex-col justify-center items-center w-full">
            <HeldaGradientGlowBar />
          </div>
        </div>
      </div>
    </GreenWrapper>
  );
};

export default LoadingPage;
