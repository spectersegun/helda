// // "use client";

// // import { useEffect } from "react";
// // import { useNavigation } from "../../contexts/NavigationContext";
// // import { animate, motion, useMotionValue, useTransform } from "framer-motion";

// // type PatientIntelligenceCardProps = {
// //   title?: string;
// //   description?: string;
// //   className?: string;
// // };

// // export default function PatientIntelligenceCard({
// //   title = "Patient Intelligence",
// //   description = `Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, churn, and revenue impact to better tailor care and engagement.`,
// //   className = "",
// // }: PatientIntelligenceCardProps) {
// //   const { navigateToTab } = useNavigation();

// //   const count = useMotionValue(0);
// //   const rounded = useTransform(() => Math.round(count.get()));

// //   useEffect(() => {
// //     const controls = animate(count, 100, { duration: 5 });
// //     return () => controls.stop();
// //   }, []);

// //   return (
// //     <div
// //       className={[
// //         "relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px] cursor-pointer flex flex-col justify-between w-full items-stretch",
// //         "!pt-3 pb-20 shadow-sm border border-[#FCFAFA] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 ease-in-out",
// //         className,
// //       ].join(" ")}
// //       onClick={() => navigateToTab("patient")}
// //     >
// //       <div className="!px-3">
// //         <h3 className="!text-[22px] md:!text-xl !font-semibold text-black !mb-0 ">
// //           {title}
// //         </h3>

// //         <p className="mx-auto mt-0 !mb-0 text-[10.5px] leading-4 text-black !font-light ">
// //           {description}
// //         </p>
// //       </div>

// //       <div className=" !w-full !pb-1.5 flex flex-col items-center">
// //         <svg
// //           width="252"
// //           height="114"
// //           viewBox="0 0 262 137"
// //           fill="none"
// //           xmlns="http://www.w3.org/2000/svg"
// //           className="max-w-full h-auto"
// //         >
// //           <defs>
// //             <clipPath id="reveal-1">
// //               <rect x="0" y="0" width="0" height="137">
// //                 <animate
// //                   attributeName="width"
// //                   from="0"
// //                   to="262"
// //                   dur="800ms"
// //                   begin="0s"
// //                   fill="freeze"
// //                   calcMode="spline"
// //                   keySplines="0.2 0.8 0.2 1"
// //                 />
// //               </rect>
// //             </clipPath>
// //             <clipPath id="reveal-2">
// //               <rect x="0" y="0" width="0" height="137">
// //                 <animate
// //                   attributeName="width"
// //                   from="0"
// //                   to="262"
// //                   dur="900ms"
// //                   begin="200ms"
// //                   fill="freeze"
// //                   calcMode="spline"
// //                   keySplines="0.2 0.8 0.2 1"
// //                 />
// //               </rect>
// //             </clipPath>
// //           </defs>

// //           <path
// //             d="M0 131C1.50395e-06 113.797 3.38842 96.7621 9.97179 80.8685C16.5552 64.9748 26.2045 50.5335 38.369 38.369C50.5335 26.2045 64.9748 16.5551 80.8685 9.97178C96.7621 3.38841 113.797 -2.25592e-06 131 0C148.203 2.25592e-06 165.238 3.38842 181.132 9.97179C197.025 16.5552 211.467 26.2045 223.631 38.369C235.795 50.5335 245.445 64.9748 252.028 80.8685C258.612 96.7621 262 113.797 262 131L218.77 131C218.77 119.474 216.5 108.061 212.089 97.4119C207.678 86.7631 201.213 77.0874 193.063 68.9372C184.913 60.787 175.237 54.322 164.588 49.9111C153.939 45.5002 142.526 43.23 131 43.23C119.474 43.23 108.061 45.5002 97.4119 49.9111C86.7631 54.3219 77.0874 60.787 68.9372 68.9372C60.787 77.0874 54.3219 86.7631 49.9111 97.4119C45.5002 108.061 43.23 119.474 43.23 131H0Z"
// //             fill="#E6F1F3"
// //           />

// //           <g clipPath="url(#reveal-1)">
// //             <path
// //               d="M0 131C1.92903e-06 108.934 5.57368 87.2264 16.2038 67.8903C26.834 48.5541 42.1762 32.2163 60.8067 20.393C79.4373 8.56973 100.752 1.644 122.774 0.258497C144.796 -1.12701 166.812 3.07262 186.777 12.4677L168.371 51.5833C154.994 45.2887 140.244 42.4749 125.489 43.4032C110.734 44.3315 96.453 48.9717 83.9705 56.8933C71.488 64.8149 61.2088 75.7612 54.0866 88.7165C46.9644 101.672 43.23 116.216 43.23 131H0Z"
// //               fill="#1F664B"
// //             />
// //           </g>

