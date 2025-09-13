import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "../components/Image";

const SplashPage = () => {
  const navigate = useNavigate();

  const isDesktopOrTablet = () => {
    const width = window.innerWidth;
    return width <= 1280;
  };

  useEffect(() => {
    const splashSeen = localStorage.getItem("splashSeen");

    if (splashSeen || isDesktopOrTablet()) {
      navigate("/healthcare", { replace: true });
    }
  }, [navigate]);

  const handleAnimationComplete = useCallback(() => {
    localStorage.setItem("splashSeen", "true");

    navigate("/healthcare");
  }, [navigate]);

  return <Image onAnimationComplete={handleAnimationComplete} />;
};

export default SplashPage;
