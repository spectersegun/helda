import Dentist from "./Dentist.png";
import DentistHover from "./chatgpt-image-jul-21-2025-09-09-30-PM-1.png";
import { useState } from "react";
import "./DentistBox.css";

export const DentistBox = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="box">
            <div 
                className="group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="group-wrapper">
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group">
                            <div className="text-wrapper">Dentist</div>
                        </div>
                    </div>
                </div>

                <img
                    className="dentist"
                    alt="Dentist"
                    src={isHovered ? DentistHover : Dentist}
                />
            </div>
        </div>
    );
};
