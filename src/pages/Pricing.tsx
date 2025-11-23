import HeldaAssistantCard from "../components/common/HeldaAssistantCard";
import MiniHeader from "../components/common/MiniHeader";
import MarketBenchmarkingChart from "../components/MarketBenchmarkingChart";
import MonthlyAverageChargeChart from "../components/MonthlyAverageChargeChart";
import { useChatHistory } from "../contexts/ChatHistoryContext";

export default function Pricing() {
  const { addToHistory } = useChatHistory();

  const handleAIResponse = (question: string, response: string) => {
    // Save to global history
    addToHistory(question, response, "pricing");
  };

  const pricingSuggestions = [
    "What are the most expensive services offered?",
    "Compare our pricing to market benchmarks.",
    "Which diagnoses have the highest variability in charges?",
  ];

  return (
    <div className="grid grid-cols-1 gap-[1.212vw] flex-1 !relative overflow-hidden !pt-[2.5vh] h-full">
      <div className="grid grid-cols-3 gap-x-7 h-full items-stretch">
        <div>
          <div className="gap-[2.4vw] !text-center grid grid-cols-2">
            <div className="!p-[0.74vh] bg-white rounded-[1vw] h-[13.9vh] ">
              <MiniHeader className="!max-w-[8.586vw] ">
                Most expensive diagnosis
              </MiniHeader>
              <h4 className="text-[#1F664B] !mb-[0.74vh] !font-normal !text-[1.2vw] ">
                Melanoma
              </h4>
              <h3 className="!text-[1.57vw] leading-[1.57vw] !font-semibold text-[#1F664B] !mb-0 ">
                ₦400,000
              </h3>
            </div>

            <div className="!p-[0.74vh] bg-white rounded-[1vw] h-[13.9vh] ">
              <MiniHeader>Most Variable Pricing Diagnosis</MiniHeader>
              <h4 className="text-[#1F664B] !mb-[0.74vh] !font-normal !text-[1.2vw] ">
                Liver Cancer
              </h4>
              <h3 className="!text-[1.57vw] leading-[1.57vw] !font-semibold text-[#1F664B] flex items-center justify-center gap-1 !mb-0 ">
                <span>
                  <img
                    src="/icons/liverCancerIcon.svg"
                    className="w-[1.36vw] !h-auto"
                    alt="Liver Cancer"
                  />
                </span>
                ₦560,000
              </h3>
            </div>
          </div>

          <div className="!mt-[1.852vh]">
            <MonthlyAverageChargeChart />
          </div>
        </div>

        <div>
          <div className="!py-[0.74vh] bg-white rounded-[1vw] h-[13.9vh] ">
            <h4 className="text-center text-black !text-[1vw] !font-semibold !mb-[0.74vh] leading-[1.2vw] ">
              Top 5 Diagnosis by Volume
            </h4>

            <div className="!mx-auto !max-w-[17.77vw]">
              <ul className="!mb-0 !pb-0 font-semibold">
                {[
                  { id: 1, name: "Routine Check-up", volume: 214 },
                  { id: 2, name: "Diabetes Monitoring", volume: 189 },
                  { id: 3, name: "Hypertension Screening", volume: 176 },
                  { id: 4, name: "Flu Test", volume: 165 },
                  { id: 5, name: "General Consultation", volume: 152 },
                ].map((item) => (
                  <li
                    key={item.id}
                    className="!mb-0 !text-[0.85vw] leading-[1.05vw] text-[#1F664B] "
                  >
                    <span className="w-min-[11vw] inline-block">
                      {item.id}. {item.name} &#45;{" "}
                    </span>
                    <span>{item.volume}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="!mt-[1.852vh] ">
            <MarketBenchmarkingChart />
          </div>
        </div>

        <div>
          <HeldaAssistantCard
            heading="Helda AI Assistant"
            subheadingTop="Ask about Pricing Intelligence"
            subheadingBottom="How can I assist you?"
            suggestions={pricingSuggestions}
            onResponse={handleAIResponse}
            pageContext="pricing"
            userAvatarSrc="/images/dp.png"
          />
        </div>
      </div>
    </div>
  );
}
