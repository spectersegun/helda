import React from "react";

export default function GreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      aria-labelledby="healthcare-heading"
      // className="bg-[url('/images/HealthBg.jpg')] w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center !py-15 !px-[70px] "

      className={`
       bg-[url('/images/HealthBg.jpg')] !w-screen !h-screen bg-cover bg-center flex flex-col items-center justify-center !py-12 !px-12 element-class
      `}
    >
      <div className=" bg-white w-full h-full rounded-lg overflow-y-auto ">
        {children}
      </div>
    </main>
  );
}
