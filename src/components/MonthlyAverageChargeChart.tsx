import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartTooltip,
} from "recharts";
import SectionTitle from "./common/SectionTitle";
import { CircleAlert } from "lucide-react";
import { Tooltip as Tooltips } from "antd";

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
  { name: "Jul", routine: 18, flu: 22, cancer: 16, asthma: 25, back: 26 },
  { name: "Aug", routine: 12, flu: 28, cancer: 18, asthma: 14, back: 22 },
  { name: "Sep", routine: 24, flu: 20, cancer: 26, asthma: 10, back: 18 },
  { name: "Oct", routine: 17, flu: 21, cancer: 20, asthma: 35, back: 32 },
  { name: "Nov", routine: 13, flu: 19, cancer: 28, asthma: 30, back: 29 },
  { name: "Dec", routine: 9, flu: 14, cancer: 24, asthma: 48, back: 40 },
].map((d) => ({ ...d }));

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

type ViewConfig = {
  key: string;
  label: string;
  tooltip: string;
  transform: (base: typeof data6m) => typeof data6m;
  title?: string;
};

const views: ViewConfig[] = [
  {
    key: "view1",
    label: "View 1",
    tooltip: "Monthly Average Charge",
    transform: (base) => base.map((r) => ({ ...r })), // identity
    title: "Monthly Average Charge",
  },
  {
    key: "view2",
    label: "View 2",
    tooltip: "Top Priced Services",
    transform: (base) =>
      base.map((r) => {
        const res: any = { name: r.name };
        for (const k of Object.keys(r)) {
          if (k === "name") continue;
          res[k] = Math.round((r as any)[k] * 1.4 + (k === "back" ? 3 : 0));
        }
        return res;
      }),
    title: "Top Priced Services",
  },
  {
    key: "view3",
    label: "View 3",
    tooltip: "Future Prediction",
    transform: (base) =>
      base.map((r, idx) => {
        const res: any = { name: r.name };
        for (const k of Object.keys(r)) {
          if (k === "name") continue;
          // add a small upward trend per month
          res[k] = Math.round(
            (r as any)[k] + idx * 2 + (k === "asthma" ? 4 : 0)
          );
        }
        return res;
      }),
    title: "Future Prediction",
  },
];

export default function MonthlyAverageChargeChart() {
  const [period, setPeriod] = useState<Period>("6m");
  const [activeViewKey, setActiveViewKey] = useState<string | null>("view1");

  const base = period === "6m" ? data6m : data30d;

  const activeView = useMemo(
    () => views.find((v) => v.key === activeViewKey) ?? null,
    [activeViewKey]
  );

  const chartData = useMemo(() => {
    if (activeView) return activeView.transform(base);
    return base;
  }, [base, activeView]);

  // --- NEW: keys list and compute topKey when view2 is active ---
  const keys = ["routine", "flu", "cancer", "asthma", "back"];

  // compute which key has the highest average across the chartData
  const topKey = useMemo(() => {
    if (activeViewKey !== "view2") return null;
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    for (const k of keys) {
      sums[k] = 0;
      counts[k] = 0;
    }
    for (const row of chartData) {
      for (const k of keys) {
        const val = (row as any)[k];
        if (typeof val === "number") {
          sums[k] += val;
          counts[k] += 1;
        }
      }
    }
    let best: string | null = null;
    let bestAvg = -Infinity;
    for (const k of keys) {
      const avg = counts[k] ? sums[k] / counts[k] : -Infinity;
      if (avg > bestAvg) {
        bestAvg = avg;
        best = k;
      }
    }
    return best;
  }, [chartData, activeViewKey]);

  const { maxVal, ticks } = useMemo(() => {
    const keysLocal = keys;
    let max = 0;
    for (const row of chartData) {
      for (const k of keysLocal) {
        max = Math.max(max, (row as any)[k] ?? 0);
      }
    }
    const ceiling = Math.max(10, Math.ceil(max / 10) * 10);
    const step = 10;
    const t: number[] = [];
    for (let v = 0; v <= ceiling; v += step) t.push(v);
    return { maxVal: ceiling, ticks: t };
  }, [chartData]);

  const headerTitle = activeView?.title ?? "Monthly Average Charge";

  function handleToggleView(key: string) {
    setActiveViewKey((cur) => (cur === key ? null : key));
  }

  return (
    <div className="w-full rounded-[1.3vw] bg-white !px-[1.212vw] !pt-[1.296vh] !pb-[1.667vh] shadow-[0_6px_24px_rgba(16,24,40,0.04)] relative">
      <div className="absolute right-[1.8vw] top-[2.037vh] flex flex-col gap-[0.648vh] ">
        {views.map((v) => {
          const isActive = activeViewKey === v.key;
          return (
            <Tooltips
              key={v.key}
              title={v.tooltip}
              placement="right"
              color="#1F664B"
              className="helda-tooltip"
            >
              <button
                onClick={() => handleToggleView(v.key)}
                className={`!outline-none h-[2.407vh] w-[4.949vw] flex items-center justify-end gap-[0.20vw] !px-[0.303vw] !py-[0.370vh] rounded-[0.505vw] !border !text-[0.808vw] !font-medium transition-all duration-350 ${
                  isActive
                    ? "!bg-[#1F664B] !text-white !border-[#1F664B]"
                    : "!bg-inherit !text-black !border-[#BAB6B6]"
                }`}
              >
                {v.label}{" "}
                <CircleAlert
                  color={isActive ? "#FFFFFF" : "#1F664B"}
                  className="rotate-180 w-[1.481vh] h-[1.481vh] "
                />
              </button>
            </Tooltips>
          );
        })}
      </div>

      <div className="!mb-[2.778vh] flex justify-center">
        <SectionTitle
          title={headerTitle}
          className="min-h-[5.74vh] "
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
            data={chartData}
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
              domain={[0, maxVal]}
              ticks={ticks}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8FA0B6", fontSize: "0.758vw", fontWeight: 600 }}
              width={36}
            />

            <RechartTooltip content={<CustomTooltip />} />

            {/* --- RENDER LINES CONDITIONALLY: if view2 (Top Priced Services) is active, render only topKey --- */}
            {activeViewKey === "view2" && topKey ? (
              <Line
                type="monotone"
                dataKey={topKey}
                stroke={(COLORS as any)[topKey]}
                strokeWidth={3}
                dot={false}
              />
            ) : (
              <>
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
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend: show only the visible lines */}
      <div className="gap-[0.404vw] grid grid-cols-3 ">
        {activeViewKey === "view2" && topKey ? (
          <LegendPill
            color={(COLORS as any)[topKey]}
            label={labelForKey(topKey)}
          />
        ) : (
          <>
            <LegendPill color={COLORS.routine} label="Routine Check" />
            <LegendPill color={COLORS.flu} label="Flu Test" />
            <LegendPill color={COLORS.cancer} label="Cancer check.." />
            <LegendPill color={COLORS.asthma} label="Asthma" />
            <LegendPill color={COLORS.back} label="Back Pain" />
          </>
        )}
      </div>
      <style jsx global>{`
        .ant-tooltip .ant-tooltip-arrow {
        }
        @media (max-width: 1440px) {
          .ant-tooltip .ant-tooltip-arrow {
            left: 0.08vw !important;
            width: 14px;
            top: 10.0554px !important;
          }
        }
        .ant-tooltip .ant-tooltip-content .ant-tooltip-inner {
          font-size: 0.606vw;
          line-height: 0.706vw;
          min-height: 0.706vw;
          padding: 0.306vw 0.606vw !important;
        }

        @keyframes fadeInScale {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
