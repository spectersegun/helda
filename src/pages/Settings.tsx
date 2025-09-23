import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar from "../components/common/HeldaSidebar";

export default function Settings() {
  return (
    <GreenWrapper>
      <div className="!p-6 !h-full  bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar activeKey="assistant" />

        <div className="flex-1">
          <WelcomeCard
            name="Settings"
            subtitle="“Your AI partner for instant answers and insights — helping you make faster, smarter healthcare decisions.”"
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>
    </GreenWrapper>
  );
}
