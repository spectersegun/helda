import { BotIcon, SendIcon } from "../components/common/Icons";
import AISide from "../components/AISide";
import EmptyQuestion from "../components/common/EmptyQuestion";
import { MarkdownRenderer } from "../components/common/MarkdownRenderer";
import { useEffect, useState } from "react";
import { useLLM } from "../hooks/useLLM";
import { useChatHistory } from "../contexts/ChatHistoryContext";
import type { LLMError } from "../types/llm.types";

interface ChatRow {
  suggestion: string;
  text: string;
  userAvatarUrl?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const sampleChat: ChatRow[] = [];

export default function AIAssistant() {
  const [withQuestions, setWithQuestions] = useState<boolean>(false);
  const [chat, setChat] = useState<ChatRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { addToHistory } = useChatHistory();

  const { isLoading, error, sendMessage, isHealthy } = useLLM({
    pageContext: 'ai-assistant',
    onError: (err: LLMError) => {
      console.error('LLM Error:', err);
    },
  });

  useEffect(() => {
    setChat(sampleChat);
  }, []);

  /**
   * Handle sending message to OpenAI
   */
  const handleSendMessage = async (messageText?: string) => {
    const trimmedInput = messageText || inputValue.trim();
    
    if (!trimmedInput || isLoading) return;
    
    if (!isHealthy) {
      alert('AI assistant is currently unavailable. Please check your API configuration.');
      return;
    }

    if (!messageText) {
      setInputValue("");
    }
    setWithQuestions(true);

    // Add user message to chat
    const userChatRow: ChatRow = {
      suggestion: trimmedInput,
      text: "",
      userAvatarUrl: "/images/dp.png",
      isLoading: true,
    };

    setChat((prev) => [...prev, userChatRow]);

    try {
      // Send to OpenAI
      const response = await sendMessage(trimmedInput);

      if (response) {
        // Update chat with AI response
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

        // Save to history
        addToHistory(trimmedInput, response.content, 'ai-assistant');
      }
    } catch (err) {
      console.error("Error sending message:", err);
      
      // Show error message
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

  /**
   * Handle question selection from EmptyQuestion component
   */
  const handleQuestionSelect = (question: string) => {
    handleSendMessage(question);
  };

  /**
   * Handle Enter key press
   */
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
        />

        <div className="col-span-2 bg-white rounded-[1vw] !px-[0.8vw] flex flex-col h-full flex-1">
          <div className="!pt-[4.26vh] flex-1 overflow-y-auto">
            <h2 className="text-center !text-[5.93vh] text-black !font-semibold !mb-0">
              How can I help?
            </h2>

            {/* API Health Warning */}
            {!isHealthy && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mx-4 mt-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ AI assistant may be temporarily unavailable. Please check your OpenAI API key.
                </p>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mx-4 mt-4">
                <p className="text-sm text-red-800">
                  Error: {error.message}
                </p>
              </div>
            )}

            {!withQuestions ? (
              <EmptyQuestion onSelect={handleQuestionSelect} />
            ) : (
              <div className="flex-1 space-y-12 !pb-8">
                {chat.map((row, i) => (
                  <ChatRowView key={i} row={row} />
                ))}
                
                {/* Loading indicator */}
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
    <div className="!mt-8">
      <div className="justify-end flex items-center gap-3 cursor-pointer">
        <span className="!text-[#12428D] hover:underline !text-base !font-medium">
          "{row.suggestion}"
        </span>

        <img
          src={row.userAvatarUrl || "/images/dp.png"}
          alt="User"
          className="size-7 rounded-full"
        />
      </div>

      {/* Assistant response */}
      {row.text && (
        <div className="flex items-start gap-3 pr-44">
          <BotIcon className={`mt-1 size-6 flex-shrink-0 ${row.isError ? 'text-red-600' : 'text-emerald-800'}`} />
          <div className={`text-[15px] md:text-base leading-6 md:leading-6 !w-[85%] ${
            row.isError ? 'text-red-600' : 'text-black'
          }`}>
            <MarkdownRenderer content={row.text} />
          </div>
        </div>
      )}
    </div>
  );
}
