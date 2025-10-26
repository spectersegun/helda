import React from "react";
import { StarIcon } from "../Icons";
import { SendIcon } from "./Icons";
import AIBlobVideo from "./AIBlob";

export type HeldaAssistantCardProps = {
  heading?: string;
  subheadingTop?: string;
  subheadingBottom?: string;
  suggestions?: string[];
  onSend?: (value: string) => void;
};

export default function HeldaAssistantCard({
  heading = "Helda AI Assistant",
  subheadingTop = "Ask about Pricing Data",
  subheadingBottom = "How can I assist you?",
  suggestions = [
    "Which department contributed the most revenue this quarter?",
    "Highlight underperforming services by revenue.",
    "Compare this months revenue to the same month last year.",
  ],
  onSend,
}: HeldaAssistantCardProps) {
  const [value, setValue] = React.useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };

  return (
    <div className="w-full rounded-[1.2vw] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] ring-1 ring-black/5 !px-6 !py-[1.3vh] ">
      <div className="flex items-start justify-center gap-[0.61vw] !mb-[2.5vh]">
        <span className="inline-block align-middle" aria-hidden>
          <StarIcon width={28} height={28} className="!h-[3.24vh] !w-auto " />
        </span>
        <div>
          <h1 className="!text-[1.62vw] !font-medium text-[#1F664B] !mb-[1.01vh] ">
            {heading}
          </h1>
          <p className="text-center text-lg text-black font-semibold h-[3.52vh] !mb-0 ">
            {subheadingTop}
          </p>
          <p className="text-center text-[#18181C] !font-normal text-lg leading-[22px] h-[2.22vh] !mb-0">
            {subheadingBottom}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[1.48vh] ">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            className="cursor-pointer w-full rounded-[10px] min-h-[5vh] !border !border-[#12428D] !bg-white !px-[0.45vw] !py-[0.72vh] font-semibold !text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:!text-white  text-center !transition-colors !duration-300 !ease-in-out !outline-none"
            onClick={() => setValue(s)}
          >
            <span className="inline-block  text-[0.81vw] leading-4.5 mx-auto max-w-[17.07vw]">
              “{s}”
            </span>
          </button>
        ))}
      </div>

      <div className="!py-[1.5vh] ">
        <AIBlobVideo />
      </div>

      <div className="flex-shrink-0 relative !mb-[1.8vh]">
        <input
          placeholder="Ask me anything"
          type="text"
          className="!pl-3 !rounded-lg border !p-2  w-full !h-12 text-base !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-[0.5vw] !bg-white !outline-none"
          onClick={() => handleSend()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
