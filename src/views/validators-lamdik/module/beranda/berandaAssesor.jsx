import React, { useState, useEffect } from "react";
import "../../admin-assesor.css";
import HeroTitle from "../../../../components/hero-title/HeroTitle";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
import Rekapitulasi from "./components/rekapitulasi";
import { isAuth, getToken, getRole, getFullname } from "../../../../utils/token";
import HouseDoorIcon from "../../../../components/icons/HouseDoorIcon";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDarkMode } from "../../../../utils/DarkModeContext";

const BerandaKasubdit = () => {
  const auth = isAuth();
  const {darkMode} = useDarkMode()
  const [view, setView] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const warningMessage = localStorage.getItem("warningMessage");
    if (warningMessage === "") {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, []);
  return (
    <>
      <HeroTitle
        title="Beranda"
        subtitle={`Selamat datang, ${getFullname() ?? ""}`}
      />
      {showAlert && (
        <Alert className="m-1" severity="warning">
          Silahkan upload file nira, ttd dan buku tabungan di aksi profile
        </Alert>
      )}
      {/* Tabs */}
      <div className="d-flex">
        <button
          className="btn btn-white border-0 d-flex align-items-center justify-content-center"
          style={{
            boxShadow: "none",
            background: darkMode? "#3C5B6F" : (view == 0 ? "#FFF" : null), 
            borderRadius: "8px 8px 0px 0px",
            width: "177px",
            height: "48px",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "23px",
            color: darkMode ? "white" : (view == 0 ? "blue" : null), 
            gap: "5px",
          }}
          onClick={() => setView(0)}
        >
          <HouseDoorIcon />
          Rekapitulasi
        </button>
        {/* <button
          className="btn btn-white border-0 d-flex align-items-center justify-content-center"
          style={{
            boxShadow: "none",
            background: view == 1 ? "#FFF" : null,
            borderRadius: "8px 8px 0px 0px",
            width: "177px",
            height: "48px",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "24px",
            color: view == 1 ? "#0F56B3" : "#1C1C1C",
            gap: "5px",
          }}
          onClick={() => setView(1)}
        >
          <CHeckCircleFIllIcon/>
          Penawaran Baru
        </button> */}
      </div>

      <div className="card" style={{ border: "none" }}>
        <div className="row">
          <div  style={{ marginTop: "-23px" }}>
            <ContentContainer>
              {/* {view === 0 ? (
                <ContentCard>
                  <Rekapitulasi />
                </ContentCard>
              ) : (
                <ContentCard>
                  <Penawaran />
                </ContentCard>
              )} */}
              {view === 0 ? (
                <ContentCard>
                  <Rekapitulasi />
                </ContentCard>
              ) : null}
            </ContentContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default BerandaKasubdit;
