import React from "react"
import "./HeroTitle.css";
import { useDarkMode } from '../../utils/DarkModeContext';
const HeroTitle = ({ title, subtitle }) => {
    const { darkMode } = useDarkMode();
    return (
        <div  className="ms-4 d-flex flex-column mb-3" >
            {title && (
                <span className="jdl mb-2" style={{ color: darkMode ? 'white' : 'grey', gap: "16px" }} data-aos="zoom-in-right" data-aos-duration="1000">
                    {title}
                </span>
            )}

            {subtitle && (
                <span className="jdl-sub" style={{ color: darkMode ? 'white' : 'grey', }}>{subtitle}</span>
            )}
        </div>
    );
}

export default HeroTitle;