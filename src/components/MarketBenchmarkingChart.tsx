import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { GreenDot } from "./Icons";
import SectionTitle from "./common/SectionTitle";
import { useEffect, useMemo, useState } from "react";
import { Tooltip as AntdTooltip } from "antd";
import { CircleAlert } from "lucide-react";

type ViewConfig = {
  key: string;
  label: string;
  tooltip: string;
  transform: (base: typeof DATA) => typeof DATA;
  title?: string;
};

const COLORS = {
  hospital: "#1F664B",
  benchmark: "#12428D",
};

const DATA = [
  { name: "Routine\nCheck\nup", hospital: 51, benchmark: 44 },
  { name: "Flu Test", hospital: 58, benchmark: 61 },
  { name: "Cancer\nCheck\nup", hospital: 53, benchmark: 56 },
  { name: "Asthma", hospital: 43, benchmark: 47 },
  { name: "Back Pain", hospital: 42, benchmark: 58 },
];

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-[1.396vh] w-[1.396vh] rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

const XTick = (props: any) => {
  const { x, y, payload } = props;
  const lines = String(payload.value).split(/\n/);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        fill="#8FA0B6"
        fontSize={"0.707vw"}
        fontWeight={600}
        textAnchor="middle"
        dy={18}
      >
        {lines.map((line: string, i: number) => (
          <tspan key={i} x={0} dy={i === 0 ? 0 : 14}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

type LegendLabels = {
  hospital?: string;
  benchmark?: string;
};

type Props = {
  title?: string;
  legendLabels?: LegendLabels;
  designWidth?: number;
  designHeight?: number;
};

export default function MarketBenchmarkingChart({
  title = "Market Benchmarking",
  legendLabels = {
    hospital: "My Hospital",
    benchmark: "Industry Benchmark",
  },
  designWidth = 2016,
  designHeight = 1142,
}: Props) {
  const labels = {
    hospital: legendLabels.hospital ?? "My Hospital",
    benchmark: legendLabels.benchmark ?? "Industry Benchmark",
  };

  const [scale, setScale] = useState<number>(1);

  // views config (kept inside component as requested)
  const views: ViewConfig[] = [
    {
      key: "view1",
      label: "View 1",
      tooltip: title,
      transform: (base) => base.map((r) => ({ ...r })), // identity
      title: title,
    },
    {
      key: "view2",
      label: "View 2",
      tooltip: "Top Priced Services",
      // amplify higher values to simulate top priced services (preserve shape)
      transform: (base) =>
        base.map((r) => {
          const res: any = { name: r.name };
          for (const k of Object.keys(r)) {
            if (k === "name") continue;
            // upscale values non-linearly so chart rescales
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
      // project forward: gradually increase values by month index
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

  useEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") {
        setScale(1);
        return;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.min(w / designWidth, h / designHeight);
      // clamp scale so things don't become unreadable on tiny screens
      setScale(Math.max(0.45, Math.min(s, 1.3)));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [designWidth, designHeight]);

  const s = (px: number, min = 2, max = 9999) =>
    Math.round(Math.max(min, Math.min(px * scale, max)));

  // ---------- NEW: view state + toggle handler ----------
  const [activeViewKey, setActiveViewKey] = useState<string | null>("view1");
  function handleToggleView(key: string) {
    setActiveViewKey((cur) => (cur === key ? null : key));
  }

  // ---------- NEW: compute chartData by applying active view transform ----------
  const chartData = useMemo(() => {
    const base = DATA;
    const activeView = views.find((v) => v.key === activeViewKey) ?? null;
    return activeView ? activeView.transform(base) : base;
  }, [activeViewKey, views]);

  // ---------- NEW: compute responsive Y domain & ticks from chartData ----------
  const { maxVal, ticks } = useMemo(() => {
    const keys = ["hospital", "benchmark"];
    let max = 0;
    for (const row of chartData) {
      for (const k of keys) {
        max = Math.max(max, (row as any)[k] ?? 0);
      }
    }
    // round up to nearest 10
    const ceiling = Math.max(10, Math.ceil(max / 10) * 10);
    const step = 10;
    const t: number[] = [];
    for (let v = 0; v <= ceiling; v += step) t.push(v);
    return { maxVal: ceiling, ticks: t };
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-[#E6ECF2] bg-white/90 !px-[0.606vw] !py-[0.404vw] text-[0.606vw] shadow-sm">
        {label ? (
          <div className="mb-[0.303vh] text-[#0F1A2A] font-semibold">
            {label}
          </div>
        ) : null}
        {payload.map((p: any) => (
          <div
            key={p.dataKey}
            className="flex items-center gap-[0.404vw] text-[#4A5568] mb-[0.303vh]"
          >
            <Dot color={p.fill ?? p.color ?? p.stroke ?? COLORS.hospital} />
            <span className="capitalize !min-w-[2.626vw]">
              {p.dataKey === "hospital" ? labels.hospital : labels.benchmark}
            </span>
            <span className="font-semibold text-[#0F1A2A]">
              {Math.round(p.value)}k
            </span>
          </div>
        ))}
      </div>
    );
  };

  // header title can show active view title if desired (kept original title variable unchanged)
  const headerTitle =
    views.find((v) => v.key === activeViewKey)?.title ?? title;

  return (
    <div className="max-w-full  rounded-[1.2vw] bg-white !p-[1.212vw] shadow-[0_6px_24px_rgba(16,24,40,0.04)] relative">
      <div className="absolute right-[1.8vw] top-[2.037vh] flex flex-col gap-[0.648vh] ">
        {views.map((v) => {
          const isActive = activeViewKey === v.key;
          return (
            <AntdTooltip
              key={v.key}
              title={v.tooltip}
              placement="right"
              color="#1F664B"
              className="helda-tooltip"
              // trigger="click"
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
            </AntdTooltip>
          );
        })}
      </div>

      <div className="!mb-[2.42vh] flex justify-center">
        <SectionTitle
          title={headerTitle}
          className="min-h-[5.74vh] "
          width="w-[12vw]"
        />
      </div>

      <div
        style={{
          // height: `${Math.round((35.704 / 100) * window.innerHeight)}px`,
          height: `${Math.round((35.704 / 100) * window.innerHeight)}px`,
          marginTop: `${Math.round((3.704 / 100) * window.innerHeight)}px`,
          width: "100%",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            barSize={s(28, 8)} // scaled bar width
            maxBarSize={s(32, 10)}
            data={chartData}
            barCategoryGap={s(10, 4)}
            barGap={s(6, 2)}
            margin={{ top: s(8, 4), right: s(12, 4), bottom: 0, left: s(4, 2) }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EDF2F7"
              strokeDasharray={`${s(3)} ${s(3)}`}
            />

            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              axisLine={false}
              height={82}
              tickMargin={10}
              tick={<XTick />}
            />

            <YAxis
              domain={[0, maxVal]}
              ticks={ticks}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: "#8FA0B6", fontSize: "0.707vw", fontWeight: 600 }}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="hospital"
              fill={COLORS.hospital}
              stroke="#35EB69"
              // strokeWidth={2}
              strokeWidth={Math.max(1, Math.round(3 * scale))}
              radius={[Math.round(8 * scale), Math.round(12 * scale), 0, 0]}
              isAnimationActive={true}
              animationDuration={1300}
              animationBegin={200}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="benchmark"
              fill={COLORS.benchmark}
              // radius={[8, 8, 0, 0]}
              radius={[Math.round(8 * scale), Math.round(8 * scale), 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={200}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-[0.404vw] !mb-0">
        <div className="flex items-center gap-[0.404vw] rounded-[0.404vw] !border !border-[#F1F4F9] bg-white !px-[0.606vw] !py-[0.404vw] !text-[0.758vw] font-semibold text-[#809FB8]">
          <span>
            <GreenDot className="!h-[1.496vh] !w-auto " />
          </span>
          <span>{labels.hospital}</span>
        </div>
        <div className="flex items-center gap-[0.404vw] rounded-[0.404vw] !border !border-[#F1F4F9] bg-white !px-[0.606vw] !py-[0.404vw] !text-[0.758vw] font-semibold text-[#809FB8]">
          <Dot color={COLORS.benchmark} />
          <span>{labels.benchmark}</span>
        </div>
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
