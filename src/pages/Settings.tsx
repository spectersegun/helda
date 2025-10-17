import { useState } from "react";
import LinedHHeaders from "../components/common/LinedHHeaders";
import Toggle from "../components/common/Toggle";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [aiUpdates, setAiUpdates] = useState(true);
  const [showInfoCards, setShowInfoCards] = useState(true);
  const [disableAnimations, setDisableAnimations] = useState(true);

  return (
    <div className="grid grid-cols-2 gap-5 items-stretch flex-1 !relative !pt-10 overflow-y-auto !pb-20 bg-white hide-native-scrollbar mt-5 rounded-[20px] justify-center ">
      <div className="col-span-1">
        <LinedHHeaders text="Account Settings" />

        <div className="flex justify-center items-center gap-3 mb-3 !mt-6">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
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

        <div className="flex justify-center items-center gap-3">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
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
      <div className="col-span-1">
        <LinedHHeaders text="Dashboard Customization" />

        <div className="flex justify-center items-center gap-3 mb-3 !mt-6">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
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

        <div className="flex justify-center items-center gap-3">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
            htmlFor="Notifications"
          >
            Disable Animations
          </label>

          <Toggle
            checked={disableAnimations}
            onChange={setDisableAnimations}
            trackOn="#174191"
          />
        </div>
      </div>

      <div className="col-span-2 flex justify-center items-center flex-col !mt-16 ">
        <LinedHHeaders text="Support" />

        <div className="max-w-[200px] w-full ">
          <button className="!border !border-[#1F664B] !bg-inherit w-full !h-12 !outline-none !mb-4 flex items-center justify-center relative !rounded-[12px] !mt-10 ">
            <span className="absolute left-1.5">
              <img
                src="/images/customercare.png"
                alt="support"
                className="!w-8 !h-auto"
              />
            </span>
            <span className="text-[#1F664B]">Contact us </span>
          </button>
        </div>
      </div>
    </div>
  );
}
