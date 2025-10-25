export default function AIUnderText({
  text,
  subText,
}: {
  text: string;
  subText: string;
}) {
  return (
    <div className="text-center col-span-1">
      <h4 className="!mb-0 !text-[0.71vw] text-[#878686] ">{text}</h4>
      <p className="!mb-0 !text-[0.71vw] text-[#c9c8c8]">{subText}</p>
    </div>
  );
}
