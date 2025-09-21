import { useState } from "react";
import dentistImage from "./Dentist.png";
import hospitalImage from "./Hospital image.jpg";
import { useNavigate } from "react-router-dom";
import pharmacyImage from "./Pharmacy image.png";
import "./HealthCareSector2.css";

export const HealthcareSector2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // const [isAnimated, setIsAnimated] = useState(false);

  // useEffect(() => {
  //   setIsAnimated(true);
  // }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Navigate to the specific login page based on category
    setTimeout(() => {
      switch (category) {
        case "hospital":
          navigate("/hospital-login");
          break;
        case "dentist":
          navigate("/dentist-login");
          break;
        case "pharmacy":
          navigate("/pharmacy-login");
          break;
        default:
          navigate("/login");
      }
    }, 300); // Small delay to show the click state
  };

  return (
    <main
      aria-labelledby="healthcare-heading"
      // className="bg-[url('/images/HealthBg.jpg')] w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center !py-15 !px-[70px] "

      className={`
       bg-[url('/images/HealthBg.jpg')] w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center !py-14 !px-[60px] element-class 
       animate-fade-in-down delay-200
       healthcare-sector2
      `}
    >
      <div className="!text-white bg-white w-full h-full rounded-lg overflow-y-auto !py-12 flex flex-col justify-center ">
        <div className="flex justify-center ">
          <img src="/images/logo1.png" alt="Logo" className="w-16 h-auto   " />
        </div>
        <div className="p-8">
          <h1
            id="healthcare-heading"
            className="!text-4xl mb-6 text-center text-black !mt-16 !font-extrabold "
          >
            Choose your Healthcare Categorys
          </h1>

          <div className="flex !max-w-3xl !mx-auto gap-24 justify-center !mt-16 ">
            <div
              className={`group ${
                selectedCategory === "hospital" ? "clicked" : ""
              }`}
              onClick={() => handleCategoryClick("hospital")}
            >
              <div className="w-[200px] cursor-pointer select-none">
                <img
                  className="
                    !w-[140px] !h-auto rounded-2xl !mx-auto
                    !border-1 !border-[#1F664B]
                    transition-transform duration-300 ease-out
                    origin-center
                    group-hover:scale-[1.1] group-hover:!border-2 group-hover:!border-[#1F664B] group-hover:rounded-4xl
                  "
                  alt="Hospital image"
                  src={hospitalImage}
                />

                <button
                  className="
                    !mt-10 flex justify-center items-center w-full !h-10 !rounded-full
                    !bg-[#1F664B] !text-white !text-sm
                    transition-colors duration-300 ease-out

                    group-hover:!bg-white group-hover:!text-[#1F664B] !border-2 !border-[#1F664B] scale-[1.1]
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
              onClick={() => handleCategoryClick("dentist")}
            >
              <div className="w-[200px] cursor-pointer select-none">
                <img
                  className="
                    !w-[140px] !h-auto rounded-2xl !mx-auto
                    !border-1 !border-[#CBDF90]
                    transition-transform duration-300 ease-out
                    origin-center
                    group-hover:scale-[1.1] group-hover:!border-2 group-hover:!border-[#CBDF90] group-hover:rounded-4xl
                  "
                  alt="Dentist image"
                  src={pharmacyImage}
                />

                <button
                  className="
                    !mt-10 flex justify-center items-center w-full !h-10 !rounded-full
                    !bg-[#CBDF90] !text-white !text-sm
                    transition-colors duration-300 ease-out

                    group-hover:!bg-white group-hover:!text-[#CBDF90] !border-2 !border-[#CBDF90] scale-[1.1]
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
              onClick={() => handleCategoryClick("pharmacy")}
            >
              <div className="w-[200px] cursor-pointer select-none">
                <img
                  className="
                    !w-[140px] !h-auto rounded-2xl !mx-auto
                    !border-1 !border-[#12428D]
                    transition-transform duration-300 ease-out
                    origin-center
                    group-hover:scale-[1.1] group-hover:!border-2 group-hover:!border-[#12428D] group-hover:rounded-4xl
                  "
                  alt="Dentist image"
                  src={dentistImage}
                />

                <button
                  className="
                    !mt-10 flex justify-center items-center w-full !h-10 !rounded-full
                    !bg-[#12428D] !text-white !text-sm
                    transition-colors duration-300 ease-out

                    group-hover:!bg-white group-hover:!text-[#12428D] !border-2 !border-[#12428D] scale-[1.1]
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
