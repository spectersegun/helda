// src/components/WelcomeCard.tsx
"use client";

import AvatarCircle from "./AvatarCircle";

type WelcomeCardProps = {
  name: string;
  subtitle?: string;
  avatarSrc?: string;
  className?: string;
  setActive: () => void;
};

export default function WelcomeCard({
  name,
  subtitle = "",
  className = "",
  setActive,
}: WelcomeCardProps) {
  return (
    <div
      className={`!px-5 !pt-2 !pb-4 bg-[#FCFAFA] rounded-[20px] !shadow-md flex justify-between items-center ${className}`}
    >
      <div>
        <h1 className="!font-medium !text-black !text-2xl !mb-1 font-outfit">
          {name}
        </h1>
        <h4 className="!font-light !text-base !mb-0">{subtitle}</h4>
      </div>

      <span onClick={() => setActive()} className="cursor-pointer">
        <AvatarCircle src="/images/dp.png" />
      </span>
    </div>
  );
}
