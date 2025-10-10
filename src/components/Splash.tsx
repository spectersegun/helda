import { useEffect, useRef } from "react";

type Props = { showFor?: number; onAnimationComplete?: () => void };

export default function Splash({ showFor = 3000, onAnimationComplete }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      wrapRef.current?.classList.add("opacity-0");
      window.setTimeout(() => onAnimationComplete?.(), 400);
    }, showFor);

    return () => clearTimeout(id);
  }, [showFor, onAnimationComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] bg-black transition-opacity duration-[400ms]"
    >
      {/* avif */}
      <div className="h-full w-full motion-safe:hidden">
        <img
          src="/assets/poster.avif"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* MP4 and webp4 for reduced load */}
      <div className="hidden h-full w-full motion-safe:block">
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/assets/poster.avif"
          className="h-full w-full object-cover"
        >
          <source src="/assets/animationWhiteBgUpd1.webm" type="video/webm" />
          <source src="/assets/animationWhiteBgUpd1.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
