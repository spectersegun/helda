"use client";

export default function HeldaGlowBar({
  width = 1100,
  height = 10,
  className = "",
}) {
  const radius = height / 2;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
      }}
    >
      {/* GLOW LAYER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: "linear-gradient(90deg, #5721B7 8.33%, #D668CD 83.37%)",
          filter: "blur(20px)",
          opacity: 1,
          pointerEvents: "none",
        }}
      />

      {/* SOLID BAR */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: "linear-gradient(90deg, #5721B7 8.33%, #D668CD 83.37%)",
        }}
      />
    </div>
  );
}
