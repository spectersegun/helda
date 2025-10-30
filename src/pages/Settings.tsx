import { useState } from "react";
import LinedHHeaders from "../components/common/LinedHHeaders";
import Toggle from "../components/common/Toggle";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [aiUpdates, setAiUpdates] = useState(true);
  const [showInfoCards, setShowInfoCards] = useState(true);
  const [disableAnimations, setDisableAnimations] = useState(true);

  return (
    <div className="flex-1 !relative overflow-y-auto !pt-[2.7vh] h-full ">
      <div className="grid grid-cols-2 gap-[1vw] bg-white hide-native-scrollbar rounded-[1vw] justify-center !pt-[8.5vh] !h-full ">
        <div className="col-span-1 max-w[32.6vw] ">
          <div className="flex flex-col items-center">
            <LinedHHeaders text="Account Settings" />

            <div className="!space-y-[1.48vh] w-[19.5vw] max-w-[19.5vw] mx-auto ">
              <div className="flex justify-center items-center gap-[1.5vw]  !mt-[1.85vh] ">
                <label
                  className="text-[1.01vw] font-medium text-black  !text-left w-[9.8vw]"
                  htmlFor="Notifications"
                >
                  Notifications
                </label>

                <Toggle
                  checked={notifications}
                  onChange={setNotifications}
                  trackOn="#174191"
                />
              </div>

              <div className="flex justify-center items-center gap-[1.5vw]">
                <label
                  className="text-[1.01vw] font-medium text-black !text-left w-[9.8vw] "
                  htmlFor="Notifications"
                >
                  AI Assistant updates
                </label>

                <Toggle
                  checked={aiUpdates}
                  onChange={setAiUpdates}
                  trackOn="#174191"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center">
          <LinedHHeaders text="Dashboard Customization" />

          <div className="!space-y-[1.48vh] max-w-[19.5vw] mx-auto">
            <div className="flex justify-center items-center gap-[1.5vw] !mt-[1.85vh] ">
              <label
                className="text-[1.01vw] font-medium text-black !text-left w-[9.8vw]"
                htmlFor="Notifications"
              >
                Show/Hide Info Cards
              </label>

              <Toggle
                checked={showInfoCards}
                onChange={setShowInfoCards}
                trackOn="#174191"
              />
            </div>

            <div className="flex justify-center items-center gap-[1.5vw]">
              <label
                className="text-[1.01vw] font-medium text-black !text-left w-[9.8vw]"
                htmlFor="Notifications"
              >
                Disable Animations
              </label>

              <div className="w-[7.58vw]">
                <Toggle
                  checked={disableAnimations}
                  onChange={setDisableAnimations}
                  trackOn="#174191"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 self-baseline flex justify-center items-center flex-col ">
          <LinedHHeaders text="Support" />

          <div className="max-w-[15vw] w-full ">
            <button className="border-[0.051vw] !border-[#1F664B] !bg-inherit w-full !h-[6.29vh] !outline-none flex items-center justify-center relative !rounded-[0.8vw] !mt-[5.83vh]">
              <span className="absolute left-[0.657vw] ">
                <img
                  src="/images/customercare.png"
                  alt="support"
                  className="!w-auto !h-[5.09vh] "
                />
              </span>
              <span className="text-[#1F664B] font-semibold !text-[1vw] ">
                Contact us{" "}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
