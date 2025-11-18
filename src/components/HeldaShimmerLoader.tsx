// export default function HeldaShimmerLoader() {
//   return (
//     <>
//       <div
//         className="color-shimmer-loader h-3 w-4/5 max-w-2xl rounded-lg"
//         role="progressbar"
//         // aria-valuenow="100"
//         // aria-valuemin="0"
//         // aria-valuemax="100"
//       >
//         <div className="color-shimmer-light-overlay"></div>
//       </div>

//       <style>
//         {`
//         @keyframes colorShift {
//     0% {
//         background-position: 100% 0;
//     }
//     100% {
//         background-position: -300% 0;
//     }
// }

// /* Keyframes for the traveling white light effect */
// @keyframes travelingLight {
//     0% {
//         transform: translateX(-100%);
//     }
//     100% {
//         transform: translateX(300%);
//     }
// }

// .color-shimmer-loader {
//     /* Combining the four gradients into one long, repeating background */
//     background: linear-gradient(
//         90deg,
//         #5721B7 0%,
//         #D668CD 25%,
//         #CD4048 50%,
//         #5DB794 75%,
//         #5721B7 100%
//     );

//     /* Make the background 4x wider for the smooth sliding effect */
//     background-size: 400% 100%;

//     /* Apply the main color animation loop */
//     animation: colorShift 8s linear infinite;
//     box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
//     position: relative; /* Needed for the ::after light effect */
//     overflow: hidden; /* Crucial to contain the light overlay */
// }

// .color-shimmer-light-overlay {
//     content: '';
//     display: block;
//     height: 100%;
//     width: 50%; /* The width of the "light" spot */

//     background: linear-gradient(
//         90deg,
//         rgba(255, 255, 255, 0) 0%,
//         rgba(255, 255, 255, 0.8) 50%,
//         rgba(255, 255, 255, 0) 100%
//     );

//     animation: travelingLight 2s linear infinite;
//     mix-blend-mode: screen;
//     position: absolute;
//     top: 0;
//     left: 0;
// }
//         `}
//       </style>
//     </>
//   );
// }

import React from "react";

export type HeldaShimmerLoaderProps = {
  width?: number;
  height?: number;
  gradientDuration?: number;

  lightDuration?: number;
  usePercent?: boolean;
  className?: string;

  ariaLabel?: string;
};

export default function HeldaShimmerLoader({
  width = 920,
  height = 30,
  gradientDuration = 6000,
  lightDuration = 1500,
  usePercent = false,
  className = "",
  ariaLabel = "Loading",
}: HeldaShimmerLoaderProps): React.ReactElement {
  // CSS variables allow runtime tuning via inline style
  const cssVars: React.CSSProperties = {
    // background travel speed and light speed (ms)
    ["--hs-gradient-d" as any]: `${gradientDuration}ms`,
    ["--hs-light-d" as any]: `${lightDuration}ms`,
    ["--hs-height" as any]: `${height}px`,
    ["--hs-width" as any]: usePercent ? `${width}%` : `${width}px`,
  };

  return (
    <>
      <div
        className={`helda-shimmer-loader-root glow-scale ${className}`}
        style={cssVars}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <div className="h-[0.556vh] opacity-70 bg-white mix-blend-lighten blur-[0.5px] "></div>

        {/* inner line to create the faint center stroke */}
        <div className="helda-shimmer-inner-line" aria-hidden="true"></div>
      </div>
      <style>{`
        /* scoped styles for HeldaShimmerLoader */
        .helda-shimmer-loader-root {
          display: block;
          margin: 24px auto;
          width: var(--hs-width, 80%);
          height: var(--hs-height, 10px);
          border-radius: calc(var(--hs-height, 10px) * 0.5);
          overflow: hidden;
          position: relative;
          /* slight subtle outer glow similar to your original */
          box-shadow: 0 4px 18px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.02) inset;
        }
         .glow-scale::before {
            content: "";
            position: absolute;
            inset: -12px;
            border-radius: inherit;
            pointer-events: none;
            z-index: 0;

            /* initial gradient */
            background: linear-gradient(90deg, #5721b7 8.33%, #d668cd 83.37%);

            filter: blur(20px);
            opacity: 1;

            /* looping color animation */
            animation: heldaColorCycle 8s linear infinite;
        }

        /* layered gradient background (long horizontal strip) */
        .helda-shimmer-loader-root::before {
          content: "";
          position: absolute;
          inset: 0;
          /* combine the four gradients in order */
          background: linear-gradient(
            90deg,
            #5721B7 0%,
            #D668CD 25%,
            #CD4048 50%,
            #5DB794 75%,
            #5721B7 100%
          );
          background-size: 400% 100%;
          animation: hs-colorShift var(--hs-gradient-d, 16000ms) linear infinite;
          z-index: 1;
          will-change: background-position;
          filter: blur(10px);
          opacity: 1;
        }

        /* traveling bright spot overlay */
        .helda-shimmer-loader-root::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          /* the travelling "light" uses a long element (50% width) that slides across */
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.85) 50%,
            rgba(255,255,255,0) 100%
          );
          mix-blend-mode: screen;
          transform: translateX(-120%);
          animation: hs-travelingLight var(--hs-light-d, 2000ms) linear infinite;
          will-change: transform, opacity;
        }

        /* subtle inner faint line, similar to your screenshot */
        .helda-shimmer-inner-line {
          position: absolute;
          left: 0%;
          right: 0%;
          top: 50%;
          height: 6px;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.9);
          filter: blur(0.6px);
          border-radius: 999px;
          z-index: 3;
          pointer-events: none;
          margin-left:5px;
          margin-right:5px;
        }

        /* keyframes */
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

        @keyframes heldaColorCycle {
            0% {
            background: linear-gradient(90deg, #5721b7 8.33%, #d668cd 83.37%);
            }
            25% {
            background: linear-gradient(90deg, #d668cd 8.33%, #cd4048 89.03%);
            }
            50% {
            background: linear-gradient(90deg, #cd4048 1.94%, #5db794 90.28%);
            }
            75% {
            background: linear-gradient(90deg, #5db794 8.33%, #5721b7 91.81%);
            }
            100% {
            background: linear-gradient(90deg, #5721b7 8.33%, #d668cd 83.37%);
            }
        }

        /* Respect prefers-reduced-motion: pause animations */
        @media (prefers-reduced-motion: reduce) {
          .helda-shimmer-loader-root::before,
          .helda-shimmer-loader-root::after {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
