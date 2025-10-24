"use client";

import React, { useEffect, useRef } from "react";

type RollingNumberProps = {
  value: number;
  height?: number;
  duration?: number;
};

const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  height = 100,
  duration = 2000,
}) => {
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numbersRef.current) return;
    const target = numbersRef.current;

    target.style.transition = `transform ${duration}ms cubic-bezier(0.3, 0.05, 0.3, 1)`;
    target.style.transform = `translateY(${value * height}px)`;
  }, [value, height, duration]);

  return (
    <div
      style={{
        height: `${height}px`,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        fontSize: `${height * 0.5}px`,
        width: "7.6vw",
        background: "inherit",
      }}
    >
      <div
        ref={numbersRef}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Array.from({ length: value + 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: `${height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i <= value ? i : value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingNumber;
