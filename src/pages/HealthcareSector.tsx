import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dentistImage from "./Dentist.png";
import hospitalImage from "./Hospital image.jpg";
import iconGradient1 from "./icon_gradient1.png";
import pharmacyImage from "./Pharmacy image.png";
import backgroundImage from "./Slide1 1.jpg";
import "./HealthcareSector.css";

export const HealthcareSector = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        // Navigate to the specific login page based on category
        setTimeout(() => {
            switch (category) {
                case 'hospital':
                    navigate('/hospital-login');
                    break;
                case 'dentist':
                    navigate('/dentist-login');
                    break;
                case 'pharmacy':
                    navigate('/pharmacy-login');
                    break;
                default:
                    navigate('/login');
            }
        }, 300); // Small delay to show the click state
    };
    return (
        <div className="healthcare-sector">
            <div className="overlap-wrapper">
                <div 
                    className="overlap"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="rectangle" />

                    <div className="text-wrapper">Choose your Healthcare Category</div>

                    <img
                        className="icon-gradient"
                        alt="Icon gradient"
                        src={iconGradient1}
                    />

                    <div className="healthcare-categories">
                        <div 
                            className={`group ${selectedCategory === 'hospital' ? 'clicked' : ''}`}
                            onClick={() => handleCategoryClick('hospital')}
                        >
                            <div className="group-wrapper">
                                <div className="overlap-group-wrapper">
                                    <div className="overlap-group">
                                        <div className="div">Hospital</div>
                                    </div>
                                </div>
                            </div>

                            <img className="img hospital" alt="Hospital image" src={hospitalImage} />
                        </div>

                        <div 
                            className={`group-2 ${selectedCategory === 'dentist' ? 'clicked' : ''}`}
                            onClick={() => handleCategoryClick('dentist')}
                        >
                            <div className="group-wrapper">
                                <div className="overlap-group-wrapper">
                                    <div className="div-wrapper">
                                        <div className="text-wrapper-2">Dentist</div>
                                    </div>
                                </div>
                            </div>

                            <img
                                className="img dentist"
                                alt="Dentist image"
                                src={dentistImage}
                            />
                        </div>

                        <div 
                            className={`pharmacy-image ${selectedCategory === 'pharmacy' ? 'clicked' : ''}`}
                            onClick={() => handleCategoryClick('pharmacy')}
                        >
                            <div className="group-wrapper">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-3">Pharmacy</div>
                                </div>
                            </div>

                            <img className="img pharmacy" alt="Pharmacy image" src={pharmacyImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
