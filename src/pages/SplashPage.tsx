import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../components/Splash";

export default function SplashPage() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const didNavigate = useRef(false);

  useLayoutEffect(() => {
    try {
      const splashSeen = localStorage.getItem("splashSeen") === "true";
      const isSmallScreen = window.innerWidth <= 1280;

      if (splashSeen || isSmallScreen) {
        didNavigate.current = true;
        setShowSplash(false);
        navigate("/healthcare", { replace: true });
      } else {
        setShowSplash(true);
      }
    } catch {
      setShowSplash(true);
    }
  }, [navigate]);

  const handleDone = useCallback(() => {
    if (didNavigate.current) return;
    localStorage.setItem("splashSeen", "true");
    didNavigate.current = true;

    setTimeout(() => navigate("/healthcare", { replace: true }), 0);
  }, [navigate]);

  if (showSplash === null) return null;
  return showSplash ? (
    <Splash onAnimationComplete={handleDone} showFor={6200} />
  ) : null;
}
