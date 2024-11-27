import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./ContentHeader.css";
import { isAuth } from "../../utils/token";
import { useDarkMode } from "../../utils/DarkModeContext";
const ContentHeader = () => {
    const auth = isAuth();
    const {darkMode} = useDarkMode()
    return (
        <div className="col-12">
            <Card variant="elevation" sx={{
                background: darkMode ? "#577B8D" : "#FFFFFF",
                boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
                borderRadius: "6px"
            }} >
                <CardContent sx={{ padding: "32px", gap: "16px", color: darkMode ? "white" : "" }} className="d-flex flex-column">
                    <span
                        className="header-title-school"
                        data-aos="zoom-in-right"
                        data-aos-duration="1000"
                        style={{ color: darkMode ? "white" : "" }}
                    >
                        {auth?.nsptki_name ?? ""} {auth?.nsptki_id ? ` (${auth.nsptki_id})` : ""}
                    </span>
                    <span
                        className="header-address-school"
                        data-aos="zoom-in-left"
                        data-aos-duration="1000"
                        style={{ color: darkMode ? "white" : "" }}
                    >
                        {auth?.nsptki_alamat ?? ""}
                    </span>
                </CardContent>
            </Card>
        </div>
    );
}

export default ContentHeader;