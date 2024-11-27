import React from "react";
import { useDarkMode } from "../../utils/DarkModeContext";
const ContentContainer = ({ children }) => {
    const { darkMode } = useDarkMode()
    return (
        <div className="card border-0" style={{ borderRadius: "0px", padding: "32px 16px", background: darkMode ? "#3C5B6F" : "#FFFFFF", }}>
            <div className="card-body p-0 m-0">
                <div className="row" style={{ gap: "16px" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ContentContainer;