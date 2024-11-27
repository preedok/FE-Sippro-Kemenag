import React from "react";


const IconContainer = ({ backgroundColor, color, children }) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                width: "24px",
                height: "24px",
                backgroundColor,
                color,
                borderRadius: "50%",
            }}
        >{children}</div>
    )
}

const statusProdiBackground = (status) => {
    switch (status) {
        case 1:
            return "#FFFBE6";
        case 4:
            return "#F4FBF6";
        default:
            return "#F4F4F4";
    }
}

const iconProdi = (status) => {
    switch (status) {
        case 1:
            return <IconContainer
                backgroundColor="#FED303"
                color="#000"
            >
                1
            </IconContainer>
        case 4:
            return <IconContainer
                backgroundColor="#8FD79F"
                color="#000"
            >
                4
            </IconContainer>
        default:
            return <IconContainer
                backgroundColor="#A0A0A0"
                color="#E0E0E0"
            >
                0
            </IconContainer>
    }
}

const textProdi = (status) => {
    switch (status) {
        case 1:
            return "Konfirmasi Dokumen dan Lengkap"
        case 4:
            return "Validasi BAN PT"
        default:
            return "Persiapan Melengkapi Dokumen"
    }
}

const StatusProdi = ({ status }) => {
    const background = statusProdiBackground(status);

    return (
        <div style={{ background, padding: "0px 6px", height: "28px", gap: "6px", borderRadius: "6px" }} className="text-truncate d-flex align-items-center">
            {iconProdi(status)} <span style={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#000000",
            }}>{textProdi(status)}</span>
        </div>
    );
}

export default StatusProdi;