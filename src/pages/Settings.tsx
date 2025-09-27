import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar2 from "../components/common/HealdaSidebar2";

export default function Settings() {
  return (
    <GreenWrapper>
      <div className="!p-6 !h-full  bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar2 activeKey="settings" />

        <div className="flex-1 flex flex-col gap-5 ">
          <WelcomeCard
            name="Settings"
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
          />

          <div className="grid grid-cols-2 gap-5 items-stretch flex-1 !relative !pt-10 justify-center ">
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </GreenWrapper>
  );
}
