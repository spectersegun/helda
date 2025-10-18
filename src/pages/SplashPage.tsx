import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Splash from "../components/Splash";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";

export default function SplashPage() {
  const { currentView, navigateTo } = useAllPageNavigation();
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const didNavigate = useRef(false);

  useLayoutEffect(() => {
    try {
      const splashSeen = localStorage.getItem("splashSeen") === "true";

      if (splashSeen) {
        didNavigate.current = true;
        setShowSplash(false);
        navigateTo("healthcare");
      } else {
        setShowSplash(true);
      }
    } catch {
      setShowSplash(true);
    }
  }, [currentView]);

  const handleDone = useCallback(() => {
    if (didNavigate.current) return;
    localStorage.setItem("splashSeen", "true");
    didNavigate.current = true;

    setTimeout(() => navigateTo("healthcare"));
  }, [currentView]);

  if (showSplash === null) return null;
  return showSplash ? (
    <Splash onAnimationComplete={handleDone} showFor={7200} />
  ) : null;
}
