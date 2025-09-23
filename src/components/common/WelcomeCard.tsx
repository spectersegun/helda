// src/components/WelcomeCard.tsx
"use client";

import AvatarCircle from "./AvatarCircle";

type WelcomeCardProps = {
  name: string; // e.g. "Mayowa"
  subtitle?: string; // optional subtext under the title
  avatarSrc?: string; // e.g. "/images/dp.png"
  className?: string; // extra classes for the outer wrapper
};

export default function WelcomeCard({
  name,
  subtitle = "Your intelligent hub for patient trends, service pricing and revenue performance",
  className = "",
}: WelcomeCardProps) {
  return (
    <div
      className={`!px-4 !pt-2 !pb-4 bg-[#FCFAFA] rounded-[20px] !shadow-md flex justify-between items-center ${className}`}
    >
      <div>
        <h1 className="!font-medium !text-black !text-2xl !mb-1 font-outfit">
          {name}
        </h1>
        <h4 className="!font-light !text-lg !mb-0">{subtitle}</h4>
      </div>

      <AvatarCircle src="/images/dp.png" />
    </div>
  );
}
