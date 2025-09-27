import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar2 from "../components/common/HealdaSidebar2";
import { LogoutIcon } from "../components/common/Icons";

export default function Profile() {
  return (
    <GreenWrapper>
      <div className="!p-6 !h-full  bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar2 activeKey="settings" />

        <div className="flex-1 flex flex-col gap-0">
          <WelcomeCard
            name="Proflie"
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)] flex-shrink-0"
          />

          <div className="grid grid-cols-1 gap-5 items-stretch flex-1 !relative !pt-10 overflow-y-auto !pb-40 !bt-5">
            <div className="!mx-auto  !max-w-[360px] !text-center ">
              <div className="flex flex-col items-center ">
                <img
                  src="/images/dp.png"
                  alt="dp"
                  className="!w-40 h-auto rounded-full "
                />

                <h4 className="text-black !text-3xl font-normal !mt-1.5 !mb-2 ">
                  Mayowa Oladunjoye
                </h4>
                <h4 className="text-black !text-3xl font-normal !mt-1.5 !mb-3 ">
                  CEO
                </h4>

                <p className="!text-lg !font-light !mb-8 ">
                  mayowa.adeoye@reddington.com
                </p>

                <div className="w-[256px] ">
                  <button className="!border !border-[#1F664B] !bg-inherit w-full !h-12 !outline-none !mb-4 flex items-center justify-center">
                    <span className="text-[#1F664B]">Change Password</span>
                  </button>

                  <button className="!border !border-[#12428D] !bg-inherit w-full !h-12 !outline-none !mb-4 flex items-center justify-center">
                    <span className="text-[#12428D] flex gap-2 justify-center ">
                      <LogoutIcon /> Log out
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#103B2B] !absolute bottom-12 right-16 !py-4 !px-4">
            Last login: 1st August 2025 16:43hrs
          </p>
        </div>
      </div>
    </GreenWrapper>
  );
}
