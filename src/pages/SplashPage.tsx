import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "../components/Image";

const SplashPage = () => {
  const navigate = useNavigate();

  // null = not decided yet, true = show splash, false = skip splash
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const didNavigate = useRef(false);

  useLayoutEffect(() => {
    // Runs before paint, so no flicker
    try {
      const splashSeen = localStorage.getItem("splashSeen") === "true";
      const isDesktopOrTablet = window.innerWidth <= 1280; // your logic

      if (splashSeen || isDesktopOrTablet) {
        didNavigate.current = true;
        setShowSplash(false);
        navigate("/healthcare", { replace: true });
      } else {
        setShowSplash(true);
      }
    } catch {
      // If localStorage is blocked, just show the splash
      setShowSplash(true);
    }
  }, [navigate]);

  const handleAnimationComplete = useCallback(() => {
    if (didNavigate.current) return; // guard against double navigation
    localStorage.setItem("splashSeen", "true");
    didNavigate.current = true;
    navigate("/healthcare", { replace: true });
  }, [navigate]);

  // While deciding, render nothing (or a tiny placeholder if you prefer)
  if (showSplash === null) return null;

  // Only render the animation when we decided to show it
  return showSplash ? (
    <Image onAnimationComplete={handleAnimationComplete} />
  ) : null;
};

export default SplashPage;
