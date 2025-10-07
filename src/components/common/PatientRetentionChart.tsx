"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import MiniHeader from "./MiniHeader";

/**
 * PatientRetentionChart
 * Smooth area/line chart, 0–100% scale, matching the uploaded mock.
 * Tailwind + Recharts, pixel-focused (rounded card, centered title, soft grid).
 */

const COLOR = {
  // stroke: "#6F69FF", // violet stroke
  stroke: "#8571F4",
  // fillTop: "rgba(111,105,255,0.28)", // gradient top
  fillTop: "rgba(133,113,244,0.28)",
  // fillBottom: "rgba(111,105,255,0.04)", // gradient bottom
  // fillBottom: "rgba(133,113,244,0.04)",
  fillBottom: "rgba(133,113,244,0.06)",
};

const DATA = [
  { name: "Jul", value: 6 },
  { name: " ", value: 30 }, // a helper point to create the early bump
  { name: "Aug", value: 20 },
  { name: " ", value: 64 },
  { name: "Sep", value: 72 },
  { name: " ", value: 38 },
  { name: "Oct", value: 46 },
  { name: " ", value: 28 },
  { name: "Nov", value: 60 },
  { name: " ", value: 4 },
  { name: " ", value: 84 }, // end spike
];

const ticks = [0, 20, 40, 60, 80, 100];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#E6ECF2] bg-white/95 !px-2.5 !py-1.5 text-[12px] shadow-sm text-[#0F1A2A]">
      {payload[0].value}%
    </div>
  );
};

export default function PatientRetentionChart({
  title = " Patient Retention Over time",
}: {
  title?: string;
}) {
  return (
    <div className="w-full max-w-[702px] rounded-[24px] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] !px-3 !pt-2 !pb-2">
      {/* Title */}

      <MiniHeader className="max-w-[260px]">{title}</MiniHeader>

      <div className="h-[180px] w-full">
        <ResponsiveContainer>
          <AreaChart
            data={DATA}
            margin={{ top: 10, right: 12, bottom: 0, left: 0 }}
          >
            {/* <defs>
              <linearGradient id="retentionFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLOR.fillTop} />
                <stop offset="100%" stopColor={COLOR.fillBottom} />
              </linearGradient>
            </defs> */}

            <defs>
              {/* Match the provided SVG gradient */}
              <linearGradient
                id="retentionFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#8571F4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8571F4" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#EDF2F7"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: "#809FB8", fontSize: 12, fontWeight: 600 }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={ticks}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "#809FB8", fontSize: 12, fontWeight: 600 }}
            />

            <Tooltip
              cursor={{ stroke: COLOR.stroke, strokeOpacity: 0.15 }}
              content={<CustomTooltip />}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={COLOR.stroke}
              strokeWidth={2}
              fill="url(#retentionFill)"
              isAnimationActive={false}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
