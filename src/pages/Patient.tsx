import HeldaAssistantCard from "../components/common/HeldaAssistantCard";
import MiniHeader from "../components/common/MiniHeader";
import MonthlyRevenueDonut from "../components/common/MonthlyRevenueDonut";
import PatientRetentionChart from "../components/common/PatientRetentionChart";
import MarketBenchmarkingChart from "../components/MarketBenchmarkingChart";

export default function Patient() {
  return (
    <div className="grid grid-cols-1 gap-5 items-stretch flex-1 !relative !pt-10 overflow-y-auto !pb-40 !bt-5">
      <div className="grid grid-cols-3 gap-x-7 ">
        <div>
          <div className="flex gap-10 !text-center justify-between">
            <div className="!p-2 bg-white rounded-[20px] w-[220px] ">
              <MiniHeader>Most Variable Pricing Diagnosis</MiniHeader>
              <h4 className="text-[#1F664B] !mb-2 !font-normal !text-xl ">
                Melanoma
              </h4>
              <h3 className="!text-2xl !font-semibold text-[#1F664B] ">
                ₦400,000
              </h3>
            </div>

            <div className="!p-2 bg-white rounded-[20px] w-[220px] ">
              {/* <h5 className="text-black !text-lg !font-semibold !mb-1.5  leading-6 max-w-[170px] !mx-auto text-center ">
                Most Variable Pricing Diagnosis
              </h5> */}
              <MiniHeader>Most Variable Pricing Diagnosis</MiniHeader>
              <h4 className="text-[#1F664B] !mb-2 !font-normal !text-xl ">
                Liver Cancer
              </h4>
              <h3 className="!text-2xl !font-semibold text-[#1F664B] flex items-center justify-center gap-1 ">
                <span>
                  <img
                    src="/icons/liverCancerIcon.png"
                    className="w-6 !h-auto"
                    alt="Liver Cancer"
                  />
                </span>
                ₦560,000
              </h3>
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
          <div className="!p-2 bg-white rounded-[20px]  mx-auto">
            <h4 className="text-center text-black !text-lg !font-semibold !mb-1.5  leading-6  ">
              Top 5 Diagnosis by Volume
            </h4>
            <div className="flex gap-1 !mx-auto max-w-[280px]  w-full ">
              <div className="grid grid-cols-1 text-[#1F664B] !text-sm !font-medium !leading-4">
                <ul className="!mb-0 !pb-1">
                  <li className="!mb-0 !text-sm leading-5">
                    <span className="w-[200px] inline-block ">
                      1. Routine Check-up –{" "}
                    </span>
                    <span>214</span>
                  </li>
                  <li className="!mb-0 !text-sm leading-5">
                    <span className="w-[200px] inline-block">
                      2. Diabetes Monitoring –{" "}
                    </span>
                    <span>189</span>
                  </li>
                  <li className="!mb-0 !text-sm leading-5">
                    <span className="w-[200px] inline-block">
                      3. Hypertension Screening –{" "}
                    </span>
                    <span>176</span>
                  </li>
                  <li className="!mb-0 !text-sm leading-5">
                    <span className="w-[200px] inline-block">
                      4. Flu Test –{" "}
                    </span>
                    <span>165</span>
                  </li>
                  <li className="!mb-0 !text-sm leading-5 ">
                    <span className="w-[200px] inline-block">
                      5. General Consultation –{" "}
                    </span>
                    <span>152</span>
                  </li>
                </ul>
              </div>
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
