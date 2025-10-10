import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import MiniHeader from "./MiniHeader";

type Point = { name: string; actual: number; gap?: number; top?: number };
type Props = {
  title?: string;
  target?: number;
  data?: Point[];
  cardBg?: string;
};

const DEFAULT_DATA: Point[] = [
  { name: "Jul", actual: 12, gap: 30, top: 20 },
  { name: "Aug", actual: 15, gap: 25, top: 21 },
  { name: "Sep", actual: 19, gap: 20, top: 21 },
  { name: "Oct", actual: 20, gap: 18, top: 19 },
  { name: "Nov", actual: 20, gap: 24, top: 16 },
  { name: "Dec", actual: 18, gap: 22, top: 14 },
];

const COLORS = {
  actual: "rgba(133, 113, 244, 0.80)",
  gap: "rgba(133, 113, 244, 0.40)",
  grid: "#EDF2F7",
  tick: "#99B2C6",
};

const GAP_HEIGHT = 0.2;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const actual = payload.find((p: any) => p.dataKey === "actual")?.value ?? 0;
  const gapTop = payload.find((p: any) => p.dataKey === "gapTop")?.value ?? 0;
  const spacer = payload.find((p: any) => p.dataKey === "spacer")?.value ?? 0;
  const gap = gapTop + spacer;
  const total = actual + gap;
  return (
    <div className="rounded-md border border-[#E6ECF2] bg-white/95 !px-3 !py-2 text-[12px] shadow-sm">
      <div className="font-semibold text-[#0F1A2A] mb-1">{label}</div>
      <div className="text-[#4A5568]">
        Actual: <span className="font-medium text-[#0F1A2A]">{actual}k</span>
      </div>
      <div className="text-[#4A5568]">
        Gap: <span className="font-medium text-[#0F1A2A]">{gap}k</span>
      </div>
      <div className="text-[#4A5568]">
        Total: <span className="font-medium text-[#0F1A2A]">{total}k</span>
      </div>
    </div>
  );
};

export default function DepartmentGapsVsTarget({
  title = "Department Gaps vs Target",
  target = 40,
  data = DEFAULT_DATA,
  cardBg = "#FFFFFF",
}: Props) {
  // Prepare stacked data: actual + spacer + gapTop = target
  const filled = data.map((d) => {
    const baseGap =
      typeof d.gap === "number" ? d.gap : Math.max(target - d.actual, 0);
    const spacer = baseGap > 0 ? Math.min(baseGap, GAP_HEIGHT) : 0;
    // const gapTop = Math.max(baseGap - spacer, 0);
    const gapTop = d.top;
    return {
      name: d.name,
      actual: d.actual,
      spacer,
      gapTop,
    };
  });

  return (
    <div
      className="w-full max-w-[832px] rounded-[24px] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] !px-8 !py-2 !pb-0"
      style={{ backgroundColor: cardBg }}
    >
      <MiniHeader className="max-w-[320px]">{title}</MiniHeader>

      <div className="h-[190px] w-full">
        <ResponsiveContainer>
          <BarChart
            data={filled}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            barCategoryGap={22}
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
              domain={[0, target]}
              ticks={[0, 10, 20, 30, 40]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fill: COLORS.tick, fontSize: 12, fontWeight: 700 }}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="actual"
              stackId="s"
              fill={COLORS.actual}
              radius={[4, 4, 4, 4]}
              barSize={40}
              maxBarSize={40}
            />

            <Bar
              dataKey="spacer"
              stackId="s"
              fill={cardBg}
              stroke={cardBg}
              radius={[0, 0, 0, 0]}
              barSize={40}
              maxBarSize={40}
            />

            {/* Top: Gap */}
            <Bar
              dataKey="gapTop"
              stackId="s"
              fill={COLORS.gap}
              radius={[4, 4, 4, 4]}
              barSize={40}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
