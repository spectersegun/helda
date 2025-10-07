"use client";

import React from "react";
import { StarIcon } from "../Icons";
import { SendIcon } from "./Icons";

export type HeldaAssistantCardProps = {
  heading?: string; // default: "Helda AI Assistant"
  subheadingTop?: string; // default: "Ask about Pricing Data"
  subheadingBottom?: string; // default: "How can I assist you?"
  suggestions?: string[]; // three items by default
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
      {/* Brand / Heading */}
      <div className="flex items-start justify-center gap-2.5 !mb-2.5">
        <span className="inline-block align-middle" aria-hidden>
          <StarIcon width={28} height={28} />
        </span>
        <div>
          <h1 className="!text-3xl !font-medium text-[#1F664B] !mb-2.5">
            {heading}
          </h1>
          {/* Subheads */}
          <p className="text-center text-lg text-black font-semibold !mb-1.5">
            {subheadingTop}
          </p>
          <p className="text-center text-[#18181C] !font-normal text-lg leading-[22px] !mb-5">
            {subheadingBottom}
          </p>
        </div>
      </div>
      {/* Suggestions */}
      <div className="flex flex-col gap-3">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            className="w-full rounded-[10px] min-h-[50px] !border !border-[#12428D] !bg-white !px-2 !py-1.5 font-semibold !text-[#12428D] shadow-xs hover:!bg-[#12428D] hover:!text-white  text-center !transition-colors !duration-300 !ease-in-out !outline-none"
            onClick={() => setValue(s)}
          >
            <span className="inline-block  text-sm leading-4.5 mx-auto max-w-[330px]">
              “{s}”
            </span>
          </button>
        ))}
      </div>
      {/* Orb */}

      {/* <div className="grid place-items-center !mb-2">
        <video
          src="/assets/AIBlob.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="max-w-full w-[180px] height-auto !mx-auto !mt-7 !mb-6"
        >
          Your browser does not support the video tag.
        </video>
      </div> */}

      <div className="grid place-items-center !mb-2">
        <img
          src="/images/AINEW.png"
          alt="AINEW"
          className="max-w-full w-[170px] height-auto !mx-auto !mt-7 !mb-8"
        />
      </div>

      {/* Input bar */}
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
