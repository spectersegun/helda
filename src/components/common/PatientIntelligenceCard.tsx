import { useNavigation } from "../../contexts/NavigationContext";
import Heading24 from "./Heading24";
import RollingNumber from "./RollingNumber";
import Text13 from "./Text13";

type PatientIntelligenceCardProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function PatientIntelligenceCard({
  title = "Patient Intelligence",
  description = `Patient Intelligence reveals patterns in new, returning, and repeat patients — helping you track loyalty, churn, and revenue impact to better tailor care and engagement.`,
  className = "",
}: PatientIntelligenceCardProps) {
  const { navigateToTab } = useNavigation();

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl bg-white text-center max-h-[26vh] h-[25.9vh] cursor-pointer opacity-0 animate-[fadeInRight_0.6s_ease-out_forwards_0.3s] ",
        " !pt-[0.8vw] shadow-sm border border-[#eab4b4] hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] overflow-hidden transition-shadow duration-300 ease-in-out flex flex-col justify-between w-full",
        className,
      ].join(" ")}
      onClick={() => navigateToTab("patient")}
    >
      <div className="!px-[0.6vw] ">
        <Heading24
          text={title}
          className="fall-in"
          style={{ "--fall-distance": "-20px" } as React.CSSProperties}
        />
        <Text13
          className="fall-in"
          style={{ "--fall-distance": "-30px" } as React.CSSProperties}
        >
          {description}
        </Text13>
      </div>

      <div className="absolute bottom-[0] left-0 right-0 !w-full !pb-[0.556vh] flex flex-col items-center chart-animate ">
        <svg
          viewBox="0 0 262 137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full 2xl:max-w-[13.23vw] 2xl:h-[11vh] w-auto w-max-[11.46vw] h-[11vh] "
        >
          <defs>
            <clipPath id="reveal-1">
              <rect x="0" y="0" width="0" height="137">
                <animate
                  attributeName="width"
                  from="0"
                  to="262"
                  dur="800ms"
                  begin="0s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.2 0.8 0.2 1"
                />
              </rect>
            </clipPath>
            <clipPath id="reveal-2">
              <rect x="0" y="0" width="0" height="137">
                <animate
                  attributeName="width"
                  from="0"
                  to="262"
                  dur="900ms"
                  begin="200ms"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.2 0.8 0.2 1"
                />
              </rect>
            </clipPath>
          </defs>

          <path
            d="M0 131C1.50395e-06 113.797 3.38842 96.7621 9.97179 80.8685C16.5552 64.9748 26.2045 50.5335 38.369 38.369C50.5335 26.2045 64.9748 16.5551 80.8685 9.97178C96.7621 3.38841 113.797 -2.25592e-06 131 0C148.203 2.25592e-06 165.238 3.38842 181.132 9.97179C197.025 16.5552 211.467 26.2045 223.631 38.369C235.795 50.5335 245.445 64.9748 252.028 80.8685C258.612 96.7621 262 113.797 262 131L218.77 131C218.77 119.474 216.5 108.061 212.089 97.4119C207.678 86.7631 201.213 77.0874 193.063 68.9372C184.913 60.787 175.237 54.322 164.588 49.9111C153.939 45.5002 142.526 43.23 131 43.23C119.474 43.23 108.061 45.5002 97.4119 49.9111C86.7631 54.3219 77.0874 60.787 68.9372 68.9372C60.787 77.0874 54.3219 86.7631 49.9111 97.4119C45.5002 108.061 43.23 119.474 43.23 131H0Z"
            fill="#E6F1F3"
          />

          <g clipPath="url(#reveal-1)">
            <path
              d="M0 131C1.92903e-06 108.934 5.57368 87.2264 16.2038 67.8903C26.834 48.5541 42.1762 32.2163 60.8067 20.393C79.4373 8.56973 100.752 1.644 122.774 0.258497C144.796 -1.12701 166.812 3.07262 186.777 12.4677L168.371 51.5833C154.994 45.2887 140.244 42.4749 125.489 43.4032C110.734 44.3315 96.453 48.9717 83.9705 56.8933C71.488 64.8149 61.2088 75.7612 54.0866 88.7165C46.9644 101.672 43.23 116.216 43.23 131H0Z"
              fill="#1F664B"
            />
          </g>

          <g clipPath="url(#reveal-2)">
            <path
              d="M24.0578 108.012C12.3867 105.503 4.79518 93.9069 9.18696 82.8065C16.4757 64.384 27.8857 47.763 42.6523 34.2752C62.7673 15.9023 88.1099 4.25769 115.153 0.962068C142.196 -2.33355 169.593 2.88385 193.532 15.8881C211.106 25.4346 226.173 38.8288 237.673 54.9616C244.603 64.6824 240.018 77.7627 229.291 83.001C218.564 88.2394 205.795 83.5466 198.099 74.4205C191.091 66.1096 182.559 59.1241 172.896 53.875C156.857 45.1622 138.501 41.6665 120.382 43.8746C102.264 46.0826 85.2841 53.8846 71.807 66.1944C63.6876 73.6106 57.0829 82.4407 52.2759 92.1915C46.9975 102.899 35.7288 110.521 24.0578 108.012Z"
              fill="#1F664B"
            />
          </g>
        </svg>

        <div className="text-[2.5vw] absolute bottom-[3.5vh] text-black font-medium  flex items-center justify-center">
          {/* 68% */}
          <RollingNumber
            value={22}
            rowHeight={50}
            duration={3000}
            animationDelay={600}
          />{" "}
          {/* <span className="text-[2.5vw] ">%</span> */}
        </div>

        <p className="text-black text-[1.15vw] !mb-0 ">
          New vs Returning patients
        </p>
      </div>
    </div>
  );
}
