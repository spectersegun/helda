import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar from "../components/common/HeldaSidebar";
import { BotIcon, SendIcon } from "../components/common/Icons";
import AISide from "../components/AISide";
import EmptyQuestion from "../components/common/EmptyQuestion";
import { useState } from "react";

type ChatRow = {
  suggestion: string; // right-side quoted text
  text: string; // assistant paragraph
  userAvatarUrl?: string; // optional user avatar
};

const sampleChat: ChatRow[] = [
  {
    suggestion: `Why did revenue drop in April?`,
    text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    userAvatarUrl: "/images/dp.png",
  },
  {
    suggestion: `Which departments had the lowest`,
    text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    userAvatarUrl: "/images/dp.png",
  },
];

export default function AIAssistant() {
  const [withQuestions, setWithQuestions] = useState<boolean>(false);
  const [chat, setChat] = useState<ChatRow[]>(sampleChat);

  return (
    <GreenWrapper>
      <div className="!p-6 !h-full  bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar activeKey="assistant" />

        <div className="flex-1 flex flex-col gap-5">
          <WelcomeCard
            name="Helda AI Assistant"
            subtitle="“Your AI partner for instant answers and insights — helping you make faster, smarter healthcare decisions.”"
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)] flex-shrink-0"
          />
          <div className="grid grid-cols-3 gap-5 items-stretch flex-1 ">
            <AISide />

            <div className="col-span-2 bg-white rounded-2xl !px-4 flex flex-col h-full">
              <div className="!pt-8  flex-1 ">
                <h2 className="text-center !text-4xl !font-semibold  ">
                  How can I help?
                </h2>
                {!withQuestions ? (
                  <EmptyQuestion />
                ) : (
                  <div className="flex-1 space-y-12">
                    {chat.map((row, i) => (
                      <ChatRowView key={i} row={row} />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 !mb-3 relative">
                <input
                  placeholder="Ask me anything"
                  type="text"
                  className="!pl-3 !rounded-lg border !p-2  w-full !h-12 text-base !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg !bg-white !outline-none"
                  onClick={() => setWithQuestions(!withQuestions)}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GreenWrapper>
  );
}

function ChatRowView({ row }: { row: ChatRow }) {
  return (
    <div className="!mt-8">
      <div className=" justify-end flex items-center gap-3 cursor-pointer ">
        <span className="!text-[#12428D] hover:underline !text-base !font-medium ">
          “{row.suggestion}”
        </span>

        <img
          src={"/images/dp.png"}
          alt="User"
          className="size-7 rounded-full  "
        />
      </div>

      {/* assistant line */}
      <div className="flex items-start gap-3 pr-44">
        <BotIcon className="mt-1 size-6 text-emerald-800" />
        <p className="text-[15px] md:text-base text-black leading-6 md:leading-6 font-medium !w-[85%] ">
          {row.text}
        </p>
      </div>
    </div>
  );
}
