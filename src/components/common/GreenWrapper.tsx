import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GreenWrapper({ children, className = "" }: Props) {
  return (
    <section
      aria-labelledby="healthcare-heading"
      className={`bg-[url('/images/HealthBg.jpg')] w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center !py-[3.13vw] !px-[3.64vw] element-class ${className}`}
    >
      <div className="bg-white w-full h-full rounded-lg overflow-y-auto">
        {children}
      </div>
    </section>
  );
}
