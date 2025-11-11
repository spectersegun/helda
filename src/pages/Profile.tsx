import { LogoutIcon } from "../components/common/Icons";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <>
      <div className="flex-1 !relative overflow-y-auto !pt-[2.7vh] h-full ">
        <div className="grid grid-cols-1 gap-5 items-stretch  !relative !pt-[6.574vh] overflow-y-auto hide-native-scrollbar h-full flex-1 bg-white rounded-[1vw]">
          <div className="!mx-auto  !max-w-[19vw] !text-center ">
            <div className="flex flex-col items-center ">
              <img
                src="/images/dp.png"
                alt="dp"
                className="!w-[13.6vw] h-auto rounded-full "
              />

              <h4 className="text-black !text-[2.0vw] !font-medium !mt-[0.556vh] !mb-[1.852vh] ">
                Mayowa Oladunjoye
              </h4>
              <h4 className="text-black !text-[2.0vw] !font-normal !mb-[1.852vh] ">
                CEO
              </h4>

              <p className="!text-[1vw] !font-light !mb-[2.424vw] ">
                mayowa.adeoye@reddington.com
              </p>

              {/* <div className="mx-auto "> */}
              <button
                className="!border 2xl:!border-[1.5px] !border-[#1F664B] !bg-inherit w-[15vw] !h-[5.093vh] !outline-none !mb-[1.5vh] flex items-center justify-center rounded-[0.5vw] "
                disabled
              >
                <span className="text-[#1F664B] text-[0.808vw] font-semibold ">
                  Change Password
                </span>
              </button>

              <button
                className="!border 2xl:!border-[1.5px] !border-[#12428D] !bg-inherit w-[15vw] !h-[5.093vh] !outline-none !mb-[1.5vh] flex items-center justify-center rounded-[0.5vw] "
                onClick={() => logout()}
              >
                <span className="text-[#12428D] text-[0.808vw] flex gap-2 font-normal justify-center items-center ">
                  <LogoutIcon className="!w-[1.616vw] h-auto" /> Log out
                </span>
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>

        <p className="text-[#103B2B] text-[0.808vw] font-semibold !absolute bottom-[1.040vh] right-[3.040vw] !p-[0.808vw] ">
          Last login: 1st August 2025 16:43hrs
        </p>
      </div>
    </>
  );
}
