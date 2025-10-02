import { useState } from "react";
import LinedHHeaders from "../components/common/LinedHHeaders";
import Toggle from "../components/common/Toggle";

export default function Settings() {
  const [on, setOn] = useState(true);

  return (
    <div className="grid grid-cols-2 gap-5 items-stretch flex-1 !relative !pt-10 overflow-y-auto !pb-40 !bt-5 bg-white hide-native-scrollbar mt-5 rounded-[20px] ">
      <div className="col-span-1">
        <LinedHHeaders text="Account Settings" headerClassName="!mb-5" />

        <div className="flex justify-center items-center gap-3 mb-3">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
            htmlFor="Notifications"
          >
            Notifications
          </label>

          <Toggle checked={on} onChange={setOn} trackOn="#174191" />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
            htmlFor="Notifications"
          >
            AI Assistant updates
          </label>

          <Toggle checked={on} onChange={setOn} trackOn="#174191" />
        </div>
      </div>
      <div className="col-span-1">
        <LinedHHeaders text="Dashboard Customization"  />

        <div className="flex justify-center items-center gap-3 mb-3">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
            htmlFor="Notifications"
          >
            Show/Hide Info Cards
          </label>

          <Toggle checked={on} onChange={setOn} trackOn="#174191" />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label
            className="!text-base font-medium text-black w-[190px] !text-center"
            htmlFor="Notifications"
          >
            Disable Animations
          </label>

          <Toggle checked={on} onChange={setOn} trackOn="#174191" />
        </div>
      </div>
    </div>
  );
}
