import { LogoutIcon } from "../components/common/Icons";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <>
      <div className=" h-full flex-1  rounded-[18px] !pt-4 lg:!pt-5 2xl:!pt-6">
        <div className="grid grid-cols-1 gap-5 items-stretch  !relative !pt-8 overflow-y-auto !pb-40 hide-native-scrollbar h-full flex-1  bg-white 2xl:rounded-[20px]   ">
          <div className="!mx-auto  !max-w-[360px] !text-center ">
            <div className="flex flex-col items-center ">
              <img
                src="/images/dp.png"
                alt="dp"
                className="!w-32 h-auto rounded-full "
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
                <button
                  className="!border !border-[#1F664B] !bg-inherit w-full !h-12 !outline-none !mb-4 flex items-center justify-center"
                  disabled
                >
                  <span className="text-[#1F664B]">Change Password</span>
                </button>

                <button
                  className="!border !border-[#12428D] !bg-inherit w-full !h-12 !outline-none !mb-4 flex items-center justify-center"
                  onClick={() => logout()}
                >
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
    </>
  );
}
