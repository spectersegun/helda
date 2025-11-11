import DepartmentGapsVsTargetChart from "../components/common/DepartmentGapsVsTargetChart";
import HeldaAssistantCard from "../components/common/HeldaAssistantCard";
import MiniHeader from "../components/common/MiniHeader";
import MonthlyRevenueDonut2 from "../components/common/MonthlyRevenueDonut2";
import RevenueOverTimeCard from "../components/common/RevenueOverTimeCard";
import { useChatHistory } from "../contexts/ChatHistoryContext";

export default function Revenue() {
  const { addToHistory } = useChatHistory();

  const handleAIResponse = (question: string, response: string) => {
    // Save to global history
    addToHistory(question, response, "revenue");
  };

  const revenueSuggestions = [
    "Which department contributed the most revenue this quarter?",
    "Highlight underperforming services by revenue.",
    "Compare this months revenue to the same month last year.",
  ];

  return (
    <div className="grid grid-cols-1 gap-[1.212vw] flex-1 !relative !pt-[2.5vh] overflow-hidden h-full">
      <div className="grid grid-cols-3 gap-x-7 h-full items-stretch">
        <div>
          <div className="flex gap-[1.667vw] !text-center justify-between">
            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                Total Monthly Billed Revenue
              </MiniHeader>

              <h3 className="!text-[1.515vw] !font-semibold text-[#1F664B] !mb-0">
                ₦2.3M
              </h3>

              <h6 className="text-[#1F664B]  !font-normal !text-[0.707vw] !mb-0">
                Up <span>▲</span> 6.2% from last month
              </h6>
            </div>

            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[0.8vh] bg-white rounded-[1vw] flex-1 h-[13.889vh]  flex flex-col justify-between">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                Highest Revenue Generator
              </MiniHeader>

              <div>
                <h3 className="!text-[1.212vw] !font-semibold text-[#1F664B] !mb-0 ">
                  Cardiology
                </h3>
                <h6 className="text-[#1F664B]  !font-normal !text-[0.707vw] !mb-0 ">
                  22% of total hospital income
                </h6>
              </div>

              <h3 className="!text-[1.4vw] leading-[1.5vw] !font-semibold text-[#1F664B] !mb-0 ">
                ₦1M
              </h3>
            </div>
          </div>

          <div className="!mt-5">
            <MonthlyRevenueDonut2 total={"₦2.3M"} />
          </div>
          <div className="!mt-3">
            <DepartmentGapsVsTargetChart />
          </div>
        </div>

        <div>
          <div className="flex gap-[1.667vw] !text-center justify-between">
            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between ">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                Revenue per Encounter
              </MiniHeader>

              <h3 className="!text-[1.515vw] !font-semibold text-[#1F664B] !mb-0 ">
                ₦556,000
              </h3>

              <h6 className="text-[#1F664B] leading-4.5  !font-normal !text-[0.707vw] !mb-0">
                Based on 6,781 patient visits
              </h6>
            </div>

            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                Avg. Days to Payment
              </MiniHeader>

              <h3 className="!text-[1.515vw] !font-semibold text-[#1F664B] !mb-0">
                37 Days
              </h3>

              <h6 className="text-[#1F664B]  !font-normal !text-[0.707vw] !mb-0">
                Up 5 days vs. benchmark
              </h6>
            </div>
          </div>

          <div className="!mt-5">
            <RevenueOverTimeCard />
          </div>
        </div>

        <div>
          {/* <HeldaAssistantCard
            suggestions={[
              "Which department contributed the most revenue this quarter?",
              "Highlight underperforming services by revenue.",
              "Compare this months revenue to the same month last year.",
            ]}
            subheadingTop="Ask about Revenue Data"
            onSend={(q) => console.log(q)}
          /> */}
          <HeldaAssistantCard
            heading="Helda AI Assistant"
            subheadingTop="Ask about Revenue Performance"
            subheadingBottom="How can I assist you?"
            suggestions={revenueSuggestions}
            onResponse={handleAIResponse}
            pageContext="revenue"
            userAvatarSrc="/images/dp.png"
          />
        </div>
      </div>
    </div>
  );
}
