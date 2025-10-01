import PricingIntelCard from "../components/common/PricingIntelCard";
import RevenuePerformanceCard from "../components/common/RevenuePerformanceCard";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-5 items-stretch flex-1 !relative mt-5 overflow-y-auto !pb-40 !bt-5 hide-native-scrollbar ">
      <div className="grid grid-cols-3 gap-x-7">
        <PricingIntelCard />
        <RevenuePerformanceCard />
        <PricingIntelCard />
      </div>

      <div className="grid grid-cols-3 gap-x-7">
        <PricingIntelCard />
        <PricingIntelCard />
        <PricingIntelCard />
      </div>
    </div>
  );
}
