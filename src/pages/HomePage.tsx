import AIUnderText from "../components/common/AIUnderText";
import PatientIntelligenceCard from "../components/common/PatientIntelligenceCard";
import PricingIntelCard from "../components/common/PricingIntelCard";
import RevenuePerformanceCard from "../components/common/RevenuePerformanceCard";
import UIHomeCard from "../components/common/UIHomeCard";
import { useNavigation } from "../contexts/NavigationContext";

export default function HomePage() {
  const { navigateToTab } = useNavigation();

  return (
    <div className="grid grid-cols-1 gap-6 items-stretch flex-1 !relative mt-5 overflow-y-auto !pb-10 !bt-5 hide-native-scrollbar !p-2 ">
      <div className="grid grid-cols-3 gap-x-7 ">
        <PricingIntelCard />
        <RevenuePerformanceCard />
        <PatientIntelligenceCard />
      </div>

      <div className="grid grid-cols-3 gap-x-7">
        <div
          className="bg-white rounded-[18px] !p-2.5 hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] cursor-pointer transition-shadow duration-300 ease-in-out"
          onClick={() => navigateToTab("assistant")}
        >
          <h2 className="text-[#1F664B] !text-2xl text-center text-medium ">
            Helda AI Assistant
          </h2>
          <img
            src="/images/AINEW.png"
            alt="AINEW"
            className="max-w-full w-[210px] height-auto !mx-auto !mt-7 !mb-6"
          />

          <div className="grid grid-cols-2 gap-4">
            <AIUnderText
              text="“What are the top 3 services"
              subText="driving revenue this month?”"
            />

            <AIUnderText
              text="“What are the top 3 services "
              subText="driving revenue this month?”"
            />

            <AIUnderText
              text="“Show me the new vs returning"
              subText="patient trends for Q2.”"
            />

            <AIUnderText
              text="“Which services need pricing"
              subText="adjustments based on "
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <div className="relative flex justify-center items-center">
              <span className="absolute w-full !border-t !border-[#BAB6B6]"></span>
              <h3
                className={`relative z-10 !text-lg !font-semibold !p-2.5 min-w-[340px] !border !border-[#BAB6B6] rounded-lg !text-center leading-6 !mb-0 bg-white `}
              >
                Unified Intelligence
              </h3>
              {/* <span className="w-[80px] !border-t !border-[#BAB6B6]"></span> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 !mt-7 ">
            <UIHomeCard
              title="Patient Volume vs Revenue"
              subtitle="Diabetes Checkups grew 30%"
              trend="but total revenue declined — revisit pricing"
            />

            <UIHomeCard
              title="Pricing vs Patient "
              subtitle="Charges for Spinal Surgery rose 20%"
              trend="but total revenue declined — revisit pricing"
            />

            <UIHomeCard
              title="Underutilised High-Charge Services"
              subtitle="Diabetes Checkups grew 30%"
              trend="but total revenue declined — revisit pricing"
            />

            <UIHomeCard
              title="Payer Mix vs Profitability"
              subtitle="Cardiology services has the highest average charge"
              trend="but total revenue declined — revisit pricing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
