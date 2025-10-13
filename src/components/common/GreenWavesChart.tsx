import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  // Tooltip,
  YAxis,
  XAxis,
} from "recharts";

type XY = { x: number; y: number };

type Props = {
  height?: number;
  showTooltip?: boolean;
  dataBack?: XY[];
  dataMid?: XY[];
  dataFront?: XY[];
};

const D_BACK: XY[] = [
  { x: 0, y: 6 },
  { x: 1, y: 26 },
  { x: 2, y: 16 },
  { x: 3, y: 14 },
  { x: 4, y: 18 },
  { x: 5, y: 12 },
  { x: 6, y: 28 },
  { x: 7, y: 18 },
  { x: 8, y: 8 },
  { x: 9, y: 10 },
  { x: 10, y: 34 },
];

const D_MID: XY[] = [
  { x: 0, y: 8 },
  { x: 1, y: 18 },
  { x: 2, y: 22 },
  { x: 3, y: 16 },
  { x: 4, y: 15 },
  { x: 5, y: 11 },
  { x: 6, y: 20 },
  { x: 7, y: 24 },
  { x: 8, y: 22 },
  { x: 9, y: 12 },
  { x: 10, y: 16 },
];

const D_FRONT: XY[] = [
  { x: 0, y: 10 },
  { x: 1, y: 12 },
  { x: 2, y: 14 },
  { x: 3, y: 13 },
  { x: 4, y: 12 },
  { x: 5, y: 11 },
  { x: 6, y: 12 },
  { x: 7, y: 18 },
  { x: 8, y: 16 },
  { x: 9, y: 14 },
  { x: 10, y: 15 },
];

// const WaveTooltip = ({ active, payload, label }: any) =>
//   !active || !payload?.length ? null : (
//     <div className="rounded-md border !border-[#E6ECF2] bg-white/95 !px-2.5 !py-1.5 text-[12px] shadow-sm">
//       <div className="text-[#6B7A90]">{String(label)}</div>
//       <div className="font-medium text-[#0F1A2A]">
//         {payload[0].name ?? "Value"}: {payload[0].value}
//       </div>
//     </div>
//   );

export default function GreenWaves({
  height = 90,
  // showTooltip = true,
  dataBack = D_BACK,
  dataMid = D_MID,
  dataFront = D_FRONT,
}: Props) {
  const idBack = React.useId();
  const idMid = React.useId();
  const idFront = React.useId();

  // Compute domains across ALL series
  const all = [...dataBack, ...dataMid, ...dataFront];
  const minX = Math.min(...all.map((d) => d.x));
  const maxX = Math.max(...all.map((d) => d.x));
  const maxY = Math.max(...all.map((d) => d.y)) || 1;

  return (
    <div className="block w-full !p-0">
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataFront}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id={idBack} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F664B" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#B7F11D" stopOpacity={0.85} />
              </linearGradient>
              <linearGradient id={idMid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D7A5D" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#C8F04A" stopOpacity={0.85} />
              </linearGradient>
              <linearGradient id={idFront} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C3F227" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#D6FF2E" stopOpacity={1} />
              </linearGradient>
            </defs>
            {/* 
            {showTooltip && (
              <Tooltip
                cursor={{ stroke: "#0F5A43", strokeOpacity: 0.12 }}
                content={<WaveTooltip />}
              />
            )} */}

            <XAxis
              type="number"
              dataKey="x"
              domain={[minX, maxX]}
              padding={{ left: 0, right: 0 }}
              hide
              xAxisId="x"
            />
            <YAxis hide domain={[0, maxY]} yAxisId="y" />

            <Area
              data={dataBack}
              type="monotone"
              dataKey="y"
              stroke="none"
              fill={`url(#${idBack})`}
              isAnimationActive={false}
              dot={false}
              xAxisId="x"
              yAxisId="y"
            />
            <Area
              data={dataMid}
              type="monotone"
              dataKey="y"
              stroke="none"
              fill={`url(#${idMid})`}
              isAnimationActive={false}
              dot={false}
              xAxisId="x"
              yAxisId="y"
            />
            <Area
              data={dataFront}
              type="monotone"
              dataKey="y"
              stroke="none"
              fill={`url(#${idFront})`}
              isAnimationActive={false}
              dot={false}
              xAxisId="x"
              yAxisId="y"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
