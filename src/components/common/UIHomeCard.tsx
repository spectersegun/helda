import { StarIcon } from "../Icons";

export default function UIHomeCard({
  title,
  subtitle,
  trend,
}: {
  title?: string;
  subtitle?: string;
  trend?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 items-center !py-2.5 !px-2 h-38 bg-white rounded-[18px] text-center ">
      <div className="flex items-center gap-2 !mb-2.5">
        <h3 className="!mb-0 !text-lg !font-semibold ">
          <span className="inline-block align-middle !mr-2">
            <StarIcon width={18} height={18} />
          </span>
          {title}
        </h3>
      </div>
      <p className="text-[#1F664B]  text-sm font-medium !mb-0">
        <span className="text-base ">▲</span> {subtitle}
      </p>

      <p className="text-[#FD0303] text-sm font-medium !mb-0">
        {" "}
        <span>▼ </span> {trend}
      </p>
    </div>
  );
}
