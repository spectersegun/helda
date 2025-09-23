import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar from "../components/common/HeldaSidebar";

export default function Revenue() {
  return (
    <GreenWrapper>
      <div className="!p-6 !h-full  bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar activeKey="revenue" />

        <div className="flex-1">
          <WelcomeCard
            name="Revenue Performance"
            subtitle="Your financial pulseboard for tracking income by service, department, and payer spotlighting growth drivers and under performers in real time."
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>
    </GreenWrapper>
  );
}
