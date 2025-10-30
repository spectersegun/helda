interface LinedHHeadersProps {
  text: string;
  headerClassName?: string;
  wrapperClassName?: string;
}

function LinedHHeaders({
  text,
  headerClassName,
  wrapperClassName,
}: LinedHHeadersProps) {
  return (
    <div className={wrapperClassName}>
      <div className="relative flex justify-center items-center  h-[5vh] ">
        <span className="w-[5vw] !border-t !border-[#BAB6B6]"></span>

        <h3
          className={`!text-[1.2vw] w-[22.5vw] !font-semibold !p-[1.1vh] !border !border-[#BAB6B6] rounded-[0.5vw] !text-center !mb-0 ${headerClassName} `}
        >
          {text}
        </h3>

        <span className="w-[5vw] !border-t !border-[#BAB6B6]"></span>
      </div>
    </div>
  );
}

export default LinedHHeaders;
