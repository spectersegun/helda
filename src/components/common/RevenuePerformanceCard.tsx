// import { useNavigation } from "../../contexts/NavigationContext";
// import FilledSparkline from "./FilledSparkline";
// import Heading24 from "./Heading24";
// import Heading36 from "./Heading36";
// import Text13 from "./Text13";

// type DeltaDir = "up" | "down" | "flat";

// type RevenuePerformanceCardProps = {
//   title?: string;
//   description?: string;
//   value?: string | number;
//   deltaText?: string;
//   deltaDir?: DeltaDir;
//   className?: string;
// };

// export default function RevenuePerformanceCard({
//   title = "Revenue Performance",
//   description = `Revenue Performance tracks your income by service, department, or payer — helping you quickly spot growth opportunities and underperforming areas.`,
//   value = "N2Million",
//   deltaText = "12% vs prior month",
//   deltaDir = "up",
//   className = "",
// }: RevenuePerformanceCardProps) {
//   const deltaColor =
//     deltaDir === "up"
//       ? "text-[#1F664B]"
//       : deltaDir === "down"
//       ? "text-red-700"
//       : "text-gray-500";

//   const { navigateToTab } = useNavigation();

//   return (
//     <div
//       className={[
//         "relative overflow-hidden rounded-2xl bg-white text-center max-h-[26vh] h-[25.9vh] cursor-pointer flex flex-col justify-between w-full opacity-0 animate-[fadeInRight_0.6s_ease-out_forwards_0.5s]",
//         "!pt-[0.8vw] shadow-sm border border-[#FCFAFA] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 ease-in-out",
//         className,
//       ].join(" ")}
//       onClick={() => navigateToTab("revenue")}
//     >
//       <div className="!px-[0.6vw] ">
//         <Heading24 text={title} />

//         <Text13>{description}</Text13>

//         {/* Metric */}
//         <div className="relative top-[-0.5vh]">
//           <div className="flex justify-center items-center gap-3 ">
//             <div className="">
//               {/* {value}  */}
//               <Heading36 className="!leading-[2.1vh]">{value}</Heading36>

//               <p className="text-black text-[1.2vw] font-normal !mb-0">
//                 this month
//               </p>
//             </div>
//             <div className={`mt-0 text-[1vw] font-medium ${deltaColor}`}>
//               <span className="!mr-0.5 ">▲</span>
//               {deltaText}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="chart-animate">
//         <FilledSparkline height={"7.57vw"} />
//       </div>
//     </div>
//   );
// }

import { useNavigation } from "../../contexts/NavigationContext";
import FilledSparkline from "./FilledSparkline";
import Heading24 from "./Heading24";
import Heading36 from "./Heading36";
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
        <Heading24 text={title} />

        <Text13>{description}</Text13>

        {/* Metric */}
        <div className="relative top-[-0.5vh]">
          <div className="flex justify-center items-center gap-3 ">
            <div className="">
              {/* {value}  */}
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
      </div>

      <div className="chart-animate">
        <FilledSparkline height={"7.57vw"} />
      </div>
    </div>
  );
}