// //           <g clipPath="url(#reveal-2)">
// //             <path
// //               d="M24.0578 108.012C12.3867 105.503 4.79518 93.9069 9.18696 82.8065C16.4757 64.384 27.8857 47.763 42.6523 34.2752C62.7673 15.9023 88.1099 4.25769 115.153 0.962068C142.196 -2.33355 169.593 2.88385 193.532 15.8881C211.106 25.4346 226.173 38.8288 237.673 54.9616C244.603 64.6824 240.018 77.7627 229.291 83.001C218.564 88.2394 205.795 83.5466 198.099 74.4205C191.091 66.1096 182.559 59.1241 172.896 53.875C156.857 45.1622 138.501 41.6665 120.382 43.8746C102.264 46.0826 85.2841 53.8846 71.807 66.1944C63.6876 73.6106 57.0829 82.4407 52.2759 92.1915C46.9975 102.899 35.7288 110.521 24.0578 108.012Z"
// //               fill="#1F664B"
// //             />
// //           </g>
// //         </svg>

// //         <motion.pre className="text-5xl absolute bottom-10 text-black font-medium  ">
// //           {/* 68% */}
// //           {rounded}
// //         </motion.pre>

// //         <p className="text-black text-xl !mb-0 ">New vs Returning patients</p>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useEffect, useRef } from "react";
// import { useNavigation } from "../../contexts/NavigationContext";

// type PatientIntelligenceCardProps = {
//   title?: string;
//   description?: string;
//   className?: string;
//   /** if true, shows a CSS-only static number; if false + withCounter hook used, it counts 0→100 */
//   staticNumber?: boolean;
// };

// export default function PatientIntelligenceCard({
//   title = "Patient Intelligence",
//   description = `Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, churn, and revenue impact to better tailor care and engagement.`,
//   className = "",
//   staticNumber = true,
// }: PatientIntelligenceCardProps) {
//   const { navigateToTab } = useNavigation();

//   // OPTIONAL: tiny JS counter (remove this block if you want 100% CSS with static number)
//   const counterRef = useRef<HTMLSpanElement>(null);
//   useEffect(() => {
//     if (staticNumber) return; // skip if you want pure CSS
//     let raf = 0;
//     const start = performance.now();
//     const dur = 1500; // ms
//     const tick = (t: number) => {
//       const p = Math.min(1, (t - start) / dur);
//       const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
//       const val = Math.round(eased * 100);
//       if (counterRef.current) counterRef.current.textContent = String(val);
//       if (p < 1) raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [staticNumber]);

//   return (
//     <div
//       onClick={() => navigateToTab("patient")}
//       className={[
//         "relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px] cursor-pointer flex flex-col justify-between w-full items-stretch",
//         "pt-3 pb-20 shadow-sm border border-[#FCFAFA] transition-shadow duration-300 ease-in-out hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)]",
//         "opacity-0 animate-fade-up", // card entrance
//         className,
//       ].join(" ")}
//       style={{ animationDelay: "100ms" }} // stagger example
//     >
//       <div className="px-3">
//         <h3 className="text-[22px] md:text-xl font-semibold text-black mb-0">
//           {title}
//         </h3>

//         <p className="mx-auto mt-0 mb-0 text-[10.5px] leading-4 text-black font-light">
//           {description}
//         </p>
//       </div>

//       <div className="w-full pb-1.5 flex flex-col items-center">
//         {/* SVG with CSS-based clip reveals */}
//         <svg
//           width="252"
//           height="114"
//           viewBox="0 0 262 137"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="max-w-full h-auto"
//         >
//           <defs>
//             <clipPath id="reveal-1">
//               <rect
//                 x="0"
//                 y="0"
//                 height="137"
//                 width="0"
//                 className="animate-rect-grow"
//                 style={{ animationDelay: "0ms" }}
//               />
//             </clipPath>
//             <clipPath id="reveal-2">
//               <rect
//                 x="0"
//                 y="0"
//                 height="137"
//                 width="0"
//                 className="animate-rect-grow"
//                 style={{ animationDelay: "200ms", animationDuration: "900ms" }}
//               />
//             </clipPath>
//           </defs>

