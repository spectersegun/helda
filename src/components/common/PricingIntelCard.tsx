import { useNavigation } from "../../contexts/NavigationContext";
import GreenWavesChart from "./GreenWavesChart";

type DeltaDir = "up" | "down" | "flat";

type PricingIntelCardProps = {
  title?: string;
  description?: string;
  metricLabel?: string;
  value?: string | number;
  deltaText?: string;
  deltaDir?: DeltaDir;
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
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[400px] cursor-pointer opacity-0 animate-[fadeInTop_0.6s_ease-out_forwards_0.3s] ",
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
    </div>
  );
}
