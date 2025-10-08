"use client";

import React from "react";

type Props = {
  value?: number; // 0–100
  thickness?: number; // ring thickness in px (SVG units)
  trackColor?: string; // light track
  arcColor?: string; // progress arc
  bubble?: boolean; // show round end cap
  label?: React.ReactNode; // center content (defaults to %)
  className?: string;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const t = (Math.PI / 180) * deg;
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
}

export default function HalfGauge({
  value = 68,
  thickness = 110,
  trackColor = "#E8F4F5",
  arcColor = "#1F664B",
  bubble = true,
  label,
  className = "",
}: Props) {
  const pct = Math.max(0, Math.min(100, value)) / 100;

  // --- Geometry with padding so strokes & bubble never get clipped ---
  const W = 1000; // logical width
  const H = 500; // logical half-height (top semicircle)
  const pad = thickness / 2 + 12; // extra safe headroom
  const vbW = W;
  const vbH = H + pad; // enlarge the viewBox vertically

  const cx = vbW / 2;
  const cy = vbH; // center below the drawing area
  const r = Math.min(vbW, vbH * 2) / 2 - thickness / 2 - 6; // ensure full arc inside

  // left (-180°) to right (0°)
  const start = -180;
  const end = 0;
  const angle = start + (end - start) * pct;

  const pStart = polar(cx, cy, r, start);
  const pEndTrack = polar(cx, cy, r, end);
  const pEndArc = polar(cx, cy, r, angle);

  const largeArcFull = 1; // 180° arc
  const largeArcProg = pct > 0.5 ? 1 : 0;

  const dTrack = `M ${pStart.x} ${pStart.y} A ${r} ${r} 0 ${largeArcFull} 1 ${pEndTrack.x} ${pEndTrack.y}`;
  const dArc = `M ${pStart.x} ${pStart.y} A ${r} ${r} 0 ${largeArcProg} 1 ${pEndArc.x} ${pEndArc.y}`;

  const defaultLabel = (
    <text
      x={cx}
      y={cy - r * 0.28}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={170}
      fontWeight={800}
      fill="#0A0A0A"
    >
      {Math.round(pct * 100)}%
    </text>
  );

  // Mask to cut the inner donut (so it blends on any background)
  const maskId = React.useId();
  const innerR = r - thickness / 2; // inner radius to remove

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="block w-full h-auto"
        aria-label={`Gauge ${Math.round(pct * 100)} percent`}
      >
        <defs>
          <mask id={maskId}>
            {/* everything visible by default */}
            <rect x="0" y="0" width={vbW} height={vbH} fill="white" />
            {/* cut the inner hole (only in the top semicircle) */}
            <path
              d={`M ${polar(cx, cy, innerR, start).x} ${
                polar(cx, cy, innerR, start).y
              }
                  A ${innerR} ${innerR} 0 ${largeArcFull} 1 ${
                polar(cx, cy, innerR, end).x
              } ${polar(cx, cy, innerR, end).y}
                  L ${cx} ${cy} Z`}
              fill="black"
            />
          </mask>
        </defs>

        {/* Track */}
        <path
          d={dTrack}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />

        {/* Progress */}
        <path
          d={dArc}
          fill="none"
          stroke={arcColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />

        {/* Round end bubble (now guaranteed inside viewBox due to pad) */}
        {bubble && pct > 0 && (
          <circle
            cx={pEndArc.x}
            cy={pEndArc.y}
            r={thickness / 2}
            fill={arcColor}
          />
        )}

        {/* Center label */}
        {label ?? defaultLabel}
      </svg>
    </div>
  );
}
