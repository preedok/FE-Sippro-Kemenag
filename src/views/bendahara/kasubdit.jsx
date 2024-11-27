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
import CardConfig from '../../views/kasubdit/module/config/configPage';
import CardUsulanKasubditLembagaLama from '../../views/kasubdit/module/usulan-prodi-lama/usulanKasubdit';
import { Navigate } from "react-router";
import { Helmet } from "react-helmet";
import { motion } from 'framer-motion';

const Index = () => {
  const [view, setView] = useState(localStorage.getItem("lastViewBendahara") || "report");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("lastViewBendahara", view);
  }, [view]);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const navigation = [
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
        <title>Kemenag | {view.charAt(0).toUpperCase() + view.slice(1)}</title>
      </Helmet>
      <CustomNavigation setView={setView} view={view} navigation={navigation.filter(Boolean)}>
        {(() => {
          switch (view) {
            case "report":
              return (
                <>
                  <Navigate to="/bendahara/report" replace />
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <CardReport />
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
