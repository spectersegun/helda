import React, { useEffect } from "react";
import "./LoadingPage.css";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";
import GreenWrapper from "../components/common/GreenWrapper";
import HeldaShimmerLoader from "../components/HeldaShimmerLoader";
// import HeldaGlowBar from "../components/common/HeldaGlowBar";

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
      <div className="lg:!max-w-[55.000vw] max-w-[1778px] w-[90vw] max-h-[955px] !mx-auto h-[85vh] flex-shrink-0 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-[7.4vh] p-[2vw] ">
          <img
            src="/images/heldaFullLogo.png"
            alt="Helda Full Logo"
            className="!w-auto !h-[27.315vh]"
          />

          <div className=" flex flex-col justify-center items-center w-full">
            <HeldaShimmerLoader />

            {/* <HeldaGlowBar width={1200} /> */}
            {/* <HeldaLoadingAnimation
              width={1200}
              height={44}
              light1Duration={1800}
              light2Duration={2600}
              light1Blur={30}
              light2Blur={36}
              debug={true}
            /> */}

            {/* <div className="loading-bar">
              <div className="loading-progress"></div>
            </div> */}
            {/* <div className="">
              <video
                className="loading-video w-full h-[40px] "
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                // poster="/images/Loading.png"
                aria-hidden="true"
              >
                <source
                  src="/public/assets/loadingHelda.webp"
                  type="video/webm"
                />
                <source
                  src="/public/assets/loadingHelda.mp4"
                  type="video/mp4"
                />
                video is not playing
              </video>
            </div> */}
          </div>
        </div>
      </div>
    </GreenWrapper>
  );
};

export default LoadingPage;
