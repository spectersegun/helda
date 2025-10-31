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
import { useEffect, useState } from "react";

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
  // const labels = {
  //   hospital: legendLabels.hospital ?? "My Hospital",
  //   benchmark: legendLabels.benchmark ?? "Industry Benchmark",
  // };

  const [scale, setScale] = useState<number>(1);

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

  // helper to scale numeric px values with sensible clamp & rounding
  const s = (px: number, min = 2, max = 9999) =>
    Math.round(Math.max(min, Math.min(px * scale, max)));

  // label text sizes (px) — you could alternatively use vw-based CSS instead
  const tickFontSize = Math.round(Math.max(10, 12 * scale));
  const tickLineGap = Math.round(Math.max(12, 14 * scale)); // line spacing for multiline X ticks

  const labels = {
    hospital: legendLabels.hospital ?? "My Hospital",
    benchmark: legendLabels.benchmark ?? "Industry Benchmark",
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-[#E6ECF2] bg-white/90 !px-[0.606vw] !py-[0.404vw] text-[0.606vw] shadow-sm">
        {payload.map((p: any) => (
          <div
            key={p.dataKey}
            className="flex items-center gap-[0.404vw] text-[#4A5568]"
          >
            <Dot color={p.fill} />
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

  return (
    <div className="max-w-full  rounded-[1.2vw] bg-white !p-[1.212vw] shadow-[0_6px_24px_rgba(16,24,40,0.04)]">
      <div className="!mb-[2.42vh] flex justify-center">
        <SectionTitle
          title={title}
          className="min-h-[5.74vh] "
          width="w-[12vw]"
        />
      </div>

      {/* <div className="h-[35.704vh] !mt-[3.704vh] w-full"> */}
      <div
        style={{
          height: `${Math.round((35.704 / 100) * window.innerHeight)}px`,
          marginTop: `${Math.round((3.704 / 100) * window.innerHeight)}px`,
          width: "100%",
        }}
      >
        <ResponsiveContainer>
          {/* <BarChart
            barSize={28}
            maxBarSize={32}
            data={DATA}
            barCategoryGap={10}
            barGap={6}
            margin={{ top: 8, right: 12, bottom: 0, left: 4 }}
          > */}

          <BarChart
            barSize={s(28, 8)} // scaled bar width
            maxBarSize={s(32, 10)}
            data={DATA}
            barCategoryGap={s(10, 4)}
            barGap={s(6, 2)}
            margin={{ top: s(8, 4), right: s(12, 4), bottom: 0, left: s(4, 2) }}
          >
            {/* <CartesianGrid
              vertical={false}
              stroke="#EDF2F7"
              strokeDasharray="3 3"
            /> */}

            <CartesianGrid
              vertical={false}
              stroke="#EDF2F7"
              strokeDasharray={`${s(3)} ${s(3)}`}
            />

            {/* <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              axisLine={false}
              height={82}
              tickMargin={10}
              tick={<XTick />}
            /> */}

            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              axisLine={false}
              height={s(82, 40)}
              tickMargin={s(10, 4)}
              tick={<XTick tickFontSize={tickFontSize} lineGap={tickLineGap} />}
            />

            {/* <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: "#8FA0B6", fontSize: "0.707vw", fontWeight: 600 }}
            /> */}

            <YAxis
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
              tickLine={false}
              axisLine={false}
              width={s(36, 28)}
              tick={{
                fill: "#8FA0B6",
                fontSize: tickFontSize,
                fontWeight: 600,
              }}
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
            />
            <Bar
              dataKey="benchmark"
              fill={COLORS.benchmark}
              // radius={[8, 8, 0, 0]}
              radius={[Math.round(8 * scale), Math.round(8 * scale), 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* </div> */}

      <div className="flex flex-wrap gap-[0.404vw] !mb-0">
        <div className="flex items-center gap-[0.404vw] rounded-[0.404vw] !border !border-[#F1F4F9] bg-white !px-[0.606vw] !py-[0.404vw] !text-[0.758vw] font-medium text-[#809FB8]">
          <span>
            <GreenDot className="!h-[1.496vh] !w-auto " />
          </span>
          <span>{labels.hospital}</span>
        </div>
        <div className="flex items-center gap-[0.404vw] rounded-[0.404vw] !border !border-[#F1F4F9] bg-white !px-[0.606vw] !py-[0.404vw] !text-[0.758vw] font-medium text-[#809FB8]">
          <Dot color={COLORS.benchmark} />
          <span>{labels.benchmark}</span>
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// import { GreenDot } from "./Icons";
// import SectionTitle from "./common/SectionTitle";

// const COLORS = {
//   hospital: "#1F664B",
//   benchmark: "#12428D",
// };

// const DATA = [
//   { name: "Routine\nCheck\nup", hospital: 51, benchmark: 44 },
//   { name: "Flu Test", hospital: 58, benchmark: 61 },
//   { name: "Cancer\nCheck\nup", hospital: 53, benchmark: 56 },
//   { name: "Asthma", hospital: 43, benchmark: 47 },
//   { name: "Back Pain", hospital: 42, benchmark: 58 },
// ];

// function Dot({ color }: { color: string }) {
//   return (
//     <span
//       className="inline-block"
//       style={{
//         backgroundColor: color,
//         height: `${Math.round(
//           1.396 * (typeof window !== "undefined" ? window.innerHeight / 100 : 8)
//         )}px`, // fallback visual
//         width: `${Math.round(
//           1.396 * (typeof window !== "undefined" ? window.innerHeight / 100 : 8)
//         )}px`,
//         borderRadius: 999,
//         display: "inline-block",
//       }}
//     />
//   );
// }

// const XTick = (props: any) => {
//   const { x, y, payload, tickFontSize, lineGap } = props;
//   const lines = String(payload.value).split(/\n/);
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         fill="#8FA0B6"
//         fontSize={tickFontSize}
//         fontWeight={600}
//         textAnchor="middle"
//         dy={lineGap}
//       >
//         {lines.map((line: string, i: number) => (
//           <tspan key={i} x={0} dy={i === 0 ? 0 : lineGap}>
//             {line}
//           </tspan>
//         ))}
//       </text>
//     </g>
//   );
// };

// type LegendLabels = {
//   hospital?: string;
//   benchmark?: string;
// };

// type Props = {
//   title?: string;
//   legendLabels?: LegendLabels;
//   designWidth?: number;
//   designHeight?: number;
// };

// export default function MarketBenchmarkingChart({
//   title = "Market Benchmarking",
//   legendLabels = {
//     hospital: "My Hospital",
//     benchmark: "Industry Benchmark",
//   },
//   designWidth = 2016,
//   designHeight = 1142,
// }: Props) {
//   const [scale, setScale] = useState<number>(1);

//   useEffect(() => {
//     const compute = () => {
//       if (typeof window === "undefined") {
//         setScale(1);
//         return;
//       }
//       const w = window.innerWidth;
//       const h = window.innerHeight;
//       const s = Math.min(w / designWidth, h / designHeight);
//       setScale(Math.max(0.45, Math.min(s, 1.3)));
//     };
//     compute();
//     window.addEventListener("resize", compute);
//     return () => window.removeEventListener("resize", compute);
//   }, [designWidth, designHeight]);

//   // helper to scale numeric px values with sensible clamp & rounding
//   const s = (px: number, min = 2, max = 9999) =>
//     Math.round(Math.max(min, Math.min(px * scale, max)));

//   // label text sizes (px)
//   const tickFontSize = Math.round(Math.max(10, 12 * scale));
//   const tickLineGap = Math.round(Math.max(12, 14 * scale)); // used for multi-line X ticks

//   const labels = {
//     hospital: legendLabels.hospital ?? "My Hospital",
//     benchmark: legendLabels.benchmark ?? "Industry Benchmark",
//   };

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (!active || !payload?.length) return null;
//     return (
//       <div
//         style={{
//           padding: `${Math.round(6 * scale)}px ${Math.round(8 * scale)}px`,
//           borderRadius: Math.round(6 * scale),
//           border: "1px solid #E6ECF2",
//           background: "rgba(255,255,255,0.95)",
//           boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
//           fontSize: Math.max(11, Math.round(12 * scale)),
//         }}
//       >
//         {payload.map((p: any) => (
//           <div
//             key={p.dataKey}
//             style={{
//               display: "flex",
//               gap: Math.round(8 * scale),
//               alignItems: "center",
//               color: "#4A5568",
//             }}
//           >
//             <div
//               style={{
//                 width: Math.round(10 * scale),
//                 height: Math.round(10 * scale),
//                 borderRadius: 999,
//                 background: p.fill,
//               }}
//             />
//             <div
//               style={{
//                 minWidth: Math.round(60 * scale),
//                 textTransform: "capitalize",
//               }}
//             >
//               {p.dataKey === "hospital" ? labels.hospital : labels.benchmark}
//             </div>
//             <div style={{ fontWeight: 600, color: "#0F1A2A" }}>
//               {Math.round(p.value)}k
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div
//       className="max-w-full rounded-[1.2vw] bg-white !p-[1.212vw]"
//       style={{
//         boxShadow: "0 6px 24px rgba(16,24,40,0.04)",
//         width: "100%",
//       }}
//     >
//       <div className="!mb-[2.42vh] flex justify-center">
//         <SectionTitle
//           title={title}
//           className="min-h-[5.74vh]"
//           width="w-[12vw]"
//         />
//       </div>

//       <div
//         style={{
//           height: `${Math.round(
//             (35.704 / 100) *
//               (typeof window !== "undefined"
//                 ? window.innerHeight
//                 : designHeight)
//           )}px`,
//           marginTop: `${Math.round(
//             (3.704 / 100) *
//               (typeof window !== "undefined"
//                 ? window.innerHeight
//                 : designHeight)
//           )}px`,
//           width: "100%",
//         }}
//       >
//         <ResponsiveContainer>
//           <BarChart
//             barSize={s(28, 8)}
//             maxBarSize={s(32, 10)}
//             data={DATA}
//             barCategoryGap={s(10, 4)}
//             barGap={s(6, 2)}
//             margin={{ top: s(8, 4), right: s(12, 4), bottom: 0, left: s(4, 2) }}
//           >
//             <CartesianGrid
//               vertical={false}
//               stroke="#EDF2F7"
//               strokeDasharray={`${s(3)} ${s(3)}`}
//             />

//             <XAxis
//               dataKey="name"
//               interval={0}
//               tickLine={false}
//               axisLine={false}
//               height={s(82, 40)}
//               tickMargin={s(10, 4)}
//               tick={<XTick tickFontSize={tickFontSize} lineGap={tickLineGap} />}
//             />

//             <YAxis
//               domain={[0, 60]}
//               ticks={[0, 10, 20, 30, 40, 50, 60]}
//               tickFormatter={(v) => (v === 0 ? "0" : `${v}k`)}
//               tickLine={false}
//               axisLine={false}
//               width={s(36, 28)}
//               tick={{
//                 fill: "#8FA0B6",
//                 fontSize: tickFontSize,
//                 fontWeight: 600,
//               }}
//             />

//             <Tooltip
//               cursor={{ fill: "transparent" }}
//               content={<CustomTooltip />}
//             />

//             <Bar
//               dataKey="hospital"
//               fill={COLORS.hospital}
//               stroke="#35EB69"
//               strokeWidth={Math.max(1, Math.round(3 * scale))}
//               radius={[Math.round(8 * scale), Math.round(12 * scale), 0, 0]}
//             />
//             <Bar
//               dataKey="benchmark"
//               fill={COLORS.benchmark}
//               radius={[Math.round(8 * scale), Math.round(8 * scale), 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="flex flex-wrap gap-[0.404vw] !mb-0">
//         <div className="flex items-center gap-[0.404vw] rounded-[0.404vw] !border !border-[#F1F4F9] bg-white !px-[0.606vw] !py-[0.404vw] !text-[0.758vw] font-medium text-[#809FB8]">
//           <span>
//             <GreenDot className="!h-[1.496vh] !w-auto" />
//           </span>
//           <span>{labels.hospital}</span>
//         </div>
//         <div className="flex items-center gap-[0.404vw] rounded-[0.404vw] !border !border-[#F1F4F9] bg-white !px-[0.606vw] !py-[0.404vw] !text-[0.758vw] font-medium text-[#809FB8]">
//           <Dot color={COLORS.benchmark} />
//           <span>{labels.benchmark}</span>
//         </div>
//       </div>
//     </div>
//   );
// }
