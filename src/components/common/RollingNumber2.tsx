// import { useEffect, useRef, useState } from "react";

// type Props = {
//   value: number;
//   rowHeight?: number | string;
//   duration?: number;
//   fontSize?: number | string;
//   animationDelay?: number;
// };

// export default function RollingNumber2({
//   value,
//   rowHeight = 50,
//   duration = 950,
//   animationDelay = 600,
// }: // fontSize = "2.8vw",

// Props) {
//   const colRef = useRef<HTMLDivElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const fallbackTimerRef = useRef<number | null>(null);

//   useEffect(() => {
//     const target = Math.max(0, Math.floor(value));
//     const col = colRef.current;
//     if (!col) return;

//     // start state (no transition)
//     col.style.transition = "none";
//     col.style.transform = "translateY(0px)";
//     // force layout
//     col.getBoundingClientRect();

//     // animate to negative
//     requestAnimationFrame(() => {
//       col.style.transition = `transform ${duration}ms cubic-bezier(0.3,0.05,0.3,1) ${animationDelay}ms`;
//       col.style.transform = `translateY(${-target * 25}px)`;
//     });

//     const onEnd = (ev: TransitionEvent) => {
//       if (ev.propertyName !== "transform") return;
//       setCollapsed(true);
//     };

//     col.addEventListener("transitionend", onEnd);
//     const total = duration + (animationDelay || 0) + 50; // small buffer
//     fallbackTimerRef.current = window.setTimeout(() => {
//       setCollapsed(true);
//       fallbackTimerRef.current = null;
//     }, total);

//     return () => col.removeEventListener("transitionend", onEnd);
//   }, [value, rowHeight, duration, animationDelay]);

//   const target = Math.max(0, Math.floor(value));
//   if (collapsed) {
//     return (
//       <div className="flex items-center justify-center gap-[0.2vw]">
//         <div
//           ref={containerRef}
//           className="2xl:h-[9.31vh] h-[8vh]"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "2.8vw",
//           }}
//         >
//           {target}
//         </div>
//         <span className="text-[2.5vw] ">%</span>
//       </div>
//     );
//   }

//   const tail = 0;
//   const maxIndex = Math.max(9, target) + tail;
//   const nums = Array.from({ length: maxIndex + 1 }, (_, i) => i);

//   return (
//     <div
//       className="2xl:h-[9.31vh] h-[8vh]"
//       style={{
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         borderStartEndRadius: "50%",
//         borderStartStartRadius: "50%",
//       }}
//     >
//       <div className="flex items-center justify-center gap-[0.2vw] ">
//         <div ref={colRef} style={{ display: "flex", flexDirection: "column" }}>
//           {nums.map((n) => (
//             <div
//               key={n}
//               style={{
//                 height: rowHeight,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "2.8vw",
//               }}
//             >
//               {n}
//             </div>
//           ))}
//         </div>
//         <span className="text-[2.5vw] ">%</span>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  rowHeight?: number | string;
  duration?: number; // ms
  fontSize?: number | string;
  animationDelay?: number; // ms
};

export default function RollingNumberCompact({
  value,
  rowHeight = 50,
  duration = 950,
  fontSize = "2.8vw",
  animationDelay = 0,
}: Props) {
  const colRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const target = Math.max(0, Math.floor(value));
    const col = colRef.current;
    if (!col) return;

    // clear any previous fallback timer
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    // start state (no transition)
    col.style.transition = "none";
    col.style.transform = "translateY(0px)";
    // force layout
    col.getBoundingClientRect();

    // animate to negative after rAF, include delay in the transition string
    requestAnimationFrame(() => {
      col.style.transition = `transform ${duration}ms cubic-bezier(0.3,0.05,0.3,1) ${animationDelay}ms`;
      col.style.transform = `translateY(${-target * 25}px)`;
    });

    // transition end handler
    const onEnd = (ev: TransitionEvent) => {
      if (ev.propertyName !== "transform") return;
      setCollapsed(true);
    };

    col.addEventListener("transitionend", onEnd);

    // fallback in case the transitionend doesn't fire for any reason
    const total = duration + (animationDelay || 0) + 50; // small buffer
    fallbackTimerRef.current = window.setTimeout(() => {
      setCollapsed(true);
      fallbackTimerRef.current = null;
    }, total);

    return () => {
      col.removeEventListener("transitionend", onEnd);
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [value, rowHeight, duration, animationDelay]);

  const target = Math.max(0, Math.floor(value));
  if (collapsed) {
    return (
      <div className="flex items-center justify-center gap-[0.2vw]">
        <div
          ref={containerRef}
          className="2xl:h-[9.31vh] h-[8vh]"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: fontSize,
          }}
        >
          {target}
        </div>
        <span className="text-[2.5vw] ">%</span>
      </div>
    );
  }

  const tail = 0;
  const maxIndex = Math.max(9, target) + tail;
  const nums = Array.from({ length: maxIndex + 1 }, (_, i) => i);

  return (
    <div
      className="2xl:h-[9.31vh] h-[8vh]"
      style={{
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderStartEndRadius: "50%",
        borderStartStartRadius: "50%",
      }}
    >
      <div className="flex items-center justify-center gap-[0.2vw] ">
        <div ref={colRef} style={{ display: "flex", flexDirection: "column" }}>
          {nums.map((n) => (
            <div
              key={n}
              style={{
                height: rowHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: fontSize,
              }}
            >
              {n}
            </div>
          ))}
        </div>
        <span className="text-[2.5vw] ">%</span>
      </div>
    </div>
  );
}
