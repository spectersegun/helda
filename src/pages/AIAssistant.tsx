// import { BotIcon, SendIcon } from "../components/common/Icons";
// import AISide from "../components/AISide";
// import EmptyQuestion from "../components/common/EmptyQuestion";
// // import { MarkdownRenderer } from "../components/common/MarkdownRenderer";
// import { useEffect, useRef, useState } from "react";
// import { useLLM } from "../hooks/useLLM";
// import { useChatHistory } from "../contexts/ChatHistoryContext";
// import type { LLMError } from "../types/llm.types";
// import { TypeAnimation } from "react-type-animation";
// import { animateFlyTo } from "../utils/animateFlyTo"; // path as appropriate

// interface ChatRow {
//   suggestion: string;
//   text: string;
//   userAvatarUrl?: string;
//   isLoading?: boolean;
//   isError?: boolean;
// }

// const sampleChat: ChatRow[] = [];

// export default function AIAssistant() {
//   const [withQuestions, setWithQuestions] = useState<boolean>(false);
//   const [chat, setChat] = useState<ChatRow[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const { addToHistory } = useChatHistory();

//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   const { isLoading, error, sendMessage, isHealthy } = useLLM({
//     pageContext: "ai-assistant",
//     onError: (err: LLMError) => {
//       console.error("LLM Error:", err);
//     },
//   });

//   useEffect(() => {
//     setChat(sampleChat);
//   }, []);

//   const handleSendMessage = async (messageText?: string) => {
//     const trimmedInput = messageText || inputValue.trim();

//     if (!trimmedInput || isLoading) return;

//     if (!isHealthy) {
//       alert(
//         "AI assistant is currently unavailable. Please check your API configuration."
//       );
//       return;
//     }

//     if (!messageText) {
//       setInputValue("");
//     }
//     setWithQuestions(true);

//     // Add user message to chat
//     const userChatRow: ChatRow = {
//       suggestion: trimmedInput,
//       text: "",
//       userAvatarUrl: "/images/dp.png",
//       isLoading: true,
//     };

//     setChat((prev) => [...prev, userChatRow]);

//     try {
//       // Send to OpenAI
//       const response = await sendMessage(trimmedInput);

//       if (response) {
//         // Update chat with AI response
//         setChat((prev) => {
//           const newChat = [...prev];
//           newChat[newChat.length - 1] = {
//             suggestion: trimmedInput,
//             text: response.content,
//             userAvatarUrl: "/images/dp.png",
//             isLoading: false,
//           };
//           return newChat;
//         });

//         // Save to history
//         addToHistory(trimmedInput, response.content, "ai-assistant");
//       }
//     } catch (err) {
//       console.error("Error sending message:", err);

//       // Show error message
//       setChat((prev) => {
//         const newChat = [...prev];
//         newChat[newChat.length - 1] = {
//           suggestion: trimmedInput,
//           text: "I apologize, but I'm having trouble connecting. Please check your API key and try again.",
//           userAvatarUrl: "/images/dp.png",
//           isLoading: false,
//           isError: true,
//         };
//         return newChat;
//       });
//     }
//   };

//   const handleQuestionSelect = (question: string) => {
//     handleSendMessage(question);
//   };

//   /**
//    * Handle Enter key press
//    */
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   console.log({ chat });

//   const handleHistorySelect = async (
//     question: string,
//     sourceEl: HTMLElement
//   ) => {
//     const container = chatContainerRef.current;
//     if (!container) {
//       handleSendMessage(question);
//       return;
//     }

//     container.scrollTop = container.scrollHeight;

//     const lastRow = container.querySelector(
//       "[data-chat-row]:last-child"
//     ) as HTMLElement | null;

//     const containerRect = container.getBoundingClientRect();
//     const sourceRect = sourceEl.getBoundingClientRect();

//     const rightPadding = 24;
//     const targetRight = containerRect.right - rightPadding;
//     const targetLeft = targetRight - sourceRect.width;

//     let destTop: number;
//     let destHeight = sourceRect.height;
//     let destWidth = sourceRect.width;

//     if (lastRow) {
//       const r = lastRow.getBoundingClientRect();
//       destTop = r.bottom + 8;
//       destHeight = r.height || sourceRect.height;
//       const maxTop = containerRect.bottom - 40;
//       if (destTop > maxTop) destTop = maxTop;
//     } else {
//       destTop = containerRect.top + 80;
//     }

//     const destRect = new DOMRect(targetLeft, destTop, destWidth, destHeight);

