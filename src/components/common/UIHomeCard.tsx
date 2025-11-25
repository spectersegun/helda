import { StarIcon } from "../Icons";

export default function UIHomeCard({
  title,
  positive,
  nagative,
  positiveArrow,
  negativeArrow,
}: {
  title: string;
  positive: string;
  nagative: string;
  positiveArrow?: boolean;
  negativeArrow?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[0.56vh] items-center !py-[0.6vw] !px-[0.6vw] h-[14.352vh] bg-white rounded-[1vw] text-center">
      <div className="flex items-center fall-in">
        <h3 className="!mb-0 !text-[1.2vw] !font-semibold max-w-[16vw] min-h-[5.370vh] ">
          <span className="inline-block align-middle !mr-[0.4vw] ">
            <StarIcon width={18} height={18} className="!h-[1.6vh] !w-auto" />
          </span>
          {title}
        </h3>
      </div>

      <div>
        <p className="text-[#1F664B] text-[0.909vw] font-medium !mb-0 leading-[1vw] fall-in">
          {positiveArrow && <span> ▲</span>}
          {positive}
        </p>

        <p className="text-[#FD0303] text-[0.909vw] font-medium !mb-0 fall-in">
          {negativeArrow && <span>▼ </span>}
          {nagative}
        </p>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { StarIcon } from "../Icons";

// export default function UIHomeCard({
//   title,
//   positive,
//   nagative,
//   positiveArrow,
//   negativeArrow,
// }: {
//   title: string;
//   positive: string;
//   nagative: string;
//   positiveArrow?: boolean;
//   negativeArrow?: boolean;
// }) {
//   const [entered, setEntered] = useState(false);
//   useEffect(() => {
//     requestAnimationFrame(() => setEntered(true));
//   }, []);

//   return (
//     <div className="flex flex-col gap-[0.56vh] items-center !py-[0.6vw] !px-[0.6vw] h-[13.9vh] bg-white rounded-[1vw] text-center ">
//       {/* animated header: falls from above over 500ms and fades in */}
//       <div
//         className={
//           "flex items-center !mb-[1.11vh] transition-all duration-[500ms] ease-out delay-[600ms] " +
//           (entered
//             ? "opacity-100 translate-y-0"
//             : "opacity-0 -translate-y-[50px]")
//         }
//       >
//         <h3 className="!mb-0 !text-[1.2vw] !font-semibold max-w-[16vw] ">
//           <span className="inline-block align-middle !mr-[0.4vw] ">
//             <StarIcon width={18} height={18} className="!h-[1.6vh] !w-auto" />
//           </span>
//           {title}
//         </h3>
//       </div>

//       <p className="text-[#1F664B] text-[0.909vw] font-medium !mb-0 leading-[1vw] ">
//         {positiveArrow && <span> ▲</span>}
//         {positive}
//       </p>

//       <p className="text-[#FD0303] text-[0.909vw] font-medium !mb-0">
//         {" "}
//         {negativeArrow && <span>▼ </span>}
//         {nagative}
//       </p>
//     </div>
//   );
// }
