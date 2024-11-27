import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CustomNavigation from "../../components/navbar/CustomNavigation";
import { Helmet } from "react-helmet";
import JournalBookmarkIcon from "../../components/icons/JournalBookmarkIcon";
import CardValidasiLembaga from "./validasi-ptsp/validasi-ptsp";

const Index = () => {
    const [view, setView] = useState(
        localStorage.getItem("lastView") || "usulan",
        localStorage.removeItem("asesorId")
    );
    useEffect(() => {
        localStorage.setItem("lastView", view);
        setTimeout(() => { }, 2000);
    }, [view]);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    const navigation = [
        {
            title: 'Verifikator',
            view: "usulan",
            renderIcon: () => (
                <span role="img" aria-label="Verifikator" style={{ fontSize: "22px" }}>✅</span>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title>Kemenag | Beranda </title>
            </Helmet>
            <CustomNavigation setView={setView} view={view} navigation={navigation}>
                <CardValidasiLembaga />
            </CustomNavigation>
        </>
    );
};

export default Index;
