import React, { useState, useEffect } from "react";
import "./admin.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { LineWave } from "react-loader-spinner";
import CardUsulan from "../../views/ptki/module/usulan/cardUsulan";
import CustomNavigation from "../../components/navbar/CustomNavigation";
import { Helmet } from "react-helmet";
import NewspaperIcon from "../../components/icons/NewspaperIcon";
import { motion } from 'framer-motion';
const Index = () => {
  const [view, setView] = useState("beranda");

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [loading, setLoading] = useState(true);

  const navigation = [
    {
      renderIcon: () => (
        <span role="img" aria-label="Beranda" style={{ fontSize: "22px" }}>🏠</span>
      ),
      title: "Beranda",
      view: "beranda"
    },
  ]

  return (
    <>
      <Helmet>
        <title>Kemenag | Beranda </title>
      </Helmet>
      <CustomNavigation view={view} setView={setView} navigation={navigation}>
        {(function () {
          switch (view) {
            case "beranda":
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CardUsulan />
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
