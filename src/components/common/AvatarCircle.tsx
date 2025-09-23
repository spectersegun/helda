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
        className={`!w-15 !h-15 !rounded-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
