import React, { useState, useEffect } from "react";
import "./admin-kasubdit.css";
import AOS from "aos";
import "aos/dist/aos.css";
import CardPenugasanPenilai from "../../views/kasubdit/module/penugasan-penilai/penugasanPenilai";
import CardBerandaKasubdit from "../../views/kasubdit/module/beranda/berandaKasubdit";
import CardUsulanKasubditLembagaBaru from "../../views/kasubdit/module/usulan-prodi/usulanKasubdit";
import CardManagementUser from "../../views/kasubdit/module/management-user/managementUser";
import CustomNavigation from "../../components/navbar/CustomNavigation";
import CardReport from "../../views/kasubdit/module/report/report";
import CardReportAL from "../../views/kasubdit/module/reportal/report";
import CardConfig from "../../views/kasubdit/module/config/configPage";
import CardUsulanKasubditLembagaLama from "../../views/kasubdit/module/usulan-prodi-lama/usulanKasubdit";
import { Navigate } from "react-router";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { getRole } from "../../utils/token";
const Index = () => {
  const [view, setView] = useState(
    localStorage.getItem("lastView") || "beranda"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("lastView", view);
  }, [view]);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const role = getRole();
  const navigation = [
    {
      renderIcon: () => (
        <span role="img" aria-label="Beranda" style={{ fontSize: "22px" }}>
          🏠
        </span>
      ),
      title: "Beranda",
      view: "beranda",
    },
    {
      renderIcon: () => (
        <span
          role="img"
          aria-label="Usulan Prodi Baru"
          style={{ fontSize: "22px" }}
        >
          📚
        </span>
      ),
      title: "Usulan Prodi Baru",
      view: "usulan",
      subItems: [
        {
          title: "Lembaga Lama",
          view: "usulan-lembaga-lama",
          renderIcon: () => (
            <span
              role="img"
              aria-label="Lembaga Lama"
              style={{ fontSize: "20px" }}
            >
              🏛️
            </span>
          ),
        },
        {
          title: "Lembaga Baru",
          view: "usulan-lembaga-baru",
          renderIcon: () => (
            <span
              role="img"
              aria-label="Lembaga Baru"
              style={{ fontSize: "20px" }}
            >
              🏢
            </span>
          ),
        },
      ],
    },
    {
      title: "Penawaran Penilai",
      view: "penawaran",
      renderIcon: () => (
        <span
          role="img"
          aria-label="Penawaran Penilai"
          style={{ fontSize: "22px" }}
        >
          📊
        </span>
      ),
    },
    {
      title: "Management User",
      view: "management",
      renderIcon: () => (
        <span
          role="img"
          aria-label="Management User"
          style={{ fontSize: "22px" }}
        >
          🧑‍🏫
        </span>
      ),
    },
    {
      title: "Report Evaluator AK",
      view: "report",
      renderIcon: () => (
        <span
          role="img"
          aria-label="Report Evaluator"
          style={{ fontSize: "22px" }}
        >
          📊
        </span>
      ),
    },
    {
      title: "Report Evaluator AL",
      view: "reportal",
      renderIcon: () => (
        <span
          role="img"
          aria-label="Report Evaluator"
          style={{ fontSize: "22px" }}
        >
          📊
        </span>
      ),
    },
    ...(role === "Kasubdit"
      ? [
          {
            title: "Config",
            view: "config",
            renderIcon: () => (
              <span role="img" aria-label="Config" style={{ fontSize: "22px" }}>
                ⚙️
              </span>
            ),
          },
        ]
      : []),
  ];
  return (
    <>
      <Helmet>
        <title>Kemenag | {view.charAt(0).toUpperCase() + view.slice(1)}</title>
      </Helmet>
      <CustomNavigation
        setView={setView}
        view={view}
        navigation={navigation.filter(Boolean)}
      >
        {(() => {
          switch (view) {
            case "beranda":
              return (
                <>
                  <Navigate to="/kasubdit/beranda" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardBerandaKasubdit />
                  </motion.div>
                </>
              );
            case "usulan-lembaga-lama":
              return (
                <>
                  <Navigate to="/kasubdit/usulan/lembaga-lama" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardUsulanKasubditLembagaLama />
                  </motion.div>
                </>
              );
            case "usulan-lembaga-baru":
              return (
                <>
                  <Navigate to="/kasubdit/usulan/lembaga-baru" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardUsulanKasubditLembagaBaru />
                  </motion.div>
                </>
              );
            case "penawaran":
              return (
                <>
                  <Navigate to="/kasubdit/penawaran" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardPenugasanPenilai />
                  </motion.div>
                </>
              );
            case "management":
              return (
                <>
                  <Navigate to="/kasubdit/user" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardManagementUser />
                  </motion.div>
                </>
              );
            case "report":
              return (
                <>
                  <Navigate to="/kasubdit/report" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardReport />
                  </motion.div>
                </>
              );
              case "reportal":
                return (
                  <>
                    <Navigate to="/kasubdit/reportal" replace />
                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <CardReportAL />
                    </motion.div>
                  </>
                );
            case "config":
              return (
                <>
                  <Navigate to="/kasubdit/config" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardConfig />
                  </motion.div>
                </>
              );
            default:
              return null;
          }
        })()}
      </CustomNavigation>
    </>
  );
};

export default Index;
