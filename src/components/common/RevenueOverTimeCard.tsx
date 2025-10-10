import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import MiniHeader from "./MiniHeader";

type Period = "1m" | "6m" | "1y";

const COLORS = {
  stroke: "#12428D",
  grid: "#EDF2F7",
  tick: "#99B2C6",
  legendDot: "#1F664B",
  border: "#D9E1E7",
  activeSegBg: "#1F664B",
  activeSegText: "#FFFFFF",
};

const data6m = [
  { name: "Jul", value: 18 },
  { name: "Aug", value: 14 },
  { name: "Sep", value: 26 },
  { name: "Oct", value: 15 },
  { name: "Nov", value: 16 },
  { name: "Dec", value: 12 },
];

const data1m = [
  { name: "W1", value: 16 },
  { name: "W2", value: 14 },
  { name: "W3", value: 20 },
  { name: "W4", value: 13 },
];

const data1y = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 18 },
  { name: "Apr", value: 13 },
  { name: "May", value: 22 },
  { name: "Jun", value: 17 },
  { name: "Jul", value: 18 },
  { name: "Aug", value: 14 },
  { name: "Sep", value: 26 },
  { name: "Oct", value: 15 },
  { name: "Nov", value: 16 },
  { name: "Dec", value: 12 },
];

function Segmented({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  const base =
    "rounded-[10px] border !border-[#D9E1E7] !px-4 !py-2 text-sm font-medium transition-colors leading-6 !min-w-[80px] !outline-none";
  const idle = "!bg-white text-[#17181A]";
  const active = "!bg-[#1F664B] !text-white border-transparent";
  return (
    <div className="inline-flex gap-2">
      <button
        type="button"
        onClick={() => onChange("1m")}
        className={`${base} ${value === "1m" ? active : idle}`}
      >
        Month
      </button>
      <button
        type="button"
        onClick={() => onChange("6m")}
        className={`${base} ${value === "6m" ? active : idle}`}
      >
        6 months
      </button>
      <button
        type="button"
        onClick={() => onChange("1y")}
        className={`${base} ${value === "1y" ? active : idle}`}
      >
        1 yr
      </button>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-3 w-3 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border !border-[#E6ECF2] bg-white/95 !px-3 !py-2 text-[12px] shadow-sm">
      <div className="font-semibold text-[#0F1A2A] mb-1">{label}</div>
      <div className="text-[#4A5568]">
        Revenue:{" "}
        <span className="font-medium text-[#0F1A2A]">
          {Math.round(payload[0].value)}k
        </span>
      </div>
    </div>
  );
};

export default function RevenueOverTimeCard() {
  const [period, setPeriod] = React.useState<Period>("6m");
  const data = period === "1m" ? data1m : period === "1y" ? data1y : data6m;

  return (
    <div className="w-full max-w-[585px] rounded-[24px] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] !px-6 !pt-5 !pb-6">
      <MiniHeader>Revenue over time</MiniHeader>

      <div className="!mb-5 !mt-8">
        <Segmented value={period} onChange={setPeriod} />
      </div>

      <div className="h-[260px] w-full outline-none">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 0, right: 6, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke={COLORS.grid}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              axisLine={false}
              tick={{ fill: COLORS.tick, fontSize: 12, fontWeight: 700 }}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: COLORS.tick, fontSize: 12, fontWeight: 700 }}
            />
            <Tooltip
              cursor={{ stroke: COLORS.stroke, strokeOpacity: 0.1 }}
              content={<CustomTooltip />}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={COLORS.stroke}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="!mt-5">
        <div className="inline-flex items-center gap-2 rounded-[10px] !border !border-[#E6ECF2] bg-white/60 backdrop-blur !px-3 !py-2 text-[12px] text-[#6B7A90]">
          <Dot color={COLORS.legendDot} />
          <span>Revenue</span>
        </div>
      </div>
    </div>
  );
}
