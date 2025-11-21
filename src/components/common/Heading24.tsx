export default function Heading24({
  text,
  className = "",
  style = {},
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <h3
      className={`!text-[1.2vw] !font-semibold text-black !mb-0 ${className}`}
      style={style}
    >
      {text}
    </h3>
  );
}
