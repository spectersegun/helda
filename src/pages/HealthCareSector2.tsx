import { useState } from "react";
import dentistImage from "./Dentist.png";
import hospitalImage from "./Hospital image.jpg";
import pharmacyImage from "./Pharmacy image.png";
import "./HealthCareSector2.css";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";

export const HealthcareSector2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { navigateTo } = useAllPageNavigation();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Navigate to the specific login page based on category #segun
    setTimeout(() => {
      switch (category) {
        case "hospital":
          navigateTo("hospital-login");
          break;
        case "dentist":
          navigateTo("dentist-login");
          break;
        case "pharmacy":
          navigateTo("pharmacy-login");
          break;
        default:
          navigateTo("hospital-login");
      }
    }, 300); // Small delay to show the click state  #segun
  };

  return (
    <main
      aria-labelledby="healthcare-heading"
      className={`
       bg-[url('/images/HealthBg.jpg')] w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center !py-[3.13vw] !px-[3.64vw] element-class 
       animate-fade-in-down delay-200
       healthcare-sector2
      `}
    >
      <div className="!text-white bg-white w-full h-full rounded-lg overflow-y-auto !py-[8.2vw] flex flex-col justify-center ">
        <div className="flex justify-center ">
          <img
            src="/images/logo1.png"
            alt="Logo"
            className="!h-[6.9vw]  !w-auto"
          />
        </div>

        <div className="">
          <h1
            id="healthcare-heading"
            className="!text-[2.24vw] !text-center !text-black !mt-[4vw] 2xl:mt-[80px] !font-extrabold  !mb-0"
          >
            Choose your Healthcare Category
          </h1>

          <div className="flex !max-w-3xl !mx-auto gap-[7.8vw] justify-center !mt-[4.14vw] ">
            <div
              className={`group ${
                selectedCategory === "hospital" ? "clicked" : ""
              }`}
              onClick={() => handleCategoryClick("hospital")}
            >
              <div className="!w-[11.7vw] cursor-pointer select-none">
                <img
                  className={`!w-[8.2vw] !h-auto rounded-2xl !mx-auto !border-1 !border-[#1F664B] transition-transform duration-300 ease-out origin-center group-hover:scale-[1.1] ${
                    selectedCategory === "hospital" ? "" : ""
                  }`}
                  alt="Hospital image"
                  src={hospitalImage}
                />

                <button
                  className="
                    !mt-[2vw] flex justify-center items-center w-full !h-[2.42vw] !rounded-full
                    !bg-[#1F664B] !text-white !text-sm 2xl:text-base !font-semibold
                    transition-colors duration-300 ease-out
                    group-hover:!bg-white group-hover:!text-[#1F664B]  !border-2 !border-[#1F664B] !outline-none active:shadow-[0_4px_4px_1px_#1F664B]
                  "
                >
                  Hospital
                </button>
              </div>
            </div>

            <div
              className={`group ${
                selectedCategory === "dentist" ? "clicked" : ""
              }`}
              onClick={() => handleCategoryClick("pharmacy")}
            >
              <div className="!w-[11.7vw] cursor-pointer select-none">
                <img
                  className="
                    !w-[8.2vw] !h-auto rounded-2xl !mx-auto
                    !border-2 !border-[#CBDF90]
                    transition-transform duration-300 ease-out
                    origin-center 
                    group-hover:scale-[1.1]  group-hover:!border-[#CBDF90]  
                  "
                  alt="Dentist image"
                  src={pharmacyImage}
                />

                <button
                  className="
                    !mt-[2vw] flex justify-center items-center w-full !h-[2.42vw] !rounded-full
                    !bg-[#CBDF90] !text-[#1F664B] !text-sm 2xl:text-base
                    transition-colors duration-300 ease-out !font-semibold

                    group-hover:!bg-white group-hover:!text-[#1F664B]  !border-2 !border-[#CBDF90]  !outline-none active:shadow-[0_4px_7.3px_-1px_#1F6633]
                  "
                >
                  Pharmacy
                </button>
              </div>
            </div>

            <div
              className={`group ${
                selectedCategory === "pharmacy" ? "clicked" : ""
              }`}
              onClick={() => handleCategoryClick("dentist")}
            >
              <div className="!w-[11.7vw] cursor-pointer select-none">
                <img
                  className="
                    !w-[8.2vw] !h-auto rounded-2xl !mx-auto
                    !border-2 !border-[#12428D]
                    transition-transform duration-300 ease-out
                    origin-center
                    group-hover:scale-[1.1] group-hover:!border-2 group-hover:!border-[#12428D]
                  "
                  alt="Dentist image"
                  src={dentistImage}
                />

                <button
                  className="
                    !mt-6 lg:!mt-8 xl:!mt-9 3xl:!mt-[2vw] flex justify-center items-center w-full !h-[2.42vw] !rounded-full !font-semibold
                    !bg-[#12428D] !text-white !text-sm 2xl:text-base
                    transition-colors duration-300 ease-out
                    group-hover:!bg-white group-hover:!text-[#12428D] !border-2 !border-[#12428D] !outline-none active:shadow-[0_4px_7.3px_-1px_#12428D]
                  "
                >
                  Dentist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
