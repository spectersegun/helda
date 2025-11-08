import HeldaAssistantCard from "../components/common/HeldaAssistantCard";
import MiniHeader from "../components/common/MiniHeader";
import MonthlyRevenueDonut from "../components/common/MonthlyRevenueDonut";
import PatientRetentionChart from "../components/common/PatientRetentionChart";
import MarketBenchmarkingChart from "../components/MarketBenchmarkingChart";

export default function Patient() {
  return (
    <div className="grid grid-cols-1 gap-[1.212vw] items-stretch flex-1 !relative !pt-[2.5vh] overflow-y-auto">
      <div className="grid grid-cols-3 gap-x-7 ">
        <div>
          <div className="flex gap-[1.667vw] !text-center justify-between">
            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                Total Patients Seen
              </MiniHeader>

              <h3 className="!text-[1.515vw] !font-semibold text-[#1F664B] !mb-0">
                8,213
              </h3>

              <h6 className="text-[#1F664B]  !font-normal !text-[0.808vw] !mb-0">
                <span>▲ </span>4.1% increase from previous month
              </h6>
            </div>

            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                New Patients This Month
              </MiniHeader>

              <h3 className="!text-[1.515vw] !font-semibold text-[#1F664B] !mb-0">
                2,731
              </h3>

              <h6 className="text-[#1F664B]  !font-normal !text-[0.808vw] !mb-0">
                33% of total visits — key for acquisition tracking
              </h6>
            </div>
          </div>

          <div className="!mt-[2.037vh]">
            <MarketBenchmarkingChart
              title="New vs Returning Patients"
              legendLabels={{
                hospital: "New Patients",
                benchmark: "Returning Patients",
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex gap-[1.667vw] !text-center justify-between">
            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between">
              <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                Patient Mix
              </MiniHeader>

              <div>
                <h3 className="!text-[1.5vw]  !font-semibold text-[#1F664B] !mb-0 flex items-center justify-center gap-2">
                  <img
                    src="/icons/mix1.png"
                    alt="mix 1"
                    className="!w-auto !h-[3.241vh] "
                  />
                  54%
                </h3>
                <h3 className="!text-[1.5vw]  !font-semibold text-[#1F664B] !mb-0 flex items-center justify-center gap-2 ">
                  <img
                    src="/icons/mix2.png"
                    alt="mix 2"
                    className="!w-auto !h-[3.241vh]"
                  />
                  46%
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-[0.808vw] !mb-0">
                Based on this quarter&#39;s visit data
              </h6>
            </div>

            <div className="!px-[0.606vw] !pt-[0.741vh] !pb-[1.111vh] bg-white rounded-[1vw] flex-1 h-[13.889vh] flex flex-col justify-between">
              <div>
                <MiniHeader className="!max-w-[7.879vw] !mx-auto">
                  Top Postal Code
                </MiniHeader>

                <h3 className="!text-[1.5vw]  !font-semibold text-[#1F664B] !mb-0 flex items-center justify-center gap-2">
                  9% from
                </h3>
                <h3 className="!text-[1.5vw]  !font-semibold text-[#1F664B] !mb-0 flex items-center justify-center gap-2">
                  101241
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-[0.808vw] !mb-0">
                Victoria Island
              </h6>
            </div>
          </div>

          <div className="!mt-5">
            <MonthlyRevenueDonut total={10343} />
          </div>
          <div className="!mt-[2.222vh] ">
            <PatientRetentionChart />
          </div>
        </div>

        <div>
          <HeldaAssistantCard
            suggestions={[
              "How many new vs. returning patients did we have last quarter?",
              "Which patient demographic brings in the most revenue?",
              "Show me the trend in patient retention over the past year.",
            ]}
            onSend={(q) => console.log(q)}
          />
        </div>
      </div>
    </div>
  );
}
