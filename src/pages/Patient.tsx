import HeldaAssistantCard from "../components/common/HeldaAssistantCard";
import MiniHeader from "../components/common/MiniHeader";
import MonthlyRevenueDonut from "../components/common/MonthlyRevenueDonut";
import PatientRetentionChart from "../components/common/PatientRetentionChart";
import MarketBenchmarkingChart from "../components/MarketBenchmarkingChart";

export default function Patient() {
  return (
    <div className="grid grid-cols-1 gap-5 items-stretch flex-1 !relative !pt-8 overflow-y-auto !pb-40">
      <div className="grid grid-cols-3 gap-x-7 ">
        <div>
          <div className="flex gap-10 !text-center justify-between">
            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px] flex flex-col justify-between">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Total Patients Seen
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 ">
                  8,213
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-[15px] !mb-0">
                <span>▲ </span>4.1% increase from previous month
              </h6>
            </div>

            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px]  flex flex-col justify-between">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  New Patients This Month
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 ">
                  2,731
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-[15px] !mb-0">
                33% of total visits — key for acquisition tracking
              </h6>
            </div>
          </div>

          <div className="!mt-5">
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
          <div className="flex gap-10 !text-center justify-between">
            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px] flex flex-col justify-between ">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Patient Mix
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 flex items-center justify-center gap-2">
                  <img
                    src="/icons/mix1.png"
                    alt="mix 1"
                    className="w-5 h-auto"
                  />
                  54%
                </h3>
                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 flex items-center justify-center gap-2 ">
                  <img
                    src="/icons/mix2.png"
                    alt="mix 2"
                    className="w-5 h-auto"
                  />
                  46%
                </h3>
              </div>

              <h6 className="text-[#1F664B] leading-4.5  !font-normal !text-[15px] !mb-0">
                Based on this quarter&#39;s visit data
              </h6>
            </div>

            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px] flex flex-col justify-between ">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Top Postal Code
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-1.5 ">
                  9% from
                </h3>
                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-1.5 ">
                  101241
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-[15px] !mb-0 items-stretch pb-1">
                Victoria Island
              </h6>
            </div>
          </div>

          <div className="!mt-5">
            <MonthlyRevenueDonut total={10343} />
          </div>
          <div className="!mt-3">
            <PatientRetentionChart />
          </div>
        </div>

        <div>
          <HeldaAssistantCard onSend={(q) => console.log(q)} />
        </div>
      </div>
    </div>
  );
}
