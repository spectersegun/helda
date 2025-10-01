"use client";

type DeltaDir = "up" | "down" | "flat";

type RevenuePerformanceCardProps = {
  title?: string;
  description?: string;
  metricLabel?: string;
  value?: string | number;
  deltaText?: string;
  deltaDir?: DeltaDir; // controls color & icon
  className?: string;
};

export default function RevenuePerformanceCard({
  title = "Revenue Performance",
  description = `Revenue Performance tracks your income by service, department, or payer — helping you quickly spot growth opportunities and underperforming areas.`,
  metricLabel = "Average price change",
  value = "N2Million",
  deltaText = "12% vs prior month",
  deltaDir = "up",
  className = "",
}: RevenuePerformanceCardProps) {
  const deltaColor =
    deltaDir === "up"
      ? "text-[#1F664B]"
      : deltaDir === "down"
      ? "text-red-700"
      : "text-gray-500";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px]",
        "!px-3 !pt-4 pb-20 shadow-sm border border-black/5",
        className,
      ].join(" ")}
    >
      {/* Title */}
      <h3 className="!text-[22px] md:!text-xl !font-semibold text-black !mb-0 ">
        {title}
      </h3>

      {/* Description */}
      <p className="mx-auto mt-0 !mb-0 text-[10.5px] leading-4 text-black !font-light ">
        {description}
      </p>

      {/* Metric */}
      <div className="!mb-20">
        <div className="text-[18px] md:text-[20px] !font-normal text-black">
          {metricLabel}
        </div>

        <div className="flex justify-center items-center gap-3 ">
          <div className="text-[32px] font-semibold leading-10 text-black">
            {value}

            <p className="text-black text-xl font-normal">this month</p>
          </div>
          <div className={`mt-1 text-sm font-medium ${deltaColor}`}>
            <span className="!mr-0.5 ">▲</span>
            {deltaText}
          </div>
        </div>
      </div>

      {/* <svg
        className="absolute bottom-[-16px] left-0 w-full h-24 md:h-24 !px-2"
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

      <svg
        className="absolute bottom-[-16px] left-0 w-full h-24 md:h-24 !px-2"
        width="433"
        height="132"
        viewBox="0 0 433 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M79.6896 95.4672C61.7933 101.634 56.6016 62.7517 40.5987 67.5143C24.5959 72.2769 12.2578 95.4672 1.50781 122.639V131.786H431.508V0C423.445 41.9041 412.023 114.643 392.417 120.676C372.81 126.71 369.695 41.9041 353.326 24.9349C336.957 7.96578 330.727 80.8531 314.235 84.2039C297.744 87.5546 289.742 48.2705 275.144 44.7824C260.546 41.2942 252.789 73.6126 236.053 67.8614C219.317 62.1102 213.148 13.6909 196.962 3.10584C180.776 -7.47926 174.18 39.8232 157.871 41.9041C141.563 43.985 132.523 8.44734 118.781 13.6909C105.038 18.9345 97.5859 89.3005 79.6896 95.4672Z"
          fill="url(#paint0_linear_572_6091)"
        />
        <path
          d="M1.50781 123.668C12.2578 96.4965 24.5959 73.3062 40.5987 68.5436C56.6016 63.781 61.7933 102.663 79.6896 96.4965C97.5859 90.3298 105.038 19.9638 118.781 14.7202C132.523 9.47664 141.563 45.0143 157.871 42.9334C174.18 40.8525 180.776 -6.44996 196.962 4.13514C213.148 14.7202 219.317 63.1395 236.053 68.8907C252.789 74.6419 260.546 42.3235 275.144 45.8117C289.742 49.2998 297.744 88.5839 314.235 85.2332C330.727 81.8824 336.957 8.99507 353.326 25.9642C369.695 42.9334 372.81 127.739 392.417 121.706C412.023 115.672 423.445 42.9334 431.508 1.0293"
          stroke="#12428D"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_572_6091"
            x1="216.508"
            y1="0"
            x2="216.508"
            y2="131.786"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#12428D" />
            <stop offset="1" stop-color="#12428D" stop-opacity="0.37" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
