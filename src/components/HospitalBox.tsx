import hopstialImage from "./hopstial-image.png";
import "./HospitalBox.css";

export const HospitalBox = () => {
    return (
        <div className="box">
            <div className="group">
                <div className="group-wrapper">
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group">
                            <div className="text-wrapper">Hospital</div>
                        </div>
                    </div>
                </div>

                <img
                    className="hopstial-image"
                    alt="Hopstial image"
                    src={hopstialImage}
                />
            </div>
        </div>
    );
};
