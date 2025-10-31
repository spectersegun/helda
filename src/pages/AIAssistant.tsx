import { BotIcon, SendIcon } from "../components/common/Icons";
import AISide from "../components/AISide";
import EmptyQuestion from "../components/common/EmptyQuestion";
import { useEffect, useState } from "react";

type ChatRow = {
  suggestion: string;
  text: string;
  userAvatarUrl?: string;
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
  const [chat, setChat] = useState<ChatRow[]>([]);

  useEffect(() => {
    setChat(sampleChat);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-[1.5vw] items-stretch flex-1 h-full !pt-[2.87vh] ">
        <AISide
          withQuestions={withQuestions}
          setWithQuestions={setWithQuestions}
        />

        <div className="col-span-2 bg-white rounded-[1vw] !px-[0.8vw] flex flex-col h-full flex-1 ">
          <div className="!pt-[4.26vh]  flex-1">
            <h2 className="text-center !text-[5.93vh] text-black !font-semibold !mb-0 ">
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

          <div className="flex-shrink-0 !mb-[2.1vh] relative">
            <input
              placeholder="Ask me anything"
              type="text"
              className="!pl-[0.8vw] !rounded-[0.5vw] border  w-full !h-[4.9vh] !text-[0.8vw] !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none"
            />
            <button
              className="absolute right-[1.010vw] top-1/2 -translate-y-1/2 p-[0.8vh] rounded-lg !bg-white !outline-none"
              onClick={() => setWithQuestions(!withQuestions)}
            >
              <SendIcon className="!h-[2.870vh] !w-auto" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ChatRowView({ row }: { row: ChatRow }) {
  return (
    <div className="!mt-8">
      <div className=" justify-end flex items-center gap-3 cursor-pointer  ">
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
