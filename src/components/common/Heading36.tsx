import { type ReactNode } from "react";

export default function Heading36({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-[1.8vw] !mb-0 font-semibold text-black ${className} `}
    >
      {children}
    </div>
  );
}
