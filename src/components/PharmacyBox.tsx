import medication from "./Pharmacy.png";
import "./PharmacyBox.css";

export const PharmacyBox = () => {
    return (
        <div className="box">
            <div className="pharmacy-image">
                <div className="group">
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group">
                            <div className="text-wrapper">Pharmacy</div>
                        </div>
                    </div>
                </div>

                <img className="pharmacy" alt="Pharmacy" src={medication} />
            </div>
        </div>
    );
};
