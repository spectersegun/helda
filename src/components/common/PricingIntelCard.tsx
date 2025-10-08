"use client";

import { useNavigation } from "../../contexts/NavigationContext";
import GreenWavesChart from "./GreenWavesChart";

type DeltaDir = "up" | "down" | "flat";

type PricingIntelCardProps = {
  title?: string;
  description?: string;
  metricLabel?: string;
  value?: string | number;
  deltaText?: string;
  deltaDir?: DeltaDir; // controls color & icon
  className?: string;
};

export default function PricingIntelCard({
  title = "Pricing Intelligence",
  description = `Pricing Intelligence shows how your service prices trend over time and compare to the market. It helps identify under- or overpricing, enabling smarter decisions to boost revenue and patient satisfaction.`,
  metricLabel = "Average price change",
  value = "0.5%",
  deltaText = "Since last week",
  deltaDir = "up",
  className = "",
}: PricingIntelCardProps) {
  const deltaColor =
    deltaDir === "up"
      ? "text-[#1F664B]"
      : deltaDir === "down"
      ? "text-red-700"
      : "text-gray-500";

  const { navigateToTab } = useNavigation();

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px] cursor-pointer ",
        " !pt-3 pb-20 shadow-sm border border-[#FCFAFA] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 ease-in-out flex flex-col justify-between w-full",
        className,
      ].join(" ")}
      onClick={() => navigateToTab("pricing")}
    >
      <div className="!px-3">
        <h3 className="!text-[22px] md:!text-xl !font-semibold text-black !mb-0 ">
          {title}
        </h3>

        <p className="mx-auto mt-0 !mb-0 text-[10.5px] leading-4 text-black !font-light ">
          {description}
        </p>

        {/* Metric */}
        <div className="!mb-0">
          <div className="text-[18px] md:text-[20px] !font-normal text-black">
            {metricLabel}
          </div>

          <div className="flex justify-center items-center gap-3 ">
            <div className="text-[32px] font-semibold leading-10 text-black">
              {value}
            </div>
            <div className={`mt-1 text-sm font-medium ${deltaColor}`}>
              <span className="!mr-0.5 ">▲</span>
              {deltaText}
            </div>
          </div>
        </div>
      </div>

      <GreenWavesChart height={90} />

      {/* <svg
        className="absolute bottom-[-16px] left-0 w-full h-24 md:h-24 "
        width="404"
        height="87"
        viewBox="0 0 404 87"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M381.107 86.7428C381.107 86.7428 376.126 66.3431 355.083 62.5948C334.194 58.8724 336.647 15.3728 306.635 13.6954C288.869 12.7019 285.455 25.8568 271.654 43.9727C251.289 70.7066 232.513 77.0419 208.219 58.6232C183.926 40.2045 168.167 55.8343 131.728 54.8827C95.289 53.931 89.9967 9.18175 67.2605 1.84673C29.8172 -10.2308 6.06055 86.4201 6.06055 86.4201L381.107 86.7428Z"
          fill="url(#paint0_linear_572_6013)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M403.999 86.4055C403.999 86.4055 398.634 74.6457 375.967 72.4849C353.465 70.339 356.107 45.2628 323.778 44.2958C304.641 43.7231 300.964 51.3065 286.097 61.7498C264.16 77.1611 243.934 80.8132 217.765 70.1954C191.597 59.5775 174.621 68.5877 135.369 68.0391C96.1168 67.4904 90.416 41.6938 65.9246 37.4654C25.5906 30.5031 0 86.2194 0 86.2194L403.999 86.4055Z"
          fill="url(#paint1_linear_572_6013)"
          fill-opacity="0.4"
        />
        <defs>
          <linearGradient
            id="paint0_linear_572_6013"
            x1="6.06055"
            y1="0.802246"
            x2="6.06055"
            y2="86.7428"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1F6633" />
            <stop offset="1" stop-color="#3B8267" stop-opacity="0.01" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_572_6013"
            x1="202"
            y1="36.8633"
            x2="202"
            y2="86.4055"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#CBDF90" />
            <stop offset="1" stop-color="#B5FF00" />
          </linearGradient>
        </defs>
      </svg> */}
    </div>
  );
}
