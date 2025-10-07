import DepartmentGapsVsTargetChart from "../components/common/DepartmentGapsVsTargetChart";
import HeldaAssistantCard from "../components/common/HeldaAssistantCard";
import MiniHeader from "../components/common/MiniHeader";
import MonthlyRevenueDonut2 from "../components/common/MonthlyRevenueDonut2";
import RevenueOverTimeCard from "../components/common/RevenueOverTimeCard";

export default function Revenue() {
  return (
    <div className="grid grid-cols-1 gap-5 items-stretch flex-1 !relative !pt-10 overflow-y-auto !pb-40 !bt-5">
      <div className="grid grid-cols-3 gap-x-7 ">
        <div>
          <div className="flex gap-10 !text-center justify-between">
            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px] flex flex-col justify-between">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Total Monthly Billed Revenue
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 !mt-0.5">
                  ₦2.3M
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-xs !mb-1">
                Up <span>▲</span> 6.2% from last month
              </h6>
            </div>

            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px]  flex flex-col justify-between">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Highest Revenue Generator
                </MiniHeader>

                <h3 className="!text-xl !font-semibold text-[#1F664B] !mb-0 ">
                  Cardiology
                </h3>
              </div>

              <small className="text-[#1F664B] inline-block !font-normal !text-xs !mb-0">
                22% of total hospital income
              </small>

              <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 ">
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
          <div className="flex gap-10 !text-center justify-between">
            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px] flex flex-col justify-between ">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Revenue per Encounter
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 !mt-0.5">
                  ₦556,000
                </h3>
              </div>

              <h6 className="text-[#1F664B] leading-4.5  !font-normal !text-xs !mb-0 !pb-1">
                Based on 6,781 patient visits
              </h6>
            </div>

            <div className="!p-2 bg-white rounded-[20px] w-[220px] h-[150px] flex flex-col justify-between ">
              <div>
                <MiniHeader className="!max-w-[150px] !mx-auto">
                  Avg. Days to Payment
                </MiniHeader>

                <h3 className="!text-2xl !font-semibold text-[#1F664B] !mb-0 !mt-0.5">
                  37 Days
                </h3>
              </div>

              <h6 className="text-[#1F664B]  !font-normal !text-xs !mb-0 !pb-1">
                Up 5 days vs. benchmark
              </h6>
            </div>
          </div>

          <div className="!mt-5">
            <RevenueOverTimeCard />
          </div>
        </div>

        <div>
          <HeldaAssistantCard onSend={(q) => console.log(q)} />
        </div>
      </div>
    </div>
  );
}
