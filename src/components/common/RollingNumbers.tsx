"use client";

import React, { useEffect, useRef } from "react";

type RollingNumberProps = {
  value: number; // The target number (e.g. 68)
  height?: number; // Height of each digit box in px
  delay?: number; // Delay between each digit animation
};

const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  height = 90,
  delay = 200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const digits = String(value).split("").map(Number);
    const digitElements = containerRef.current.querySelectorAll(".numbers");

    digitElements.forEach((el, i) => {
      const digit = digits[i];
      if (el instanceof HTMLElement) {
        setTimeout(() => {
          el.style.transform = `translateY(-${digit * height}px)`;
        }, 500 + i * delay);
      }
    });
  }, [value, height, delay]);

  const digits = String(value).split("").map(Number);

  return (
    <div className="flex gap-2 justify-center" ref={containerRef}>
      {digits.map((_, i) => (
        <div
          key={i}
          className="digit"
          style={{
            position: "relative",
            width: `${height * 0.7}px`,
            height: `${height}px`,
            overflow: "hidden",
            borderRadius: "10px",
            // boxShadow: "inset 0 0 10px #00ff90",
            color: "black",
            fontWeight: "bold",
            fontSize: `${height / 3}px`,
            textAlign: "center",
            lineHeight: `${height}px`,
          }}
        >
          <div
            className="numbers"
            style={{
              position: "absolute",
              top: 0,
              transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j}>{j}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RollingNumber;
