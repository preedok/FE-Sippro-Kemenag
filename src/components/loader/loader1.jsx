import React from "react";
import { LinearProgress } from "@mui/material";
import logo from "../../assets/logosippro1.png";

const LoadingComponent = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh"
        }}>
            <img src={logo} alt="DIKTIS KEMENAG 2023" style={{ width: "150px", height: "auto" }} />
            {/* <p className="fw-bold mt-2">DIKTIS KEMENAG</p> */}
            <div style={{ width: "8%" }} className="mt-2">
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
    );
};

export default LoadingComponent;
