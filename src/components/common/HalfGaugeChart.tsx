import React from "react";

type Props = {
  value?: number;
  thickness?: number;
  trackColor?: string;
  arcColor?: string;
  bubble?: boolean;
  label?: React.ReactNode;
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

  const W = 1000;
  const H = 500;
  const pad = thickness / 2 + 12;
  const vbW = W;
  const vbH = H + pad;

  const cx = vbW / 2;
  const cy = vbH;
  const r = Math.min(vbW, vbH * 2) / 2 - thickness / 2 - 6;

  const start = -180;
  const end = 0;
  const angle = start + (end - start) * pct;

  const pStart = polar(cx, cy, r, start);
  const pEndTrack = polar(cx, cy, r, end);
  const pEndArc = polar(cx, cy, r, angle);

  const largeArcFull = 1;
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

  const maskId = React.useId();
  const innerR = r - thickness / 2;

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="block w-full h-auto"
        aria-label={`Gauge ${Math.round(pct * 100)} percent`}
      >
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width={vbW} height={vbH} fill="white" />
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

        <path
          d={dTrack}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />

        <path
          d={dArc}
          fill="none"
          stroke={arcColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />

        {bubble && pct > 0 && (
          <circle
            cx={pEndArc.x}
            cy={pEndArc.y}
            r={thickness / 2}
            fill={arcColor}
          />
        )}

        {label ?? defaultLabel}
      </svg>
    </div>
  );
}
