export default function Text13({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`mx-auto mt-0 !mb-0 text-[0.66vw] leading-[0.9vw] text-black !font-light ${className}`}
    >
      {children}
    </p>
  );
}
