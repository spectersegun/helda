// export default function EmptyQuestion() {
//   return (
//     <div className="max-w-[400px]  !space-y-4 !mx-auto text-[#12428D] !mt-16 ">
//       <div className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:text-white !transition-colors !duration-300 !ease-in-out">
//         <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
//           What&apos;s our average charge for a knee replacement?
//         </p>
//       </div>
//       <div className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:text-white !transition-colors !duration-300 !ease-in-out">
//         <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
//           Which services had the biggest charge variation in April?
//         </p>
//       </div>
//       <div className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:text-white !transition-colors !duration-300 !ease-in-out">
//         <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
//           "How do our maternity service charges compare to other hospitals?"
//         </p>
//       </div>
//     </div>
//   );
// }

type Props = {
  onSelect?: (q: string) => void;
};

const QUESTIONS = [
  "What’s our average charge for a knee replacement?",
  "Which services had the biggest charge variation in April?",
  "How do our maternity service charges compare to other hospitals?",
];

export default function EmptyQuestion({ onSelect }: Props) {
  return (
    <div className="max-w-[400px] !space-y-4 !mx-auto text-[#12428D] !mt-16">
      {QUESTIONS.map((q) => (
        <div
          onClick={() => onSelect?.(q)}
          className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:text-white !transition-colors !duration-300 !ease-in-out"
        >
          <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
            "How do our maternity service charges compare to other hospitals?"
          </p>
        </div>
      ))}
    </div>
  );
}

{
  /* <button
  key={q}
  type="button"
  onClick={() => onSelect?.(q)}
  className="w-full !py-2 !border !border-[#12428D] rounded-lg cursor-pointer text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:text-white !transition-colors !duration-300 !ease-in-out"
>
  <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
    {q}
  </p>
</button>; */
}
