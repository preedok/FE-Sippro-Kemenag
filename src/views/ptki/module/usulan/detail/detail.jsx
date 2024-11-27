import React, { useState, useEffect } from "react";
import "../../../admin.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { LineWave } from "react-loader-spinner";
import DetailUsulan from "./detailUsulan";
import CustomNavigation from "../../../../../components/navbar/CustomNavigation";
import logo from '../../../../../assets/logo.svg'
import '../../../../../App.css'
import JournalBookmarkIcon from "../../../../../components/icons/JournalBookmarkIcon";
const Index = () => {
  const [view, setView] = useState("usulan");

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const navigation = [
    {
      title: "Usulan Prodi Baru",
      view: "usulan",
      renderIcon: () => (
        <span role="img" aria-label="Usulan Prodi Baru" style={{ fontSize: "22px" }}>📚</span>
      ),
    },
  ]

  return (
    <>
      <CustomNavigation setView={setView} view={view} navigation={navigation}>
        {(function () {
          switch (view) {
            case "usulan":
              return <DetailUsulan />
          }
        }())}
      </CustomNavigation>
    </>
  );
};

export default Index;
