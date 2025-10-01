import React, { useEffect, useRef, useState } from "react";
import animationWhiteBgUpd1 from "./animationWhiteBgUpd1.gif";
import { Frame } from "./Frame";
import "./Image.css";

interface ImageProps {
  onAnimationComplete?: () => void;
}

export const Image: React.FC<ImageProps> = ({ onAnimationComplete }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      // Estimate animation duration based on typical GIF timing
      const estimatedDuration = 5500; // 7 seconds - adjust as needed

      setTimeout(() => {
        // Start fade out transition
        setIsTransitioning(true);

        // Wait for fade transition to complete before navigating
        setTimeout(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, 800); // 800ms fade transition
      }, estimatedDuration);
    };

    img.addEventListener("load", handleLoad);

    // If image is already loaded
    if (img.complete) {
      handleLoad();
    }

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [onAnimationComplete]);

  return (
    <div className={`image ${isTransitioning ? "transitioning" : ""}`}>
      <img
        ref={imgRef}
        className="animation-white-BG"
        alt="Animation white BG"
        src={animationWhiteBgUpd1}
      />
      {/* <Frame /> */}
    </div>
  );
};
