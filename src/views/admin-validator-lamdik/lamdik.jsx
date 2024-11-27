import React, { useState, useEffect } from "react";
import "./admin-kasubdit.css";
import AOS from "aos";
import "aos/dist/aos.css";
import CardPenugasanPenilai from "../admin-validator-banpt/module/penugasan-penilai/penugasanPenilai";
import CardBerandaKasubdit from "../admin-validator-banpt/module/beranda/berandaKasubdit";
import CardManagementUser from "../admin-validator-banpt/module/management-user/managementUser";
import CustomNavigation from "../../components/navbar/CustomNavigation";
import CardReport from "../admin-validator-banpt/module/report/report";
import CardUsulanKasubditLembagaLama from '../../views/admin-validator-banpt/module/usulan-prodi/usulanKasubdit';
import CardUsulanKasubditLembagaBaru from '../../views/admin-validator-banpt/module/usulan-prodi/usulanKasubdit';
import { Navigate } from "react-router";
import { Helmet } from "react-helmet";
import { motion } from 'framer-motion';
import { getRole } from "../../utils/token";
const Index = () => {
  const [view, setView] = useState(localStorage.getItem("lastView") || "beranda");
  useEffect(() => {
    localStorage.setItem("lastView", view);
  }, [view]);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const role = getRole()
  const navigation = [
    {
      renderIcon: () => (
        <span role="img" aria-label="Beranda" style={{ fontSize: "22px" }}>🏠</span>
      ),
      title: "Beranda",
      view: "beranda",
    },
    {
      renderIcon: () => (
        <span role="img" aria-label="Usulan Prodi Baru" style={{ fontSize: "22px" }}>📚</span>
      ),
      title: "Validasi Lembaga",
      view: "usulan",
      subItems: [
        {
          title: "Lembaga Lama",
          view: "usulan-lembaga-lama",
          renderIcon: () => (
            <span role="img" aria-label="Lembaga Lama" style={{ fontSize: "20px" }}>🏛️</span>
          ),
        },
        {
          title: "Lembaga Baru",
          view: "usulan-lembaga-baru",
          renderIcon: () => (
            <span role="img" aria-label="Lembaga Baru" style={{ fontSize: "20px" }}>🏢</span>
          ),
        },
      ],
    },
    {
      title: "Penunjukan Validator",
      view: "penawaran",
      renderIcon: () => (
        <span role="img" aria-label="Penawaran Penilai" style={{ fontSize: "22px" }}>📊</span>
      ),
    },
    {
      title: "Management User",
      view: "management",
      renderIcon: () => (
        <span role="img" aria-label="Management User" style={{ fontSize: "22px" }}>🧑‍🏫</span>
      ),
    },
    {
      title: "Report Validator",
      view: "report",
      renderIcon: () => (
        <span role="img" aria-label="Report Evaluator" style={{ fontSize: "22px" }}>📊</span>
      ),
    }
  ];
  return (
    <>
      <Helmet>
        <title>Kemenag | {view.charAt(0).toUpperCase() + view.slice(1)}</title>
      </Helmet>
      <CustomNavigation setView={setView} view={view} navigation={navigation.filter(Boolean)}>
        {(() => {
          switch (view) {
            case "beranda":
              return (
                <>
                  <Navigate to="/admin-validator-lamdik/beranda" replace />
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
                  <Navigate to="/admin-validator-lamdik/usulan/lembaga-lama" replace />
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
                  <Navigate to="/admin-validator-lamdik/usulan/lembaga-baru" replace />
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
                  <Navigate to="/admin-validator-lamdik/penawaran" replace />
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
                  <Navigate to="/admin-validator-lamdik/user" replace />
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
                  <Navigate to="/admin-validator-lamdik/report" replace />
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
