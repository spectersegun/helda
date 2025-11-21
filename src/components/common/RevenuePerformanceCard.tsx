import { useNavigation } from "../../contexts/NavigationContext";
import FilledSparkline from "./FilledSparkline";
import Heading24 from "./Heading24";
import Heading36 from "./Heading36";
// import RollingNumber2 from "./RollingNumber2";
import Text13 from "./Text13";

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
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[26vh] h-[25.9vh] cursor-pointer opacity-0 animate-[fadeInRight_0.6s_ease-out_forwards_0.3s] ",
        " !pt-[0.8vw] shadow-sm border border-[#FCFAFA] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 ease-in-out flex flex-col justify-between w-full",
        className,
      ].join(" ")}
      onClick={() => navigateToTab("revenue")}
    >
      <div className="!px-[0.6vw] ">
        <Heading24
          text={title}
          className="fall-in"
          style={{ "--fall-distance": "-20px" } as React.CSSProperties}
        />

        <Text13
          className="fall-in"
          style={{ "--fall-distance": "-30px" } as React.CSSProperties}
        >
          {description}
        </Text13>

        <div
          className="absolute  left-0 right-0 top-[9.80vh] fall-in"
          style={{ "--fall-distance": "-10px" } as React.CSSProperties}
        >
          <div className="flex justify-center items-center gap-3 ">
            <div className="">
              <Heading36 className="!leading-[2.1vh]">{value}</Heading36>

              <p className="text-black text-[1.2vw] font-normal !mb-0">
                this month
              </p>
            </div>
            <div className={`mt-0 text-[1vw] font-medium ${deltaColor}`}>
              <span className="!mr-0.5 ">▲</span>
              {deltaText}
            </div>
          </div>
        </div>

        {/* <RollingNumber2 value={2000000} prefix="N" duration={1200} /> */}
      </div>

      <div className="chart-animate">
        <FilledSparkline height={"7.57vw"} />
      </div>
    </div>
  );
}
