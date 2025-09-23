import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar from "../components/common/HeldaSidebar";

export default function Dashboard2() {
  return (
    <GreenWrapper>
      <div className="!p-6 !h-full  bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar activeKey="home" />

        <div className="flex-1">
          <WelcomeCard
            name="Welcome Mayowa"
            subtitle="Your intelligent hub for patient trends, service pricing and revenue performance"
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>
    </GreenWrapper>
  );
}
