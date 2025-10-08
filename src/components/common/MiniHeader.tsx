import React from "react";

interface MiniHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({
  children,
  className = "",
}) => {
  const defaultClasses =
    "text-black !text-lg !font-semibold !mb-1.5 leading-6 max-w-[170px] !mx-auto text-center";

  return <h5 className={`${defaultClasses} ${className}`}>{children}</h5>;
};

export default MiniHeader;
