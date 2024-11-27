import React from "react";
import { TableRow, TableCell, LinearProgress } from "@mui/material";
import logo from "../../assets/logosippro1.png";
import { useDarkMode } from "../../utils/DarkModeContext";
const LoadingComponent = ({ columns }) => {
    const {darkMode} = useDarkMode()
    return (
        <TableRow>
            <TableCell colSpan={columns.length} style={{ textAlign: "center", paddingTop: "2rem", background: darkMode ? 'rgba(255, 255, 255, 0.5)' : "#F9FAFC", }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={logo} alt="DIKTIS KEMENAG 2023" style={{ width: "150px", height: "auto" }} />
                    {/* <p className="fw-bold mt-2">DIKTIS KEMENAG</p> */}
                    <div className="mt-2" style={{ width: "8%" }}>
                        <LinearProgress
                            sx={{
                                width: "110%",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#7469B6"
                                }
                            }}
                        />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default LoadingComponent;
