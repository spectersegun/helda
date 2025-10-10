import { useEffect, useRef } from "react";

type Props = {
  /** total time to show before fade-out & complete (ms) */
  showFor?: number;
  onAnimationComplete?: () => void;
};

export default function Image({ showFor = 3000, onAnimationComplete }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    // Avoid double-run in React Strict Mode (dev)
    if (doneRef.current) return;
    doneRef.current = true;

    const id = window.setTimeout(() => {
      wrapRef.current?.classList.add("opacity-0");
      window.setTimeout(() => onAnimationComplete?.(), 400); // fade-out 400ms
    }, showFor);

    return () => clearTimeout(id);
  }, [showFor, onAnimationComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] bg-black transition-opacity duration-400"
    >
      {/* Respect prefers-reduced-motion: show static poster */}
      <div className="h-full w-full motion-safe:hidden">
        <img
          src="/assets/poster.avif"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Motion path */}
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
          {/* Optional animated WebP for some browsers (not all support <video> webp):
             If you generated an animated WebP, serve it via <img> swap or keep video-only. */}
        </video>
      </div>
    </div>
  );
}
