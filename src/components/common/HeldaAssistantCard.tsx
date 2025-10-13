import React from "react";
import { StarIcon } from "../Icons";
import { SendIcon } from "./Icons";
import { motion } from "framer-motion";

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
    <div className="w-full max-w-[518px] rounded-[24px] bg-white shadow-[0_6px_24px_rgba(16,24,40,0.04)] ring-1 ring-black/5 !px-6 !py-3.5">
      <div className="flex items-start justify-center gap-2.5 !mb-2.5">
        <span className="inline-block align-middle" aria-hidden>
          <StarIcon width={28} height={28} />
        </span>
        <div>
          <h1 className="!text-3xl !font-medium text-[#1F664B] !mb-2.5">
            {heading}
          </h1>
          <p className="text-center text-lg text-black font-semibold !mb-1.5">
            {subheadingTop}
          </p>
          <p className="text-center text-[#18181C] !font-normal text-lg leading-[22px] !mb-5">
            {subheadingBottom}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            className="cursor-pointer w-full rounded-[10px] min-h-[50px] !border !border-[#12428D] !bg-white !px-2 !py-1.5 font-semibold !text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:!text-white  text-center !transition-colors !duration-300 !ease-in-out !outline-none"
            onClick={() => setValue(s)}
          >
            <span className="inline-block  text-sm leading-4.5 mx-auto max-w-[330px]">
              “{s}”
            </span>
          </button>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="grid place-items-center !mb-2 !py-5"
      >
        <div className="w-[200px] max-w-full h-[200px] aspect-[1/1] overflow-hidden rounded-full !relative">
          <video
            src="/assets/AIBlob.web.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-[750px] h-auto  object-cover object-center origin-center [transform:scale(4.65)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      <div className="flex-shrink-0 relative !mb-2">
        <input
          placeholder="Ask me anything"
          type="text"
          className="!pl-3 !rounded-lg border !p-2  w-full !h-12 text-base !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg !bg-white !outline-none"
          onClick={() => handleSend()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
