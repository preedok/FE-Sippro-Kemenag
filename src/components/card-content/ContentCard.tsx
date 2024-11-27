import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDarkMode } from "../../utils/DarkModeContext";
const ContentCard = ({ children, sx, ...other }) => {
    const { darkMode } = useDarkMode()
    return (
        <div className="col-12 ">
            <Card variant="elevation" sx={{
                background: darkMode ? "#3C5B6F" : "#FFFFFF",
                borderRadius: "6px"
            }} >
                <CardContent sx={{ padding: "0px", margin: "0px", ...sx }} {...other}>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}

export default ContentCard;