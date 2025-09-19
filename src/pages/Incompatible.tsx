export default function Incompatible() {
  return (
    <div>
      <div className="flex justify-center !mt-20">
        <img
          src="/images/logo1.png"
          alt="Helda Logo"
          className="mx-auto mt-20 w-20 h-30"
        />
      </div>

      <div className="incompatible-container !px-7">
        <h2 className="text-[#1F664B] !mt-[64px] !text-3xl text-center font-bold leading-10">
          "The Helda Dashboard is currently available only on desktop only.
          Please log in using a desktop or laptop browser to continue."
        </h2>
      </div>
    </div>
  );
}
