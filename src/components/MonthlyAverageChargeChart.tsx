import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import SectionTitle from "./common/SectionTitle";

export type Period = "6m" | "30d";

const COLORS = {
  routine: "#C686F8",
  flu: "#12428D",
  cancer: "#8571F4",
  asthma: "#CBDF90",
  back: "#1F664B",
};

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const data6m = [
  // numbers chosen to visually match the screenshot trends
  { name: "Jul", routine: 18, flu: 22, cancer: 16, asthma: 25, back: 26 },
  { name: "Aug", routine: 12, flu: 28, cancer: 18, asthma: 14, back: 22 },
  { name: "Sep", routine: 24, flu: 20, cancer: 26, asthma: 10, back: 18 },
  { name: "Oct", routine: 17, flu: 21, cancer: 20, asthma: 35, back: 32 },
  { name: "Nov", routine: 13, flu: 19, cancer: 28, asthma: 30, back: 29 },
  { name: "Dec", routine: 9, flu: 14, cancer: 24, asthma: 48, back: 40 },
].map((d) => ({
  ...d,
}));

const data30d = months.map((m, i) => ({
  name: m,
  routine: [16, 13, 20, 15, 14, 10][i],
  flu: [18, 24, 19, 20, 15, 12][i],
  cancer: [14, 17, 22, 19, 24, 21][i],
  asthma: [22, 12, 14, 28, 26, 34][i],
  back: [24, 20, 16, 28, 26, 30][i],
}));

function Segmented({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  return (
    <div className="inline-flex  !bg-white  overflow-hidden text-[14px] font-medium">
      <button
        onClick={() => onChange("6m")}
        className={`!px-[1vw] !py-[1.250vh] hover:!bg-[#F8FAFD] !text-[0.808vw] !font-semibold !border-r-0 !rounded-tr-[0px] !rounded-br-[0px] transition-colors !outline-none !bg-white !border  !border-[#D9E1E7]  ${
          value === "6m" ? "text-[#17181A]" : "!text-[#809FB8] "
        }`}
      >
        6 months
      </button>
      <button
        onClick={() => onChange("30d")}
        className={`!px-[1vw] !py-[1.250vh] hover:!bg-[#F8FAFD] !text-[0.808vw] !font-semibold border-l !bg-white !border  !border-[#D9E1E7] !rounded-none  transition-colors !outline-none ${
          value === "30d" ? "!bg-white text-[#17181A]" : "!text-[#809FB8] "
        }`}
      >
        30 days
      </button>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-[0.606vw] w-[0.606vw] rounded-full mr-[0.404vw]"
      style={{ backgroundColor: color }}
    />
  );
}

function LegendPill({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-x-[0.606vw] rounded-[0.404vw] !border !border-[#E6ECF2] bg-white !pl-[0.404vw] !py-[0.741vh] !pr-0.5 text-[0.707vw] !text-[#809FB8] backdrop-blur font-semibold ">
      <Dot color={color} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function KFormatter(v: number) {
  return `${Math.round(v)}k`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#E6ECF2] bg-white/90 !px-[0.606vw] !py-[0.741vh] text-[0.706vw] shadow-xs">
      <div className="mb-[0.370vh] text-[#0F1A2A] font-semibold">{label}</div>
      {payload.map((p: any) => (
        <div
          key={p.dataKey}
          className="flex items-center gap-[0.404vw] text-[#4A5568]"
        >
          <Dot color={p.stroke} />
          <span className="min-w-[6.061vw] capitalize">
            {labelForKey(p.dataKey)}
          </span>
          <span className="font-medium text-[#0F1A2A]">
            {KFormatter(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

function labelForKey(k: string) {
  switch (k) {
    case "routine":
      return "Routine Check";
    case "flu":
      return "Flu Test";
    case "cancer":
      return "Cancer check..";
    case "asthma":
      return "Asthma";
    case "back":
      return "Back Pain";
    default:
      return k;
  }
}

export default function MonthlyAverageChargeChart() {
  const [period, setPeriod] = useState<Period>("6m");
  const data = period === "6m" ? data6m : data30d;

  return (
    <div className="w-full rounded-[1.3vw] bg-white !px-[1.212vw] !pt-[1.296vh] !pb-[1.667vh] shadow-[0_6px_24px_rgba(16,24,40,0.04)]">
      <div className="!mb-[2.778vh] flex justify-center">
        <SectionTitle
          title="Monthly Average Charge"
          className="min-h-[5.74vh]  "
          width="w-[12vw]"
        />
      </div>

      {/* Segmented control */}
      <div className="!mb-[2.778vh]">
        <Segmented value={period} onChange={setPeriod} />
      </div>

      {/* Chart */}
      <div className="w-full h-[26.056vh] ">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EDF2F7"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8FA0B6", fontSize: "0.758vw", fontWeight: 600 }}
              interval={0}
            />

            <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8FA0B6", fontSize: "0.758vw", fontWeight: 600 }}
              width={36}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="routine"
              stroke={COLORS.routine}
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="flu"
              stroke={COLORS.flu}
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cancer"
              stroke={COLORS.cancer}
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="asthma"
              stroke={COLORS.asthma}
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="back"
              stroke={COLORS.back}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="gap-[0.404vw] grid grid-cols-3 ">
        <LegendPill color={COLORS.routine} label="Routine Check" />
        <LegendPill color={COLORS.flu} label="Flu Test" />
        <LegendPill color={COLORS.cancer} label="Cancer check.." />
        <LegendPill color={COLORS.asthma} label="Asthma" />
        <LegendPill color={COLORS.back} label="Back Pain" />
      </div>
    </div>
  );
}
