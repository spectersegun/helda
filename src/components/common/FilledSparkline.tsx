import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  // Tooltip
} from "recharts";

type Point = { x: number | string; y: number };

type Props = {
  data?: Point[];
  height?: number;
  color?: string;
  // showTooltip?: boolean;
  animateDurationMs?: number;
};

const DEFAULT_DATA: Point[] = [
  { x: 0, y: 12 },
  { x: 1, y: 22 },
  { x: 2, y: 16 },
  { x: 3, y: 28 },
  { x: 4, y: 20 },
  { x: 5, y: 32 },
  { x: 6, y: 18 },
  { x: 7, y: 26 },
  { x: 8, y: 14 },
  { x: 9, y: 40 },
];

// const SparkTooltip = ({ active, payload }: any) =>
//   !active || !payload?.length ? null : (
//     <div className="rounded-md border !border-[#E6ECF2] bg-white/95 !px-2.5 !py-1.5 text-[12px] shadow-sm">
//       <span className="font-medium text-[#0F1A2A]">{payload[0].value}</span>
//     </div>
//   );

export default function FilledSparkline({
  data = DEFAULT_DATA,
  height = 80,
  color = "#12428D",
  // showTooltip = true,
  animateDurationMs = 800,
}: Props) {
  const gradientId = React.useId();

  // Animate once on first mount, then never again
  const [enableAnim, setEnableAnim] = React.useState(true);
  const didFinishOnce = React.useRef(false);

  // If data prop changes and you DO want to reanimate, comment out this effect.
  React.useEffect(() => {
    if (didFinishOnce.current) {
      setEnableAnim(false);
    }
  }, [data]);

  return (
    <div className="w-full !p-0">
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={1} />
              </linearGradient>
            </defs>

            {/* {showTooltip && (
              <Tooltip
                cursor={{ stroke: color, strokeOpacity: 0.12 }}
                content={<SparkTooltip />}
              />
            )} */}

            <Area
              type="monotone"
              dataKey="y"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              // activeDot={{ r: 3 }}
              // Animation controls
              isAnimationActive={enableAnim}
              animationBegin={0}
              animationDuration={animateDurationMs}
              animationEasing="ease-out"
              onAnimationEnd={() => {
                didFinishOnce.current = true;
                setEnableAnim(false);
              }}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
