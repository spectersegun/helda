import AvatarCircle from "./AvatarCircle";

type WelcomeCardProps = {
  name: string;
  subtitle?: string;
  avatarSrc?: string;
  className?: string;
  onProfileClick?: () => void;
};

export default function WelcomeCard({
  name,
  subtitle = "",
  className = "",
  onProfileClick,
}: WelcomeCardProps) {
  return (
    <div
      className={`!px-5 !pt-2 !pb-2.5 bg-[#FCFAFA] rounded-[20px]  !shadow-md flex justify-between items-center ${className}`}
    >
      <div>
        <h1 className="!font-semibold !text-black !mb-1 !text-[1.8vw] font-outfit ">
          {name}
        </h1>
        <h4 className="!font-light !text-[1.2vw] !mb-0">{subtitle}</h4>
      </div>

      <span onClick={onProfileClick} className="cursor-pointer  ">
        <AvatarCircle src="/images/dp.png" />
      </span>
    </div>
  );
}
