import type { Dispatch, SetStateAction } from "react";

type AISideProps = {
  setWithQuestions: Dispatch<SetStateAction<boolean>>;
  withQuestions: boolean;
};

export default function AISide({ setWithQuestions }: AISideProps) {
  const toggle = () => setWithQuestions((v) => !v);

  return (
    <div className="col-span-1 bg-white rounded-[0.8vw] text-center !pt-[7.4vh] !px-[3.56vw] ">
      <h2 className="text-[#BAB6B6] !text-[3.33vh] !mb-[4.5vh] !leading-[4.5vh] ">
        History
      </h2>

      <div className="text-black !mb-[3vh] ">
        <h4 className="text-[#BAB6B6] !text-[1vw] !font-normal h-[2.3vh] mb-[0.74vh] ">
          Yesterday
        </h4>
        {[
          "Why did revenue drop in April?",
          "Which departments had the lowest",
          "Which payer types bring in the most",
        ].map((item, index) => (
          <p
            key={index}
            className="!mb-[0.324vh] cursor-pointer !text-[1vw] leading-[2.36vh] "
            onClick={toggle}
          >
            "{item}"
          </p>
        ))}
      </div>

      <div className="text-black">
        <h4 className="text-[#BAB6B6] !text-[1vw] !font-normal h-[2.3vh] mb-[0.74vh] ">
          Saturday
        </h4>
        {[
          "Show me year-over-year revenue",
          "Compare inpatient vs. outpatient",
          "Which services are generating the",
          "What's our average revenue per visit",
        ].map((item, index) => (
          <p
            key={index}
            className="!mb-[0.464vh] cursor-pointer !text-[1vw] leading-[2.36vh] "
            onClick={toggle}
          >
            "{item}"
          </p>
        ))}
      </div>
    </div>
  );
}