//           <path
//             d="M0 131C1.50395e-06 113.797 3.38842 96.7621 9.97179 80.8685C16.5552 64.9748 26.2045 50.5335 38.369 38.369C50.5335 26.2045 64.9748 16.5551 80.8685 9.97178C96.7621 3.38841 113.797 -2.25592e-06 131 0C148.203 2.25592e-06 165.238 3.38842 181.132 9.97179C197.025 16.5552 211.467 26.2045 223.631 38.369C235.795 50.5335 245.445 64.9748 252.028 80.8685C258.612 96.7621 262 113.797 262 131L218.77 131C218.77 119.474 216.5 108.061 212.089 97.4119C207.678 86.7631 201.213 77.0874 193.063 68.9372C184.913 60.787 175.237 54.322 164.588 49.9111C153.939 45.5002 142.526 43.23 131 43.23C119.474 43.23 108.061 45.5002 97.4119 49.9111C86.7631 54.3219 77.0874 60.787 68.9372 68.9372C60.787 77.0874 54.3219 86.7631 49.9111 97.4119C45.5002 108.061 43.23 119.474 43.23 131H0Z"
//             fill="#E6F1F3"
//             className="opacity-0 animate-fade-up"
//             style={{ animationDelay: "120ms" }}
//           />

//           <g clipPath="url(#reveal-1)">
//             <path
//               d="M0 131C1.92903e-06 108.934 5.57368 87.2264 16.2038 67.8903C26.834 48.5541 42.1762 32.2163 60.8067 20.393C79.4373 8.56973 100.752 1.644 122.774 0.258497C144.796 -1.12701 166.812 3.07262 186.777 12.4677L168.371 51.5833C154.994 45.2887 140.244 42.4749 125.489 43.4032C110.734 44.3315 96.453 48.9717 83.9705 56.8933C71.488 64.8149 61.2088 75.7612 54.0866 88.7165C46.9644 101.672 43.23 116.216 43.23 131H0Z"
//               fill="#1F664B"
//             />
//           </g>

//           <g clipPath="url(#reveal-2)">
//             <path
//               d="M24.0578 108.012C12.3867 105.503 4.79518 93.9069 9.18696 82.8065C16.4757 64.384 27.8857 47.763 42.6523 34.2752C62.7673 15.9023 88.1099 4.25769 115.153 0.962068C142.196 -2.33355 169.593 2.88385 193.532 15.8881C211.106 25.4346 226.173 38.8288 237.673 54.9616C244.603 64.6824 240.018 77.7627 229.291 83.001C218.564 88.2394 205.795 83.5466 198.099 74.4205C191.091 66.1096 182.559 59.1241 172.896 53.875C156.857 45.1622 138.501 41.6665 120.382 43.8746C102.264 46.0826 85.2841 53.8846 71.807 66.1944C63.6876 73.6106 57.0829 82.4407 52.2759 92.1915C46.9975 102.899 35.7288 110.521 24.0578 108.012Z"
//               fill="#1F664B"
//             />
//           </g>
//         </svg>

//         {/* NUMBER: CSS-only static OR tiny-JS counter */}
//         {staticNumber ? (
//           <pre
//             className="text-5xl absolute bottom-10 text-black font-medium opacity-0 animate-fade-up"
//             style={{ animationDelay: "260ms" }}
//           >
//             100
//           </pre>
//         ) : (
//           <pre
//             className="text-5xl absolute bottom-10 text-black font-medium opacity-0 animate-fade-up"
//             style={{ animationDelay: "260ms" }}
//           >
//             <span ref={counterRef}>0</span>
//           </pre>
//         )}

//         <p
//           className="text-black text-xl mb-0 opacity-0 animate-fade-up"
//           style={{ animationDelay: "320ms" }}
//         >
//           New vs Returning patients
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef } from "react";
import { useNavigation } from "../../contexts/NavigationContext";

type PatientIntelligenceCardProps = {
  title?: string;
  description?: string;
  className?: string;
  /** if true, shows a CSS-only static number; if false + withCounter hook used, it counts 0→100 */
  staticNumber?: boolean;
};

