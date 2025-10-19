import React from "react";

export default function GreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="healthcare-heading"
      className={` this is it
       bg-[url('/images/HealthBg.jpg')] !w-screen !h-screen bg-cover bg-center flex flex-col items-center justify-center !py-[3.13vw] !px-[3.64vw] element-class
      `}
    >
      <div className=" bg-white w-full h-full rounded-lg overflow-y-auto ">
        {children}
      </div>
    </section>
  );
}
