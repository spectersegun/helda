// import { Link } from "react-router-dom";
// import dentistImage from "./Dentist.png";
// import hospitalImage from "./Hospital image.jpg";
// import pharmacyImage from "./Pharmacy image.png";
// import iconGradient1 from "./icon_gradient1.png";
// import backgroundImage from "./Slide1 1.jpg";
import "./HealthCareSector2.css";

/**
 * If you prefer using the public folder:
 *  - Put images in /public/healthcare/...
 *  - Replace imports with string paths: "/healthcare/Dentist.png"
 */

export const HealthcareSector2 = () => {
  return (
    <main
      aria-labelledby="healthcare-heading"
      className="bg-[url('/images/HealthBg.jpg')] w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center  py-15 px-[70px] "
    >
      <div className="!text-white bg-white w-full ">this is a test</div>
      {/* <div className="w-full h-full absolute inset-0 opacity-30"></div> */}
      {/* <img src="/images/HealthBg.jpg" alt="A background image" /> */}
      {/* Background */}
      {/* <div
        className="healthcare__bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden
      /> */}

      {/* <h1 id="healthcare-heading" className="healthcare__title">
        Choose your Healthcare Category
      </h1> */}
    </main>
  );
};
