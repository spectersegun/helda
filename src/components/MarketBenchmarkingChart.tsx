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
// import MiniHeader from "./common/MiniHeader";
import SectionTitle from "./common/SectionTitle";

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
      className="inline-block h-3 w-3 rounded-full"
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
        fontSize={12}
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
  legendLabels?: LegendLabels; // <-- new
};

export default function MarketBenchmarkingChart({
  title = "Market Benchmarking",
  legendLabels = {
    hospital: "My Hospital",
    benchmark: "Industry Benchmark",
  },
}: Props) {
  const labels = {
    hospital: legendLabels.hospital ?? "My Hospital",
    benchmark: legendLabels.benchmark ?? "Industry Benchmark",
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-[#E6ECF2] bg-white/90 !px-3 !py-2 text-[12px] shadow-sm">
        {payload.map((p: any) => (
          <div
            key={p.dataKey}
            className="flex items-center gap-2 text-[#4A5568]"
          >
            <Dot color={p.fill} />
            <span className="capitalize !min-w-[52px]">
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

  return (
    <div className="w-full max-w-[491px] rounded-[24px] bg-white !p-6 shadow-[0_6px_24px_rgba(16,24,40,0.04)]">
      {/* <MiniHeader className="max-w-[200px]">{title}</MiniHeader> */}

      <div className="!mb-[2.42vh] flex justify-center">
        <SectionTitle
          title={title}
          className="min-h-[5.74vh]  "
          width="w-[12vw]"
        />
      </div>

      <div className="h-[310px] !mt-10 w-full">
        <ResponsiveContainer>
          <BarChart
            barSize={18}
            maxBarSize={32}
            data={DATA}
            barCategoryGap={10}
            barGap={6}
            margin={{ top: 8, right: 12, bottom: 0, left: 4 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EDF2F7"
              strokeDasharray="3 3"
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
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: "#8FA0B6", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="hospital"
              fill={COLORS.hospital}
              stroke="#35EB69"
              strokeWidth={2}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="benchmark"
              fill={COLORS.benchmark}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 !mb-0">
        <div className="flex items-center gap-2 rounded-[8px] !border !border-[#F1F4F9] bg-white !px-3 !py-2 !text-xs font-medium text-[#809FB8]">
          <span>
            <GreenDot />
          </span>
          <span>{labels.hospital}</span>
        </div>
        <div className="flex items-center gap-2 rounded-[8px] !border !border-[#F1F4F9] bg-white !px-3 !py-2 !text-xs font-medium text-[#809FB8]">
          <Dot color={COLORS.benchmark} />
          <span>{labels.benchmark}</span>
        </div>
      </div>
    </div>
  );
}
