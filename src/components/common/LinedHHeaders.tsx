// AccountSettingsHeader.jsx

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
      <div className="relative flex justify-center items-center">
        <span className="w-[80px] !border-t !border-[#BAB6B6]"></span>

        <h3
          className={`!text-lg !font-semibold !p-2.5 min-w-[340px] !border !border-[#BAB6B6] rounded-lg !text-center leading-6 !mb-0 ${headerClassName} `}
        >
          {text}
        </h3>

        <span className="w-[80px] !border-t !border-[#BAB6B6]"></span>
      </div>
    </div>
  );
}

export default LinedHHeaders;
