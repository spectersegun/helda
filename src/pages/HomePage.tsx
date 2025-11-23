import AIBlobVideo from "../components/common/AIBlob";
import PatientIntelligenceCard from "../components/common/PatientIntelligenceCard";
import PricingIntelCard from "../components/common/PricingIntelCard";
import RevenuePerformanceCard from "../components/common/RevenuePerformanceCard";
import UIHomeCard from "../components/common/UIHomeCard";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "../contexts/NavigationContext";
import AIUnderText from "../components/common/AIUnderText";
// import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const aiItems = [
  {
    text: "“What are the top 3 services",
    subText: "driving revenue this month?”",
  },
  {
    text: "“What are the top 3 locations",
    subText: "driving revenue this month”",
  },
  {
    text: "“Show me the new vs returning",
    subText: "patient trends for Q2.”",
  },
  {
    text: "“Which services need pricing",
    subText: "adjustments based on ",
  },
];

export default function HomePage() {
  const { navigateToTab } = useNavigation();
  const { user } = useAuth();

  console.log({ user });

  const UserText = {
    Descriptions: {
      pricingIntelligence:
        user?.sector == "hospital"
          ? "Pricing Intelligence shows how your service prices trend over time and compare to the market. It helps identify under- or overpricing, enabling smarter decisions to boost revenue and patient satisfaction."
          : user?.sector == "dentist"
          ? "Pricing Intelligence shows how your treatment fees trend over time and compare to local practices. It helps identify under- or overpricing, enabling smarter decisions to boost revenue and patient satisfaction"
          : user?.sector == "pharmacy"
          ? "Pricing Intelligence shows how your drug prices trend over time and compare to the local market. It helps identify under- or overpricing, enabling smarter purchasing, stocking, and customer satisfaction."
          : "Pricing Intelligence shows how your service prices trend over time and compare to the market. It helps identify under- or overpricing, enabling smarter decisions to boost revenue and patient satisfaction.",
      revenueIntelligence:
        user?.sector == "hospital"
          ? "Revenue Performance tracks your income by service, department, or payer — helping you quickly spot growth opportunities and underperforming areas."
          : user?.sector == "dentist"
          ? "Revenue Performance tracks your income by treatment type, provider, or payer — helping you quickly spot growth opportunities and underperforming services."
          : user?.sector == "pharmacy"
          ? "Revenue Performance tracks your income by drug category, prescription vs. OTC sales, or payer — helping you quickly spot growth opportunities and underperforming products."
          : "Revenue Performance tracks your income by service, department, or payer — helping you quickly spot growth opportunities and underperforming areas.",
      patientIntelligence:
        user?.sector == "hospital"
          ? "Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, churn, and revenue impact to better tailor care and engagement."
          : user?.sector == "dentist"
          ? "Patient Intelligence reveals patterns in new, repeat, and loyalty-program customers — helping you monitor adherence, retention, and revenue impact to better tailor services."
          : user?.sector == "pharmacy"
          ? "Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, missed appointments, and revenue impact to better tailor care and engagement."
          : "Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, churn, and revenue impact to better tailor care and engagement.",
    },

    HomeCard: [
      {
        title: "Patient Volume vs Revenue",
        positive:
          user?.sector == "hospital"
            ? "Diabetes Checkups grew 30%"
            : user?.sector == "dentist"
            ? "Teeth Cleaning appointments grew 30%"
            : user?.sector == "pharmacy"
            ? "Prescription refill volume grew 30%"
            : "Diabetes Checkups grew 30%",
        nagative:
          user?.sector == "hospital"
            ? "but total revenue declined — revisit pricing"
            : user?.sector == "dentist"
            ? "but total revenue declined — revisit pricing or upsell opportunities."
            : user?.sector == "pharmacy"
            ? " but overall revenue declined — revisit pricing or upsell OTC opportunities."
            : "but total revenue declined — revisit pricing",
        positiveArrow: true,
        negativeArrow: true,
      },
      {
        title: "Pricing vs Patient",
        positive:
          user?.sector == "hospital"
            ? "Charges for Spinal Surgery rose 20%"
            : user?.sector == "dentist"
            ? "Charges for Root Canal Therapy rose 20%,"
            : user?.sector == "pharmacy"
            ? "Charges for Branded Pain Medication rose 20%"
            : "Charges for Spinal Surgery rose 20%",
        nagative:
          user?.sector == "hospital"
            ? "Patient visits dropped 12%"
            : user?.sector == "dentist"
            ? "Patient visits dropped 12%"
            : user?.sector == "pharmacy"
            ? "Patient purchases dropped 12%."
            : "Patient visits dropped 12%",
        positiveArrow: true,
        negativeArrow: true,
      },
      {
        title: "Underutilised High-Charge Services",
        positive:
          user?.sector == "hospital"
            ? "Charges for Spinal Surgery rose 20%"
            : user?.sector == "dentist"
            ? "Dental Implants have the highest charge"
            : user?.sector == "pharmacy"
            ? "Biologics have the highest margin"
            : "Charges for Spinal Surgery rose 20%",
        nagative:
          user?.sector == "hospital"
            ? "but only 3 visits this month”"
            : user?.sector == "dentist"
            ? "but only 3 procedures this month."
            : user?.sector == "pharmacy"
            ? "but only 3 fills this month."
            : "but only 3 visits this month”",
        positiveArrow: true,
        negativeArrow: true,
      },
      {
        title: "Payer Mix vs Profitability",
        positive:
          user?.sector == "hospital"
            ? "Charges for Spinal Surgery rose 20%"
            : user?.sector == "dentist"
            ? "Cosmetic Dentistry has the highest average charge"
            : user?.sector == "pharmacy"
            ? "Chronic Care Prescriptions have the highest average charge"
            : "Charges for Spinal Surgery rose 20%",
        nagative:
          user?.sector == "hospital"
            ? "but 60% covered by lowest reimbursing payer”"
            : user?.sector == "dentist"
            ? "but 60% of cases covered by lowest reimbursing payer."
            : user?.sector == "pharmacy"
            ? "but 60% covered by lowest reimbursing insurer."
            : "but 60% covered by lowest reimbursing payer”",
        positiveArrow: true,
        negativeArrow: true,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-[2.4vh] items-stretch flex-1 !relative overflow-y-auto hide-native-scrollbar !p-2 !pt-[2.5vh] ">
      <div className="grid grid-cols-3 gap-x-[2vw] ">
        <PricingIntelCard
          description={UserText?.Descriptions?.pricingIntelligence}
        />
        <RevenuePerformanceCard
          description={UserText?.Descriptions?.revenueIntelligence}
        />
        <PatientIntelligenceCard
          description={UserText?.Descriptions?.patientIntelligence}
        />
      </div>

      <div className="grid grid-cols-3 gap-x-[2vw]">
        <div
          className="z-20 bg-white rounded-[1vw] !p-[0.93vh] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] cursor-pointer transition-shadow duration-300 ease-in-out opacity-0 animate-[fadeInBottom_0.6s_ease-out_forwards_0.3s]  "
          onClick={() => navigateToTab("assistant")}
        >
          <h2
            className="text-[#1F664B] !text-[1.62vw] text-center text-medium mb=[1.11vw] fall-in"
            style={{ "--fall-distance": "-20px" } as React.CSSProperties}
          >
            Helda AI Assistant
          </h2>

          <AIBlobVideo delay={0.6} />

          <div className="grid grid-cols-2 gap-x-[1.2vw] g-y-[1.11vh]">
            {aiItems.map((item, index) => (
              <AIUnderText
                key={index}
                text={item.text}
                subText={item.subText}
                className="fall-in"
                style={{ "--fall-distance": "0px" } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <div>
            <div className="relative flex justify-center items-center h-[5vh] opacity-0 animate-[fadeInRight_0.6s_ease-out_forwards_0.3s]  duration-300 ">
              <span className="absolute w-full !border-t !border-[#BAB6B6] "></span>
              <h3
                className={`relative z-10 !text-[1.2vw] !font-semibold w-[22vw] h-full !border flex items-center justify-center !border-[#BAB6B6] rounded-lg !text-center leading-6 !mb-0 bg-white `}
              >
                <span className="fall-in">Unified Intelligence</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-[2.222vw] gap-y-[2.963vh] !mt-[2.9vh] opacity-0 animate-[fadeInRight_0.6s_ease-out_forwards_0.3s] ">
            {UserText.HomeCard?.map((carddetails, index) => (
              <UIHomeCard {...carddetails} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
    // </HomeEnterOrchestrator>
  );
}
