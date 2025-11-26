import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import SectionTitle from "./SectionTitle";
import { Tooltip as AntdTooltip } from "antd";
import { CircleAlert } from "lucide-react";

type Period = "1m" | "6m" | "1y";

type ViewConfig = {
  key: string;
  label: string;
  tooltip: string;
  transform: (base: Array<{ name: string; value: number }>) => Array<{
    name: string;
    value: number;
  }>;
  title?: string;
};

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
    "!rounded-[0.5vw] border !border-[#D9E1E7] !px-[1vw] !py-[1vh] !font-semibold transition-colors !outline-none";
  const idle = "!bg-white text-[#17181A]";
  const active = "!bg-[#1F664B] !text-white border-transparent";
  return (
    <div className="inline-flex gap-[0.505vw] text-[0.808vw] ">
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
      className="inline-block h-[0.606vw] w-[0.606vw] rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border !border-[#E6ECF2] bg-white/95 !px-[0.606vw] !py-[0.741vh] text-[0.606vw] shadow-xs">
      <div className="font-semibold text-[#0F1A2A] mb-[0.370vh]">{label}</div>
      <div className="text-[#4A5568]">
        Revenue:{" "}
        <span className="font-medium text-[#0F1A2A]">
          {Math.round(payload[0].value)}k
        </span>
      </div>
    </div>
  );
};

export default function RevenueOverTimeCard({
  title = "Revenue over time",
}: {
  title?: string;
}) {
  const [period, setPeriod] = useState<Period>("6m");
  const data = period === "1m" ? data1m : period === "1y" ? data1y : data6m;

  // views config (single-series transforms)
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
      transform: (base) =>
        base.map((r) => {
          // slightly amplify values
          return { ...r, value: Math.round(r.value * 1.35 + 2) };
        }),
      title: "Top Priced Services",
    },
    {
      key: "view3",
      label: "View 3",
      tooltip: "Future Prediction",
      transform: (base) =>
        base.map((r, idx) => {
          // trend upward per index
          return { ...r, value: Math.round(r.value + idx * 2) };
        }),
      title: "Future Prediction",
    },
  ];

  // active view state + toggle (start with "view1")
  const [activeViewKey, setActiveViewKey] = useState<string | null>("view1");
  function handleToggleView(key: string) {
    setActiveViewKey((cur) => (cur === key ? null : key));
  }

  // apply active view transform to the currently selected period data
  const chartData = useMemo(() => {
    const active = views.find((v) => v.key === activeViewKey) ?? null;
    return active ? active.transform(data) : data;
  }, [data, activeViewKey, views]);

  // header shows active view title if selected
  const headerTitle =
    views.find((v) => v.key === activeViewKey)?.title ?? title;

  return (
    <div className="w-full rounded-[1vw] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] !px-[1.112vw] !pt-[1.296vh] !pb-[1.667vh] relative ">
      <div className="absolute right-[1.8vw] top-[2.037vh] flex flex-col gap-[0.648vh] ">
        {views.map((v) => {
          const isActive = activeViewKey === v.key;
          return (
            <AntdTooltip
              key={v.key}
              title={v.tooltip}
              placement="right"
              color="#1F664B"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#1F664B",
                borderRadius: "0.4vw",
                border: "1px solid #E4E7EC",
                fontSize: "0.758vw",
                fontWeight: 500,
                padding: "0.5vw 0.8vw",
                boxShadow:
                  "0 4px 10px rgba(31, 102, 75, 0.12), 0 2px 5px rgba(31, 102, 75, 0.06)",
              }}
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

      <div className="!mb-[3.611vh] flex justify-center">
        <SectionTitle
          title={headerTitle}
          className="min-h-[5.74vh]  "
          width="w-[12vw]"
        />
      </div>

      <div className="!mb-[3.611vh] ">
        <Segmented value={period} onChange={setPeriod} />
      </div>

      <div className="w-full h-[24.056vh] ">
        <ResponsiveContainer>
          <LineChart
            data={chartData}
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
              tick={{ fill: COLORS.tick, fontSize: "0.758vw", fontWeight: 600 }}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: COLORS.tick, fontSize: "0.758vw", fontWeight: 600 }}
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

      <div className="!mt-[2.778vh] gap-[0.404vw] grid grid-cols-3">
        <div className="inline-flex items-center font-semibold gap-[0.606vw] rounded-[0.404vw] !border !border-[#E6ECF2] bg-white/60 backdrop-blur !px-[0.606vw] !py-[0.741vh] text-[0.707vw] text-[#809FB8]">
          <Dot color={COLORS.legendDot} />
          <span>Revenue</span>
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
