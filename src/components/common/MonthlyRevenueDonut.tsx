import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import SectionTitle from "./SectionTitle";

const COLORS = {
  cardiology: "#1F664B",
  oncology: "#12428D",
  neurology: "#CBDF90",
  paediatrics: "#C26A72",
  orthopedics: "#103B2B",
  others: "#E6A23C",
};

const DATA = [
  {
    key: "cardiology",
    label: "Cardiology",
    value: 46,
    color: COLORS.cardiology,
    cal: "45-64",
  },
  {
    key: "oncology",
    label: "Oncology",
    value: 24,
    color: COLORS.oncology,
    cal: "25-44",
  },
  {
    key: "neurology",
    label: "Neurology",
    value: 15,
    color: COLORS.neurology,
    cal: "65-74",
  },
  {
    key: "paediatrics",
    label: "Paediatrics",
    value: 8,
    color: COLORS.paediatrics,
    cal: "75+",
  },
  {
    key: "orthopedics",
    label: "Orthopedics",
    value: 7,
    color: COLORS.orthopedics,
    cal: "18-24",
  },
  {
    key: "others",
    label: "Others",
    value: 7,
    color: COLORS.others,
    cal: "0-17",
  },
];

export default function MonthlyRevenueDonut2({
  total = 10343,
  title = "Monthly Revenue by Department",
  designWidth = 2016,
  designHeight = 1142,
}: {
  total?: number | string;
  title?: string;
  designWidth?: number;
  designHeight?: number;
}) {
  const [scale, setScale] = useState<number>(1);
  useEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") return setScale(1);
      const s = Math.min(
        window.innerWidth / designWidth,
        window.innerHeight / designHeight
      );
      setScale(Math.max(0.45, Math.min(s, 1.3)));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [designWidth, designHeight]);

  const s = (px: number, min = 2, max = 9999) =>
    Math.round(Math.max(min, Math.min(px * scale, max)));

  const innerRadius = s(65, 10);
  const outerRadius = s(105, innerRadius + 8);
  const paddingAngle = Math.max(0, Math.round(1 * scale));
  const strokeW = Math.max(0.5, Math.round(0.5 * scale * 10) / 10);

  const leftColPx = s(270, 130);

  const [active, setActive] = React.useState<number | null>(null);

  const renderActiveShape = (p: any) => (
    <Sector
      {...p}
      innerRadius={p.innerRadius}
      outerRadius={p.outerRadius + Math.max(2, Math.round(4 * scale))}
      cornerRadius={0}
      stroke="#fff"
      strokeWidth={strokeW}
      filter="url(#hoverShadow)"
    />
  );

  console.log({ active });

  return (
    <div className="w-full max-w-full rounded-[1vw] !pt-[1.852vh] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] !px-[1.2vw] !pb-[0.185vh]">
      <SectionTitle
        title={title}
        className="w-full text-center"
        width="w-[19.798vw]"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${leftColPx}px 1fr`,
          gap: `${Math.round(6 * scale)}px`,
          alignItems: "center",
        }}
      >
        <div
          className="relative"
          style={{
            height: `${Math.round(
              (22.259 / 100) * window.innerHeight || Math.round(19.259 * 8)
            )}px`,
            padding: `${Math.round(
              (0.104 * (window?.innerWidth ?? 1000)) / 100
            )}px`,
          }}
        >
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter
                id="hoverShadow"
                x="-50%"
                y="-50%"
                width="240%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation={Math.max(2, Math.round(2 * scale))}
                  floodColor="#000"
                  floodOpacity="0.08"
                />
              </filter>
            </defs>
          </svg>

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={DATA}
                dataKey="value"
                nameKey="label"
                startAngle={90}
                endAngle={-270}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={paddingAngle}
                cornerRadius={0}
                isAnimationActive={false}
                animationDuration={320}
                onMouseEnter={(_, i) => setActive(i)}
                onMouseLeave={() => setActive(null)}
                activeShape={renderActiveShape}
              >
                {DATA.map((d) => (
                  <Cell
                    key={d.key}
                    fill={d.color}
                    stroke="#FFFFFF"
                    strokeWidth={strokeW}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-[0.707vw] leading-[1.381vh] font-semibold text-[#18181C]">
                Total
              </div>
              <div className="text-[1.45vw] leading-[1.45vw] font-semibold text-[#18181C]">
                {total}
              </div>
              <div className="text-[0.707vw] leading-[1.381vh] font-semibold text-[#18181C]">
                Patients
              </div>
            </div>
          </div>
        </div>

        <ul className="grid gap-[0.741vh] !mb-0">
          {DATA.map((d) => (
            <li key={d.key} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-[0.606vw] w-[0.606vw] rounded-full"
                  style={{ backgroundColor: d.color }}
                />
              </div>

              <span className="text-[0.808vw] leading-[1.08vw] !font-semibold text-[#99B2C6]">
                {d.cal}
              </span>

              <span className="text-[0.808vw] leading-[1.08vw] !font-semibold text-[#99B2C6]">
                {d.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
