import React, { useState, useEffect } from "react";
import "./admin-assesor.css";
import AOS from "aos";
import "aos/dist/aos.css";
import CardBerandaAssesor from "../assesor/module/beranda/berandaAssesor";
import CardPenilaianAssesor from "../assesor/module/penilaian/penilaianAssesor";
import CardReport from "../assesor/module/report/report";
import CardPanduan from "../assesor/module/panduan/panduan";
import CustomNavigation from "../../components/navbar/CustomNavigation";
import { Navigate } from "react-router";
import { Helmet } from "react-helmet";
import NewspaperIcon from "../../components/icons/NewspaperIcon";
import JournalBookmarkIcon from "../../components/icons/JournalBookmarkIcon";
import LayoutTextWindowReverseIcon from "../../components/icons/LayoutTextWindowReverseIcon";
import CardPenawaranAssesor from '../assesor/module/penawaran/penawaran'
import CardPenunjukanLapangan from '../assesor/module/penilaianlapangan/penilaianAssesor'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { motion } from 'framer-motion';
const Index = () => {
  const [view, setView] = useState(
    localStorage.getItem("lastView") || "beranda"
  );
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    localStorage.setItem("lastView", view);
    setTimeout(() => {}, 2000);
  }, [view]);

  const navigation = [
    {
      renderIcon: () => (
        <span role="img" aria-label="Beranda" style={{ fontSize: "22px" }}>📰</span>
      ),
      title: "Beranda",
      view: "beranda",
    },
    {
      title: "Penawaran Baru",
      view: "penawaran",
      renderIcon: () => (
        <span role="img" aria-label="Penawaran Baru" style={{ fontSize: "22px" }}>🏷️</span>
      ),
    },
    {
      title: "Asesment Kecukupan",
      view: "penilaian",
      renderIcon: () => (
        <span role="img" aria-label="Asesment Kecukupan" style={{ fontSize: "20px" }}>📓</span>
      ),
    },
    {
      title: "Asesment Lapangan",
      view: "penilaianlapangan",
      renderIcon: () => (
        <span role="img" aria-label="Asesment Lapangan" style={{ fontSize: "22px" }}>🔖</span>
      ),
    },
    {
      title: "Panduan Evaluator",
      view: "panduan",
      renderIcon: () => (
        <span role="img" aria-label="Panduan Evaluator" style={{ fontSize: "22px" }}>📘</span>
      ),
    },
    {
      title: "Report Evaluator",
      view: "report",
      renderIcon: () => (
        <span role="img" aria-label="Report Evaluator" style={{ fontSize: "22px" }}>📊</span>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Kemenag | Beranda </title>
      </Helmet>
      <CustomNavigation setView={setView} view={view} navigation={navigation}>
        {(function () {
          switch (view) {
            case "beranda":
              return (
                <>
                  <Navigate to="/asesor/beranda" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CardBerandaAssesor />
                  </motion.div>
                </>
              )
            case "penawaran":
              return (
                <>
                  <Navigate to="/asesor/penawaran" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardPenawaranAssesor />
                  </motion.div>
                </>
              )
            case "penilaian":
              return (
                <>
                  <Navigate to="/asesor/penilaian" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardPenilaianAssesor />;
                  </motion.div>
                </>
              )
            case "penilaianlapangan":
              return (
                <>
                  <Navigate to="/asesor/penilaianlapangan" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardPenunjukanLapangan />;
                  </motion.div>
                </>
              )
            case "panduan":
              return (
                <>
                  <Navigate to="/asesor/panduan" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardPanduan />
                  </motion.div>
                </>
              )
            case "report":
              return (
                <>
                  <Navigate to="/asesor/report" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardReport />
                  </motion.div>
                </>
              )
            default:
              break;
          }
        })()}
      </CustomNavigation>
    </>
  );
};

export default Index;
