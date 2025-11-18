import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  rowHeight?: number;
  duration?: number;
};

export default function RollingNumberCompact({
  value,
  rowHeight = 50,
  duration = 950,
}: Props) {
  const colRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const target = Math.max(0, Math.floor(value));
    const col = colRef.current;
    if (!col) return;

    // start state (no transition)
    col.style.transition = "none";
    col.style.transform = "translateY(0px)";
    // force layout
    col.getBoundingClientRect();

    // animate to negative
    requestAnimationFrame(() => {
      col.style.transition = `transform ${duration}ms cubic-bezier(0.3,0.05,0.3,1)`;
      col.style.transform = `translateY(${-target * 25}px)`;
    });

    const onEnd = (ev: TransitionEvent) => {
      if (ev.propertyName !== "transform") return;
      setCollapsed(true);
    };

    col.addEventListener("transitionend", onEnd);
    return () => col.removeEventListener("transitionend", onEnd);
  }, [value, rowHeight, duration]);

  const target = Math.max(0, Math.floor(value));
  if (collapsed) {
    return (
      <div
        ref={containerRef}
        style={{
          height: rowHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.8vw",
        }}
      >
        {target}
      </div>
    );
  }

  const tail = 0;
  const maxIndex = Math.max(9, target) + tail;
  const nums = Array.from({ length: maxIndex + 1 }, (_, i) => i);

  return (
    <div
      style={{
        height: rowHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={colRef} style={{ display: "flex", flexDirection: "column" }}>
        {nums.map((n) => (
          <div
            key={n}
            style={{
              height: rowHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.8vw",
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
