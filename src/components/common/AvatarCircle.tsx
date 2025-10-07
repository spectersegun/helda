// src/components/common/AvatarCircle.tsx
"use client";

type AvatarCircleProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

export default function AvatarCircle({
  src = "/images/dp.png",
  alt = "Profile photo",
  className = "",
  imgClassName = "",
}: AvatarCircleProps) {
  return (
    <div className={`!shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`!w-15 !h-15 !rounded-full object-cover hover:!border-2 cursor-pointer hover:!border-[#1F664BAE] hover:drop-shadow-[0_2px_7px_rgba(31,102,75,0.78)] transition-all duration-200 ${imgClassName}`}
      />
    </div>
  );
}