export default function PatientIntelligenceCard({
  title = "Patient Intelligence",
  description = `Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, churn, and revenue impact to better tailor care and engagement.`,
  className = "",
  staticNumber = true,
}: PatientIntelligenceCardProps) {
  const { navigateToTab } = useNavigation();

  // OPTIONAL: tiny JS counter (remove this block if you want 100% CSS with static number)
  const counterRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (staticNumber) return; // skip if you want pure CSS
    let raf = 0;
    const start = performance.now();
    const dur = 1500; // ms
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = Math.round(eased * 100);
      if (counterRef.current) counterRef.current.textContent = String(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [staticNumber]);

  return (
    <div
      onClick={() => navigateToTab("patient")}
      className={[
        "!relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px] cursor-pointer flex flex-col justify-between w-full items-stretch",
        "pt-3 pb-20 shadow-sm border border-[#FCFAFA] transition-shadow duration-300 ease-in-out hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)]",
        "opacity-0 animate-fade-up", // card entrance
        className,
      ].join(" ")}
      style={{ animationDelay: "100ms" }} // stagger example
    >
      <div className="px-3">
        <h3 className="text-[22px] md:text-xl font-semibold text-black mb-0">
          {title}
        </h3>

        <p className="mx-auto mt-0 mb-0 text-[10.5px] leading-4 text-black font-light">
          {description}
        </p>
      </div>

      <div className="w-full pb-1.5 flex flex-col items-center">
        {/* SVG with CSS-based clip reveals */}
        <svg
          width="252"
          height="114"
          viewBox="0 0 262 137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full h-auto"
        >
          <defs>
            <clipPath id="reveal-1">
              <rect
                x="0"
                y="0"
                height="137"
                width="0"
                className="animate-rect-grow"
                style={{ animationDelay: "0ms" }}
              />
            </clipPath>
            <clipPath id="reveal-2">
              <rect
                x="0"
                y="0"
                height="137"
                width="0"
                className="animate-rect-grow"
                style={{ animationDelay: "200ms", animationDuration: "900ms" }}
              />
            </clipPath>
          </defs>

          <path
            d="M0 131C1.50395e-06 113.797 3.38842 96.7621 9.97179 80.8685C16.5552 64.9748 26.2045 50.5335 38.369 38.369C50.5335 26.2045 64.9748 16.5551 80.8685 9.97178C96.7621 3.38841 113.797 -2.25592e-06 131 0C148.203 2.25592e-06 165.238 3.38842 181.132 9.97179C197.025 16.5552 211.467 26.2045 223.631 38.369C235.795 50.5335 245.445 64.9748 252.028 80.8685C258.612 96.7621 262 113.797 262 131L218.77 131C218.77 119.474 216.5 108.061 212.089 97.4119C207.678 86.7631 201.213 77.0874 193.063 68.9372C184.913 60.787 175.237 54.322 164.588 49.9111C153.939 45.5002 142.526 43.23 131 43.23C119.474 43.23 108.061 45.5002 97.4119 49.9111C86.7631 54.3219 77.0874 60.787 68.9372 68.9372C60.787 77.0874 54.3219 86.7631 49.9111 97.4119C45.5002 108.061 43.23 119.474 43.23 131H0Z"
            fill="#E6F1F3"
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          />

          <g clipPath="url(#reveal-1)">
            <path
              d="M0 131C1.92903e-06 108.934 5.57368 87.2264 16.2038 67.8903C26.834 48.5541 42.1762 32.2163 60.8067 20.393C79.4373 8.56973 100.752 1.644 122.774 0.258497C144.796 -1.12701 166.812 3.07262 186.777 12.4677L168.371 51.5833C154.994 45.2887 140.244 42.4749 125.489 43.4032C110.734 44.3315 96.453 48.9717 83.9705 56.8933C71.488 64.8149 61.2088 75.7612 54.0866 88.7165C46.9644 101.672 43.23 116.216 43.23 131H0Z"
              fill="#1F664B"
            />
          </g>

          <g clipPath="url(#reveal-2)">
            <path
              d="M24.0578 108.012C12.3867 105.503 4.79518 93.9069 9.18696 82.8065C16.4757 64.384 27.8857 47.763 42.6523 34.2752C62.7673 15.9023 88.1099 4.25769 115.153 0.962068C142.196 -2.33355 169.593 2.88385 193.532 15.8881C211.106 25.4346 226.173 38.8288 237.673 54.9616C244.603 64.6824 240.018 77.7627 229.291 83.001C218.564 88.2394 205.795 83.5466 198.099 74.4205C191.091 66.1096 182.559 59.1241 172.896 53.875C156.857 45.1622 138.501 41.6665 120.382 43.8746C102.264 46.0826 85.2841 53.8846 71.807 66.1944C63.6876 73.6106 57.0829 82.4407 52.2759 92.1915C46.9975 102.899 35.7288 110.521 24.0578 108.012Z"
              fill="#1F664B"
            />
          </g>
        </svg>

        {/* NUMBER: CSS-only static OR tiny-JS counter */}
        {staticNumber ? (
          <pre
            className="text-5xl absolute bottom-10 text-black font-medium opacity-0 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            100
          </pre>
        ) : (
          <pre
            className="text-5xl absolute bottom-10 text-black font-medium opacity-0 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            <span ref={counterRef}>0</span>
          </pre>
        )}

        <p
          className="text-black text-xl mb-0 opacity-0 animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          New vs Returning patients
        </p>
      </div>
    </div>
  );
}
