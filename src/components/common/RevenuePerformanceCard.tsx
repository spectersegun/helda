import { useNavigation } from "../../contexts/NavigationContext";
import FilledSparkline from "./FilledSparkline";

type DeltaDir = "up" | "down" | "flat";

type RevenuePerformanceCardProps = {
  title?: string;
  description?: string;
  value?: string | number;
  deltaText?: string;
  deltaDir?: DeltaDir;
  className?: string;
};

export default function RevenuePerformanceCard({
  title = "Revenue Performance",
  description = `Revenue Performance tracks your income by service, department, or payer — helping you quickly spot growth opportunities and underperforming areas.`,
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

  const { navigateToTab } = useNavigation();

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px] cursor-pointer flex flex-col justify-between w-full opacity-0 animate-[fadeInTop_0.6s_ease-out_forwards_0.5s]",
        "!pt-3 pb-20 shadow-sm border border-[#FCFAFA] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 ease-in-out",
        className,
      ].join(" ")}
      onClick={() => navigateToTab("revenue")}
    >
      <div className="!px-3 ">
        {/* Title */}
        <h3 className="!text-[22px] md:!text-xl !font-semibold text-black !mb-0 ">
          {title}
        </h3>

        {/* Description */}
        <p className="mx-auto mt-0 !mb-0 text-[10.5px] leading-4 text-black !font-light ">
          {description}
        </p>

        {/* Metric */}
        <div className="">
          <div className="flex justify-center items-center gap-3 ">
            <div className="text-[32px] font-semibold leading-6 text-black">
              {value}

              <p className="text-black text-xl font-normal !mb-0">this month</p>
            </div>
            <div className={`mt-0 text-sm font-medium ${deltaColor}`}>
              <span className="!mr-0.5 ">▲</span>
              {deltaText}
            </div>
          </div>
        </div>
      </div>

      <FilledSparkline height={130} />
    </div>
  );
}
