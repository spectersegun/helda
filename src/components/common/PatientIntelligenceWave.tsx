import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  // percent number displayed inside the card, optional
  percent?: number;
  // optional className to apply to the container
  className?: string;
  // data points (array of numbers or objects)
  data?: Array<{ x: number | string; y: number }>;
};

const defaultData = [
  { x: 0, y: 20 },
  { x: 1, y: 40 },
  { x: 2, y: 60 },
  { x: 3, y: 48 },
  { x: 4, y: 70 },
  { x: 5, y: 56 },
  { x: 6, y: 80 },
  { x: 7, y: 68 }, // peak near center like original
  { x: 8, y: 72 },
  { x: 9, y: 58 },
  { x: 10, y: 48 },
  { x: 11, y: 30 },
];

export default function PatientIntelligenceWave({
  percent = 68,
  className = "",
  data = defaultData,
}: Props) {
  // convert data to Recharts-friendly format if needed
  const chartData = data.map((d, i) =>
    typeof d === "number" ? { x: i, y: d } : { x: d.x ?? i, y: d.y }
  );

  return (
    <div className={["relative", className].join(" ")}>
      {/* Chart area (keeps your original Tailwind sizing) */}
      <div className="max-w-full w-[13.23vw] h-[12.7vh] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            {/* grid and axes hidden for pure-shape look */}
            <CartesianGrid stroke="transparent" />
            <XAxis dataKey="x" hide />
            <YAxis hide domain={[0, "dataMax + 10"]} />

            {/* BACKGROUND SHAPE: light fill (animates first) */}
            <Area
              type="monotone"
              dataKey="y"
              stroke="none"
              fill="#E6F1F3"
              isAnimationActive={true}
              animationBegin={0} // as your original begin="0s"
              animationDuration={800}
              animationEasing="ease-out"
              fillOpacity={1}
            />

            {/* FOREGROUND SHAPE: darker fill (animates a bit later) */}
            <Area
              type="monotone"
              dataKey="y"
              stroke="none"
              fill="#1F664B"
              isAnimationActive={true}
              animationBegin={200} // mimic your 200ms delayed reveal
              animationDuration={900}
              animationEasing="ease-out"
              fillOpacity={1}
            />

            {/* Optional tooltip (hidden by default) */}
            <Tooltip cursor={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Percent text, positioned similarly to your original */}
      <div className="absolute inset-x-0 bottom-[4.0vh] flex items-center justify-center pointer-events-none">
        <div className="text-[3.2vw] text-black font-medium">{percent}%</div>
      </div>

      {/* caption / label */}
      <p className="text-black text-[1.2vw] !mb-0 text-center mt-[1.2vh]">
        New vs Returning patients
      </p>
    </div>
  );
}
