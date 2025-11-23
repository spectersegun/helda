import React, { useState } from "react";
import { StarIcon } from "../Icons";
import { SendIcon, ChevronUpIcon } from "./Icons";
import AIBlobVideo from "./AIBlob";
import { useLLM } from "../../hooks/useLLM";
import type { LLMError } from "../../types/llm.types";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useStreaming } from "../../contexts/StreamingContext";
import { useNavigation } from "../../contexts/NavigationContext";
import { TypeAnimation } from "react-type-animation";

export type HeldaAssistantCardProps = {
  heading?: string;
  subheadingTop?: string;
  subheadingBottom?: string;
  suggestions?: string[];
  onResponse?: (question: string, response: string) => void;
  pageContext?: "patient" | "revenue" | "pricing" | "ai-assistant";
  userAvatarSrc?: string;
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
  onResponse,
  pageContext = "ai-assistant",
  userAvatarSrc = "/images/dp.png",
}: HeldaAssistantCardProps) {
  const [value, setValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const previousHistoryLengthRef = React.useRef(0);

  const { navigateToTab } = useNavigation();

  // Use streaming context for persistent state
  const {
    streamingState,
    setStreamingState,
    clearStreamingState,
    updateStreamingResponse,
    addToConversation,
  } = useStreaming();

  // Local state derived from context
  const isStreaming =
    streamingState?.pageContext === pageContext && streamingState?.isStreaming;
  const currentQuestion = isStreaming
    ? streamingState?.currentQuestion || ""
    : "";
  const streamingResponse = isStreaming
    ? streamingState?.streamingResponse || ""
    : "";
  const conversationHistory =
    (streamingState?.pageContext === pageContext
      ? streamingState?.conversationHistory
      : []) || [];

  const { isLoading, streamMessage, isHealthy } = useLLM({
    pageContext,
    includeDataContext: true,
    onError: (err: LLMError) => {
      console.error("LLM Error:", err);
      setIsProcessing(false);
      clearStreamingState();
    },
  });

  const handleSend = async () => {
    if (!value.trim() || isLoading || isProcessing) return;

    if (!isHealthy) {
      alert(
        "AI assistant is currently unavailable. Please check your API configuration."
      );
      return;
    }

    const question = value.trim();
    setValue("");

    // Set streaming state in context
    setStreamingState({
      isStreaming: true,
      currentQuestion: question,
      streamingResponse: "",
      pageContext,
      conversationHistory: conversationHistory,
    });
    setIsProcessing(true);

    try {
      let fullResponse = "";

      await streamMessage(question, (chunk: string) => {
        fullResponse += chunk;
        updateStreamingResponse(fullResponse);
      });

      if (onResponse) {
        onResponse(question, fullResponse);
      }

      // Add to conversation history
      addToConversation(question, fullResponse);
    } catch (err) {
      console.error("Error sending message:", err);
      clearStreamingState();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading || isProcessing) return;

    if (!isHealthy) {
      alert(
        "AI assistant is currently unavailable. Please check your API configuration."
      );
      return;
    }

    // Set streaming state in context
    setStreamingState({
      isStreaming: true,
      currentQuestion: suggestion,
      streamingResponse: "",
      pageContext,
      conversationHistory: conversationHistory,
    });
    setIsProcessing(true);

    try {
      let fullResponse = "";

      await streamMessage(suggestion, (chunk: string) => {
        fullResponse += chunk;
        updateStreamingResponse(fullResponse);
      });

      if (onResponse) {
        onResponse(suggestion, fullResponse);
      }

      // Add to conversation history
      addToConversation(suggestion, fullResponse);
    } catch (err) {
      console.error("Error sending message:", err);
      clearStreamingState();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasConversationHistory = conversationHistory.length > 0;
  const showToggleButton =
    hasConversationHistory && conversationHistory.length > 1;

  // Reset animation flag when new conversation starts
  React.useEffect(() => {
    if (conversationHistory.length > previousHistoryLengthRef.current) {
      setHasAnimated(false);
      previousHistoryLengthRef.current = conversationHistory.length;
    }
  }, [conversationHistory.length]);

  // Track when history should be visible to control animations
  React.useEffect(() => {
    if (showHistory && !hasAnimated) {
      const timer = setTimeout(
        () => setHasAnimated(true),
        conversationHistory.length * 100 + 500
      );
      return () => clearTimeout(timer);
    }
  }, [showHistory, hasAnimated, conversationHistory.length]);

  return (
    <div className="w-full rounded-[1.2vw] bg-white !px-[1.162vw] !py-[1.6vh] h-full flex flex-col">
      {/* Title - Always visible */}
      <div className="flex items-start justify-center gap-[0.619vw] !mb-[2.5vh] flex-shrink-0">
        <span className="inline-block align-middle" aria-hidden>
          <StarIcon width={28} height={28} className="!h-[3.24vh] !w-auto " />
        </span>
        <h1 className="!text-[1.62vw] !font-medium text-[#1F664B] !mb-0 ">
          {heading}
        </h1>
      </div>

      {/* Streaming Content */}
      {isStreaming || conversationHistory.length > 0 ? (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Scrollable content area with fixed height */}
          <div className="flex-1 overflow-y-auto relative min-h-0 hide-native-scrollbar">
            {/* Fade gradient overlay at top - only show when scrolled */}
            <div className="sticky top-0 h-8 bg-gradient-to-b from-white via-white to-transparent pointer-events-none z-10" />

            <div className="space-y-4 px-2 pb-4">
              {/* Previous Conversation History - Only show when toggle button is clicked */}
              {showHistory && conversationHistory.length > 0 && (
                <div className="transition-opacity duration-500 opacity-100">
                  {conversationHistory.map((item, index) => (
                    <div
                      key={`${item.timestamp}-${index}`}
                      className="space-y-3 mb-4"
                      style={{
                        animation: !hasAnimated
                          ? `fadeIn 0.5s ease-in ${index * 0.1}s both`
                          : "none",
                      }}
                    >
                      {/* Question with User Profile Picture */}
                      <div className="flex items-start gap-3 justify-end">
                        <p className="text-[#12428D] font-medium text-[0.95vw] text-right">
                          {item.question}
                        </p>
                        {/* <TypeAnimation
                          sequence={[item.question, 800]}
                          speed={50}
                          className="text-[#12428D] font-medium text-[0.95vw] text-right"
                        /> */}
                        <img
                          src={userAvatarSrc}
                          alt="User"
                          className="w-7 h-7 rounded-full flex-shrink-0"
                        />
                      </div>

                      {/* Answer with AI Icon */}

                      <div className="flex items-start gap-3">
                        <img
                          src="/icons/AIGenerate.png"
                          alt="AI"
                          className="w-6 h-6 mt-1 flex-shrink-0"
                        />
                        <div className="text-[14px] leading-6 text-black flex-1">
                          <MarkdownRenderer content={item.answer} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Toggle Button - Only show when streaming and has history */}
              {showToggleButton && (
                <div className="flex justify-center my-4">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-10 h-10 rounded-full bg-[#1F664B] hover:bg-[#15503a] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 ring-2 ring-[#1F664B] ring-opacity-30"
                    title={
                      showHistory
                        ? "Hide previous messages"
                        : "Show previous messages"
                    }
                  >
                    <ChevronUpIcon
                      className={`w-6 h-6 text-white transition-transform duration-300 ${
                        showHistory ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Current Streaming Question and Response - Fade in */}
              {isStreaming && (
                <div
                  className="space-y-3"
                  style={{
                    animation: "fadeIn 0.5s ease-in",
                  }}
                >
                  {/* Question with User Profile Picture */}
                  <div className="flex items-start gap-3 justify-end">
                    {/* <p className="text-[#12428D] font-medium text-[0.95vw] text-right">
                      {currentQuestion}
                    </p> */}
                    <TypeAnimation
                      sequence={[currentQuestion, 800, "Streaming more text…"]}
                      speed={50}
                      cursor={false}
                      className="text-[#12428D] font-medium text-[0.95vw] text-right"
                    />
                    <img
                      src={userAvatarSrc}
                      alt="User"
                      className="w-7 h-7 rounded-full flex-shrink-0"
                    />
                  </div>

                  {/* Streaming Response with AI Icon */}
                  {streamingResponse && (
                    <div className="flex items-start gap-3">
                      <img
                        src="/icons/AIGenerate.png"
                        alt="AI"
                        className="w-6 h-6 mt-1 flex-shrink-0"
                      />
                      <div className="text-[14px] leading-6 text-black flex-1">
                        <MarkdownRenderer content={streamingResponse} />
                      </div>
                    </div>
                  )}

                  {/* Loading indicator */}
                  {isLoading && !streamingResponse && (
                    <div className="flex items-center gap-3 pl-9">
                      <span className="text-emerald-800 text-sm animate-pulse">
                        Thinking...
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Most Recent Conversation - Show when not streaming and history is hidden */}
              {!isStreaming &&
                !showHistory &&
                conversationHistory.length > 0 && (
                  <div className="space-y-3">
                    {(() => {
                      const lastItem =
                        conversationHistory[conversationHistory.length - 1];
                      return (
                        <>
                          {/* Question with User Profile Picture */}
                          <div className="flex items-start gap-3 justify-end">
                            <p className="text-[#12428D] font-medium text-[0.95vw] text-right">
                              {lastItem.question}
                            </p>
                            <img
                              src={userAvatarSrc}
                              alt="User"
                              className="w-7 h-7 rounded-full flex-shrink-0"
                            />
                          </div>

                          {/* Answer with AI Icon */}
                          <div className="flex items-start gap-3">
                            <img
                              src="/icons/AIGenerate.png"
                              alt="AI"
                              className="w-6 h-6 mt-1 flex-shrink-0"
                            />
                            <div className="text-[14px] leading-6 text-black flex-1">
                              <MarkdownRenderer content={lastItem.answer} />
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Subheadings */}
          <div className="!mb-[2.5vh] flex-shrink-0">
            <p className="text-center text-[1.010vw] text-black font-semibold h-[3.7vh] !mb-0 ">
              {subheadingTop}
            </p>
            <p className="text-center text-[#18181C] !font-normal text-[1.010vw] leading-[2vh] h-[2.22vh] !mb-0">
              {subheadingBottom}
            </p>
          </div>

          {/* API Health Warning */}
          {!isHealthy && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3 flex-shrink-0">
              <p className="text-xs text-yellow-800 text-center">
                ⚠️ AI assistant unavailable
              </p>
            </div>
          )}

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Suggestions */}
            <div className="flex flex-col gap-[1.48vh]">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="cursor-pointer w-full !rounded-[0.505vw] min-h-[5vh] !border !border-[#12428D] !bg-white !px-[0.45vw] !py-[0.72vh] font-semibold !text-[#12428D]  hover:!bg-[#12428D] hover:!text-white  text-center !transition-colors !duration-300 !ease-in-out !outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleSuggestionClick(s)}
                  disabled={isLoading || isProcessing || !isHealthy}
                >
                  <span className="inline-block  !text-[0.808vw] !leading-[1.6vh] mx-auto max-w-[17.1vw]">
                    "{s}"
                  </span>
                </button>
              ))}
            </div>

            {/* Blob Video */}
            <div className="!py-[1.6vh] flex justify-center items-center ">
              <span
                onClick={() => navigateToTab("assistant")}
                className="cursor-pointer"
              >
                <AIBlobVideo />
              </span>
            </div>

            {/* Loading indicator */}
            {(isLoading || isProcessing) && !isStreaming && (
              <div className="text-center py-2">
                <span className="text-emerald-800 text-sm animate-pulse">
                  Processing your request...
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Box - Always at bottom */}
      <div className="flex-shrink-0 relative !mb-[1.8vh] !mt-[1.6vh]">
        <input
          placeholder="Ask me anything"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || isProcessing || !isHealthy}
          className="!rounded-[0.505vw] border !pl-[1vw] !pr-[0.404vw]  w-full h-[4.907vh] !text-[0.808vw] !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-[0.926vh] rounded-[0.5vw] !bg-white !outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          onClick={() => handleSend()}
          disabled={isLoading || isProcessing || !value.trim() || !isHealthy}
        >
          <SendIcon className="!h-[2.870vh] !w-auto" />
        </button>
      </div>
    </div>
  );
}
