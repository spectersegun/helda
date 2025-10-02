export default function Settings() {
  return (
    <div className="grid grid-cols-2 gap-5 items-stretch flex-1 !relative !pt-10 overflow-y-auto !pb-40 !bt-5 bg-white hide-native-scrollbar mt-5 rounded-[20px] ">
      <div className="col-span-1">
        <div>
          <div className="relative flex justify-center items-center">
            <span className="w-[100px] border-t"></span>
            <h3 className="!text-xl !font-medium !p-2.5 min-w-[340px] !border !border-[#BAB6B6] rounded-lg !text-center ">
              Account Settings
            </h3>
            <span></span>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}