//     try {
//       await animateFlyTo(sourceEl, destRect, {
//         duration: 520,
//         easing: "cubic-bezier(.2,.9,.2,1)",
//       });

//       handleSendMessage(question);

//       setTimeout(() => {
//         container.scrollTop = container.scrollHeight;
//       }, 80);
//     } catch (err) {
//       console.error("Animation failed, sending without animation:", err);
//       handleSendMessage(question);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-3 gap-[1.5vw] items-stretch flex-1 h-full !pt-[2.87vh]">
//         <AISide
//           withQuestions={withQuestions}
//           setWithQuestions={setWithQuestions}
//           onSelectHistory={handleHistorySelect}
//         />

//         <div className="col-span-2 bg-white rounded-[1vw] !px-[0.8vw] flex flex-col h-full flex-1 overflow-y-auto">
//           <div
//             ref={chatContainerRef}
//             className="!pt-[4.26vh] flex-1 overflow-y-auto"
//           >
//             <h2 className="text-center !text-[5.93vh] text-black !font-semibold !mb-0">
//               How can I help?
//             </h2>

//             {/* API Health Warning */}
//             {!isHealthy && (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mx-4 mt-4">
//                 <p className="text-sm text-yellow-800">
//                   ⚠️ AI assistant may be temporarily unavailable. Please check
//                   your OpenAI API key.
//                 </p>
//               </div>
//             )}

//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-3 mx-4 mt-4">
//                 <p className="text-sm text-red-800">Error: {error.message}</p>
//               </div>
//             )}

//             {!chat.length ? (
//               <EmptyQuestion onSelect={handleQuestionSelect} />
//             ) : (
//               <div className="flex-1 space-y-12 !pb-8">
//                 {chat.map((row, i) => (
//                   <ChatRowView key={i} row={row} />
//                 ))}

//                 {/* Loading indicator */}
//                 {isLoading && chat[chat.length - 1]?.isLoading && (
//                   <div className="flex items-center gap-3 !pl-4">
//                     <BotIcon className="size-6 text-emerald-800 animate-pulse" />
//                     <span className="text-gray-500 text-sm animate-pulse">
//                       Thinking...
//                     </span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex-shrink-0 !mb-[2.1vh] relative">
//             <input
//               placeholder="Ask me anything"
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading || !isHealthy}
//               className="!pl-[0.8vw] !pr-[3.5vw] !rounded-[0.5vw] border w-full !h-[4.9vh] !text-[0.8vw] !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             />
//             <button
//               className="absolute right-[1.010vw] top-1/2 -translate-y-1/2 p-[0.8vh] rounded-lg !bg-white !outline-none hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               onClick={() => handleSendMessage()}
//               disabled={isLoading || !inputValue.trim() || !isHealthy}
//               aria-label="Send message"
//             >
//               <SendIcon className="!h-[2.870vh] !w-auto" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function ChatRowView({ row }: { row: ChatRow }) {
//   return (
//     <div className="!mt-8" data-chat-row>
//       <div className="justify-end flex items-center gap-3 cursor-pointer">
//         {/* <span className="!text-[#12428D] hover:underline !text-base !font-medium">
//           "{row.suggestion}"
//         </span> */}

//         <TypeAnimation
//           sequence={[`"${row.suggestion}"`, 300]}
//           speed={50}
//           cursor={false}
//           className="!text-[#12428D] text-[1vw] !font-medium"
//         />

//         <img
//           src={row.userAvatarUrl || "/images/dp.png"}
//           alt="User"
//           className="size-7 rounded-full"
//         />
//       </div>

//       {/* Assistant response */}
//       {row.text && (
//         <div className="flex items-start gap-3 pr-44">
//           <BotIcon
//             className={`mt-1 size-6 flex-shrink-0 ${
//               row.isError ? "text-red-600" : "text-emerald-800"
//             }`}
//           />
//           <div
//             className={`text-[1vw] leading-6 md:leading-6 !w-[85%] ${
//               row.isError ? "text-red-600" : "text-black"
//             }`}
//           >
//             {/* <MarkdownRenderer content={row.text} /> */}

//             <TypeAnimation
//               sequence={[`"${row.text}"`, 200]}
//               speed={50}
//               cursor={false}
//               className="!text-black  text-[1vw] !font-medium"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { BotIcon, SendIcon } from "../components/common/Icons";
import AISide from "../components/AISide";
import EmptyQuestion from "../components/common/EmptyQuestion";
import { useLLM } from "../hooks/useLLM";
import { useChatHistory } from "../contexts/ChatHistoryContext";
import type { LLMError } from "../types/llm.types";
import { TypeAnimation } from "react-type-animation";

