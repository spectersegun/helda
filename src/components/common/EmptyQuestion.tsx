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
    <div className="max-w-[23vw] min-h-[5.18vh] !space-y-[1vw] !mx-auto text-[#12428D] !mt-[10.18vh]">
      {QUESTIONS.map((q) => (
        <div
          onClick={() => onSelect?.(q)}
          className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:text-white !transition-colors !duration-300 !ease-in-out"
        >
          <p className="!text-center !mb-0 !font-medium text-[0.81vw] leading-4.5 max-w-[17.07vw] !mx-auto">
            "How do our maternity service charges compare to other hospitals?"
          </p>
          {/* <span className="inline-block  text-[0.81vw] leading-4.5 mx-auto max-w-[17.07vw]">
            “{s}”
          </span> */}
        </div>
      ))}
    </div>
  );
}
