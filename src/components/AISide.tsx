// export default function AISide({
//   setWithQuestions,
//   withQuestions,
// }: {
//   setWithQuestions: any;
//   withQuestions: any;
// }) {
//   return (
//     <div className="col-span-1 bg-white rounded-2xl text-center !pt-16 !px-1 ">
//       <h2 className="text-[#BAB6B6] !text-3xl mb-5 ">History</h2>

//       <div className="text-black !mb-8">
//         <h4 className="text-[#BAB6B6] !text-lg !font-normal">Yesterday</h4>
//         <p
//           className="!mb-1.5 "
//           onClick={() => setWithQuestions(!withQuestions)}
//         >
//           "Why did revenue drop in April?"
//         </p>
//         <p
//           className="!mb-1.5 "
//           onClick={() => setWithQuestions(!withQuestions)}
//         >
//           "Which departments had the lowest"
//         </p>
//         <p
//           className="!mb-1.5 "
//           onClick={() => setWithQuestions(!withQuestions)}
//         >
//           "Which payer types bring in the most"
//         </p>
//       </div>

//       <div className="text-black ">
//         <h4 className="text-[#BAB6B6] ">Saturday</h4>
//         <p className="!mb-1.5 ">"Show me year-over-year revenue"</p>
//         <p className="!mb-1.5 ">"Compare inpatient vs. outpatient"</p>
//         <p className="!mb-1.5 ">"Which services are generating the"</p>
//         <p className="!mb-1.5 ">"What&apos;s our average revenue per visit"</p>
//       </div>
//     </div>
//   );
// }

// components/AISide.tsx

"use client";

import type { Dispatch, SetStateAction } from "react";

type AISideProps = {
  setWithQuestions: Dispatch<SetStateAction<boolean>>;
  withQuestions: boolean;
};

export default function AISide({ setWithQuestions }: AISideProps) {
  const toggle = () => setWithQuestions((v) => !v);

  return (
    <div className="col-span-1 bg-white rounded-2xl text-center !pt-16 !px-1 ">
      <h2 className="text-[#BAB6B6] !text-3xl mb-5 ">History</h2>

      <div className="text-black !mb-8">
        <h4 className="text-[#BAB6B6] !text-lg !font-normal">Yesterday</h4>
        <p className="!mb-1.5 cursor-pointer" onClick={toggle}>
          "Why did revenue drop in April?"
        </p>
        <p className="!mb-1.5 cursor-pointer" onClick={toggle}>
          "Which departments had the lowest"
        </p>
        <p className="!mb-1.5 cursor-pointer" onClick={toggle}>
          "Which payer types bring in the most"
        </p>
      </div>

      <div className="text-black ">
        <h4 className="text-[#BAB6B6] ">Saturday</h4>
        <p className="!mb-1.5">"Show me year-over-year revenue"</p>
        <p className="!mb-1.5">"Compare inpatient vs. outpatient"</p>
        <p className="!mb-1.5">"Which services are generating the"</p>
        <p className="!mb-1.5">"What&apos;s our average revenue per visit"</p>
      </div>
    </div>
  );
}