interface ChatRow {
  suggestion: string;
  text: string;
  userAvatarUrl?: string;
  isLoading?: boolean;
  isError?: boolean;
}

async function animateFlyTo(
  sourceEl: HTMLElement,
  destRect: DOMRect,
  opts?: { duration?: number; easing?: string }
) {
  const duration = opts?.duration ?? 520;
  const easing = opts?.easing ?? "cubic-bezier(.2,.9,.2,1)";

  const sourceRect = sourceEl.getBoundingClientRect();
  const clone = sourceEl.cloneNode(true) as HTMLElement;

  const cs = window.getComputedStyle(sourceEl);
  clone.style.fontFamily = cs.fontFamily;
  clone.style.fontSize = cs.fontSize;
  clone.style.fontWeight = cs.fontWeight;
  clone.style.lineHeight = cs.lineHeight;
  clone.style.color = cs.color;
  clone.style.background = cs.backgroundColor || "transparent";
  clone.style.padding = cs.padding;
  clone.style.margin = "0";
  clone.style.borderRadius = cs.borderRadius;
  clone.style.boxSizing = "border-box";
  clone.style.whiteSpace = "pre-wrap";
  clone.style.textAlign = cs.textAlign;

  // Position clone on top of source
  clone.style.position = "fixed";
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  clone.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}, left ${duration}ms ${easing}, top ${duration}ms ${easing}`;
  clone.style.transformOrigin = "top left";
  clone.style.opacity = "1";

  document.body.appendChild(clone);

  const destLeft = destRect.left;
  const destTop = destRect.top;

  const translateX = destLeft - sourceRect.left;
  const translateY = destTop - sourceRect.top;

  clone.offsetHeight;

  clone.style.transform = `translate(${translateX}px, ${translateY}px)`;
  clone.style.opacity = "0.98";

  await new Promise((resolve) => {
    let finished = false;
    const onEnd = () => {
      if (finished) return;
      finished = true;
      clone.removeEventListener("transitionend", onEnd);
      resolve(true);
    };
    clone.addEventListener("transitionend", onEnd);

    setTimeout(() => {
      if (!finished) {
        finished = true;
        try {
          clone.remove();
        } catch {}
        resolve(true);
      }
    }, duration + 80);
  });

  // cleanup
  if (clone.parentElement) clone.parentElement.removeChild(clone);
}

export default function AIAssistant() {
  const [withQuestions, setWithQuestions] = useState<boolean>(false);
  const [chat, setChat] = useState<ChatRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { addToHistory } = useChatHistory();

  const { isLoading, error, sendMessage, isHealthy } = useLLM({
    pageContext: "ai-assistant",
    onError: (err: LLMError) => {
      console.error("LLM Error:", err);
    },
  });

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setChat([]);
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const trimmedInput = messageText ?? inputValue.trim();

    if (!trimmedInput || isLoading) return;

    if (!isHealthy) {
      alert(
        "AI assistant is currently unavailable. Please check your API configuration."
      );
      return;
    }

    if (!messageText) {
      setInputValue("");
    }
    setWithQuestions(true);

    const userChatRow: ChatRow = {
      suggestion: trimmedInput,
      text: "",
      userAvatarUrl: "/images/dp.png",
      isLoading: true,
    };

    setChat((prev) => [...prev, userChatRow]);

    try {
      const response = await sendMessage(trimmedInput);

      if (response) {
        setChat((prev) => {
          const newChat = [...prev];
          newChat[newChat.length - 1] = {
            suggestion: trimmedInput,
            text: response.content,
            userAvatarUrl: "/images/dp.png",
            isLoading: false,
          };
          return newChat;
        });

        addToHistory(trimmedInput, response.content, "ai-assistant");
      }
    } catch (err) {
      console.error("Error sending message:", err);

      setChat((prev) => {
        const newChat = [...prev];
        newChat[newChat.length - 1] = {
          suggestion: trimmedInput,
          text: "I apologize, but I'm having trouble connecting. Please check your API key and try again.",
          userAvatarUrl: "/images/dp.png",
          isLoading: false,
          isError: true,
        };
        return newChat;
      });
    }
  };

  const handleHistorySelect = async (
    question: string,
    sourceEl: HTMLElement
  ) => {
    const container = chatContainerRef.current;
    if (!container) {
      handleSendMessage(question);
      return;
    }

    container.scrollTop = container.scrollHeight;

    const lastRow = container.querySelector(
      "[data-chat-row]:last-child"
    ) as HTMLElement | null;

    const containerRect = container.getBoundingClientRect();
    const sourceRect = sourceEl.getBoundingClientRect();

    const rightPadding = 24;
    const targetRight = containerRect.right - rightPadding;
    const targetLeft = targetRight - sourceRect.width;

    let destTop: number;
    let destHeight = sourceRect.height;
    let destWidth = sourceRect.width;

    if (lastRow) {
      const r = lastRow.getBoundingClientRect();
      destTop = r.bottom + 8;
      destHeight = r.height || sourceRect.height;
      const maxTop = containerRect.bottom - 40;
      if (destTop > maxTop) destTop = maxTop;
    } else {
      destTop = containerRect.top + 80;
    }

    const destRect = new DOMRect(targetLeft, destTop, destWidth, destHeight);

    try {
      await animateFlyTo(sourceEl, destRect, {
        duration: 520,
        easing: "cubic-bezier(.2,.9,.2,1)",
      });

      handleSendMessage(question);

      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 80);
    } catch (err) {
      console.error("Animation failed, sending without animation:", err);
      handleSendMessage(question);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-[1.5vw] items-stretch flex-1 h-full !pt-[2.87vh]">
        <AISide
          withQuestions={withQuestions}
          setWithQuestions={setWithQuestions}
          onSelectHistory={handleHistorySelect}
        />

        <div className="col-span-2 bg-white rounded-[1vw] !px-[0.8vw] flex flex-col h-full flex-1 overflow-y-auto">
          <div
            ref={chatContainerRef}
            data-chat-container
            className="!pt-[4.26vh] flex-1 overflow-y-auto"
          >
            <h2 className="text-center !text-[5.93vh] text-black !font-semibold !mb-0">
              How can I help?
            </h2>

            {!isHealthy && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mx-4 mt-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ AI assistant may be temporarily unavailable. Please check
                  your OpenAI API key.
                </p>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mx-4 mt-4">
                <p className="text-sm text-red-800">Error: {error.message}</p>
              </div>
            )}

            {!chat.length ? (
              <EmptyQuestion onSelect={(q) => handleSendMessage(q)} />
            ) : (
              <div className="flex-1 space-y-12 !pb-8">
                {chat.map((row, i) => (
                  <ChatRowView key={i} row={row} />
                ))}

                {isLoading && chat[chat.length - 1]?.isLoading && (
                  <div className="flex items-center gap-3 !pl-4">
                    <BotIcon className="size-6 text-emerald-800 animate-pulse" />
                    <span className="text-gray-500 text-sm animate-pulse">
                      Thinking...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-shrink-0 !mb-[2.1vh] relative">
            <input
              placeholder="Ask me anything"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || !isHealthy}
              className="!pl-[0.8vw] !pr-[3.5vw] !rounded-[0.5vw] border w-full !h-[4.9vh] !text-[0.8vw] !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              className="absolute right-[1.010vw] top-1/2 -translate-y-1/2 p-[0.8vh] rounded-lg !bg-white !outline-none hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim() || !isHealthy}
              aria-label="Send message"
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
    <div className="!mt-8" data-chat-row>
      <div className="justify-end flex items-center gap-3 cursor-pointer">
        <TypeAnimation
          sequence={[`"${row.suggestion}"`, 300]}
          speed={50}
          cursor={false}
          className="!text-[#12428D] text-[1vw] !font-medium"
        />

        <img
          src={row.userAvatarUrl || "/images/dp.png"}
          alt="User"
          className="size-7 rounded-full"
        />
      </div>

      {/* Assistant response */}
      {row.text && (
        <div className="flex items-start gap-3 pr-44">
          <BotIcon
            className={`mt-1 size-6 flex-shrink-0 ${
              row.isError ? "text-red-600" : "text-emerald-800"
            }`}
          />
          <div
            className={`text-[1vw] leading-6 md:leading-6 !w-[85%] ${
              row.isError ? "text-red-600" : "text-black"
            }`}
          >
            <TypeAnimation
              sequence={[`${row.text}`, 200]}
              speed={90}
              cursor={false}
              className="!text-black text-[1vw] !font-medium"
            />
          </div>
        </div>
      )}
    </div>
  );
}
