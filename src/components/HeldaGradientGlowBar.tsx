export default function HeldaGradientGlowBar({ className = "", style = {} }) {
  return (
    <div className={`w-full ${className}`} style={style}>
      <style>{`
        @keyframes hs-colorShift {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -300% 0;
          }
        } 

        @keyframes hs-travelingLight {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          50% {
            transform: translateX(50%);
            opacity: 1;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(320%);
            opacity: 0;
          }
        }

        /* shimmer movement (kept) */
        @keyframes shimmerMove {
          0% {
            transform: translateY(-50%) translateX(-120%);
            opacity: 0;
          }
          8% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(-50%) translateX(20%);
            opacity: 1;
          }
          92% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-50%) translateX(380%);
            opacity: 0;
          }
        }

        .glow-scale::before {
          content: "";
          position: absolute;
          inset: -12px;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;

          background: linear-gradient(
            90deg,
            #5721b7 0%,
            #d668cd 25%,
            #cd4048 50%,
            #5db794 75%,
            #5721b7 100%
          );

          background-size: 400% 100%;

          filter: blur(20px);
          opacity: 1;

          animation: hs-colorShift 8000ms linear infinite;
          will-change: background-position;
        } 

        /* keep the moving white shimmer line */
        .shimmer-inner-line {
          position: absolute;
          left: -15%;
          width: 30%;
          border-radius: 50%;
          height: 14px;
          top: 50%;
          transform: translateY(-50%) translateX(0);
          border-radius: 999px;
          /* background: #ffffff; */
          opacity: 0.9;
          /* mix-blend-mode: hard-light; */
          z-index: 20;
          pointer-events: none;
          backdrop-filter: blur(4px);
          filter: blur(4px);
          animation: shimmerMove 1800ms linear infinite;
          will-change: transform, opacity;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          mix-blend-mode: screen;
          border-radius: 50%;
        }

        .helda-shimmer-loader-root {
          display: block;
          margin: 24px auto;
          width: 920px; /* keep your chosen defaults; replace inline if needed */
          height: 30px;
          border-radius: calc(30px * 0.5);
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.15),
            0 1px 0 rgba(255, 255, 255, 0.02) inset;
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-scale::before,
          .shimmer-inner-line {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="relative !mx-6"
        style={{ height: 12 }}
        role="img"
        aria-label="Helda gradient glow bar"
      >
        <div className="absolute inset-0 rounded-[12px] glow-scale"></div>

        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: "inherit" }}
        >
          <div
            className="h-1.5 z-10 w-full"
            style={{ backdropFilter: "1px", background: "white" }}
          ></div>

          <div className="shimmer-inner-line" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}
