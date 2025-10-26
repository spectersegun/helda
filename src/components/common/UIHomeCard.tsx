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
    <div className="flex flex-col gap-[0.56vh] items-center !py-[0.6vw] !px-[0.6vw] h-[13.9vh] bg-white rounded-[1vw] text-center ">
      <div className="flex items-center !mb-[1.11vh]">
        <h3 className="!mb-0 !text-[1.2vw] !font-semibold ">
          <span className="inline-block align-middle !mr-[0.4vw] ">
            <StarIcon width={18} height={18} className="!h-[1.6vh] !w-auto" />
          </span>
          {title}
        </h3>
      </div>

      <p className="text-[#1F664B]  text-[1vw] font-medium !mb-0 leading-[1vw] ">
        <span className="text-[1vw] ">▲</span> {subtitle}
      </p>

      <p className="text-[#FD0303] text-[1vw] font-medium !mb-0">
        {" "}
        <span>▼ </span> {trend}
      </p>
    </div>
  );
}
