"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import MiniHeader from "./MiniHeader";

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
    cal: "75+ ",
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
}: {
  total?: number | string;
  title?: string;
}) {
  const [active, setActive] = React.useState<number | null>(null);

  const renderActiveShape = (p: any) => (
    <Sector
      {...p}
      innerRadius={p.innerRadius}
      outerRadius={p.outerRadius + 1}
      cornerRadius={0}
      stroke="#fff"
      strokeWidth={0.5}
      filter="url(#hoverShadow)"
    />
  );

  console.log({ active });

  return (
    <div className="w-full max-w-[860px] rounded-[24px] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] !px-6 !py-3 pt-2">
      <MiniHeader className="max-w-[280px]">{title}</MiniHeader>

      <div className="grid grid-cols-[200px_1fr] items-center gap-6">
        <div className="relative h-[190px] p-2">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={DATA}
                dataKey="value"
                nameKey="label"
                startAngle={90}
                endAngle={-270}
                innerRadius={45}
                outerRadius={90}
                paddingAngle={2}
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
                    strokeWidth={0.5}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-xs leading-[14px] font-semibold text-[#18181C]">
                Total
              </div>
              <div className="text-[24px] leading-[36px] font-semibold text-[#18181C]">
                {total}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <ul className="grid gap-2 !mb-0">
          {DATA.map((d) => (
            <li
              key={d.key}
              className="flex items-center justify-between gap-1.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-sm leading-[20px] !font-semibold text-[#99B2C6]">
                  {d.label}
                </span>
              </div>

              <span className="text-sm leading-[20px] !font-semibold text-[#99B2C6]">
                {d.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
