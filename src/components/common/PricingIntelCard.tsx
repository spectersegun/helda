import { useNavigation } from "../../contexts/NavigationContext";
import GreenWavesChart from "./GreenWavesChart";
import Heading24 from "./Heading24";
import Heading36 from "./Heading36";
import Text13 from "./Text13";

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
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[26vh] h-[25.9vh] cursor-pointer opacity-0 animate-[fadeInTop_0.6s_ease-out_forwards_0.3s] ",
        " !pt-[0.8vw] shadow-sm border border-[#FCFAFA] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 flex flex-col justify-between w-full",
        className,
      ].join(" ")}
      onClick={() => navigateToTab("pricing")}
    >
      <div className="!px-[0.7vw]">
        <Heading24 className="!leading-[2.8vh]" text={title} />
        <Text13>{description}</Text13>

        <div className="!mb-0 relative top-[-0.30vh]">
          <div className="text-[1.2vw] leading-[2.0vh] !font-normal text-black ">
            {metricLabel}
          </div>

          <div className="flex justify-center items-center gap-3 ">
            <Heading36>{value}</Heading36>
            <div className={`text-[1vw] font-medium ${deltaColor}`}>
              <span className="!mr-0.5 ">▲</span>
              {deltaText}
            </div>
          </div>
        </div>
      </div>

      {/* <GreenWavesChart height={"5.57vw"} /> */}
      <div className="chart-animate">
        <GreenWavesChart height={"5.57vw"} />
      </div>
    </div>
  );
}
