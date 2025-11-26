interface SectionTitleProps {
  title: string;
  width?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  width = "w-[12vw]",
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`text-center mx-auto ${width} leading-[2.3vh] tracking-[-0.02em]  text-black !text-[2.2vh] !font-bold !mb-0 ${className}`}
    >
      {title}
    </h2>
  );
}
