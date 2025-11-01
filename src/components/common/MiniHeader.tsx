import React from "react";

interface MiniHeaderProps {
  children: React.ReactNode;
  className?: string;
  wrapperClass?: string;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({
  children,
  className = "",
  wrapperClass = "",
}) => {
  const defaultClasses = `text-black !text-[1vw] !font-semibold !mb-[0.74vh] leading-6 max-w-[8vw] !mx-auto text-center ${wrapperClass}`;

  return <h5 className={`${defaultClasses} ${className}`}>{children}</h5>;
};

export default MiniHeader;
