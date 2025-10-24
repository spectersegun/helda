export default function Heading24({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <h3
      className={`!text-[1.2vw] !font-semibold text-black !mb-0 ${className} `}
    >
      {text}
    </h3>
  );
}
