import React, { useState, useEffect } from "react";
import { GetApiBaseUrl } from "../../utils/env";
import axios from "axios";
import logo from "../../assets/logosippro1.png";
import styled from '../../views/home/style.module.css'
import logo1 from "../../assets/logodoang.png";
import Navbar from "./navbar";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { bubble as Menu } from "react-burger-menu";
import { useDarkMode } from '../../utils/DarkModeContext';
import { useAuth,getToken} from "../../context/AuthContext";
import { getTokenWValidate, refreshToken } from "../../utils/token";
const CustomNavigation = ({ navigation = [], setView, view, children }) => {
  const location = useLocation();
  const [toggleNav, setToggleNav] = useState(true);
  const handleToggle = () => setToggleNav((prev) => !prev);
  const [notification, setNotification] = useState([]);
  const baseUrl = GetApiBaseUrl();
  const { isAuthenticated, checkAuth } = useAuth(); // Fetch token from AuthContext
  const isScreenSizeLowerThanLG = useMediaQuery("(max-width: 990px)");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Burger Menu State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('Beranda');

  const closeMenu = (view, link) => {
    setView(view)
    setSelectedLink(link);
    setIsOpen(false);
  };

  const handleMenuStateChange = (state) => {
    setIsOpen(state.isOpen);
  };
  const burgerMenu = () => {
    return (
      <div style={{ display: isScreenSizeLowerThanLG ? 'inline-block' : 'none' }}>
        <Menu isOpen={isOpen} onStateChange={handleMenuStateChange}>
          {navigation.map((nav, i) => (
            <React.Fragment key={i}>
              <li
                className={`menu-item ${selectedLink === nav.title ? 'bm-item-selected' : ''}`}
                onClick={() => {
                  if (nav.subItems) {
                    setOpenDropdown(openDropdown === i ? null : i);
                  } else {
                    closeMenu(nav.view, nav.title);
                  }
                }}
              >
                <div>{nav?.renderIcon()}</div>
                {nav.title}
              </li>
              {nav.subItems && openDropdown === i && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  {nav.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`menu-item ${selectedLink === subItem.title ? 'bm-item-selected' : ''}`}
                      onClick={() => closeMenu(subItem.view, subItem.title)}
                    >
                      {subItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </div>
    )
  }
  // Fetch notifications every 60 seconds
  useEffect(() => {

    console.log("init notif");
    const interval = setInterval(getNotif, 60000);
    return () => clearInterval(interval);
  }, []);

  const getNotif = async () => {
    console.log("get notif");
    let latestTimestamp = localStorage.getItem("latestTimestamp");
    let notificationCount =
    parseInt(localStorage.getItem("notificationCount")) || 0;
    let token = getTokenWValidate();
    if(!token) token = await refreshToken();
    axios
      .get(`${baseUrl}/notification`, {
        headers: {
          Authorization: `Bearer ${token}`, // Retrieve token from AuthContext
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data;
          if (result && result.length) {
            setNotification(result);
            const newNotifications = result.filter(
              (notification) =>
                !latestTimestamp || notification.timeCreated > latestTimestamp
            );
            if (newNotifications.length) {
              latestTimestamp = newNotifications.reduce(
                (max, notification) =>
                  notification.timeCreated > max
                    ? notification.timeCreated
                    : max,
                latestTimestamp
              );
              localStorage.setItem("latestTimestamp", latestTimestamp);
            }
            if (newNotifications.length) {
              notificationCount += newNotifications.length;
              localStorage.setItem("notificationCount", notificationCount);
            }
          }
        }
      })
      .catch(() => { });
    // setTimeout(getNotif, 60000)
  };

  useEffect(() => {
    const lastView = localStorage.getItem("lastView");
    const lastView2 = localStorage.getItem("newView");
    if (lastView === "penilaian") {
      setToggleNav(true);
    } else if (lastView === "penilaianlapangan") {
      setToggleNav(true);
    } else if (lastView2 === "detailform") {
      setToggleNav(true);
    } else {
      setToggleNav(false);
    }
  }, [location]);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const { darkMode } = useDarkMode();
  return (
    <div className={`m-0 row ${styled.backgroundRow}`} style={{ width: "100vw", height: 'auto', backgroundColor: darkMode ? "#17153B" : "" }}>
      <div
        className="col-lg-2 side p-0 m-0 width-transition"
        style={{ width: toggleNav ? "65px" : "240px", }}
      >
        <div
          className="d-flex flex-column width-transition"
          style={{ position: "fixed", width: toggleNav ? "65px" : "240px" }}
        >
          <div
            className="d-flex w-100 align-items-center justify-content-center"
            style={{ height: "96px", gap: "8px" }}
          >
            {toggleNav && (
              <img
                className="logo"
                data-aos="zoom-in-right"
                data-aos-duration="1000"
                src={logo1}
                alt=""
                width={50}
                height={50}
              />
            )}

            {!toggleNav && (
              <>
                <img
                  className="logo"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  src={logo}
                  alt=""
                  width={150}
                  height={60}
                />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    textDecoration: "none",
                    color: "#1C1C1C",
                  }}
                  className="d-flex flex-column justify-content-center fw-bold"
                  href="#"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                ></span>
              </>


            )}

          </div>

          <section>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="visible"
              className="list-unstyled mb-0"
            >
              {navigation.map((nav, i) => (
                <motion.li
                  key={i}
                  variants={child}
                  className="mb-2 nav-item"
                  style={{
                    backgroundColor: view === nav?.view || (nav.subItems && nav.subItems.some(subItem => view === subItem.view))
                      ? (darkMode ? "#102C57" : "#A0DEFF")
                      : "transparent",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    transition: "background-color 0.2s ease",
                    cursor: 'pointer'
                  }}
                >
                  <div
                    className="d-flex align-items-center p-2 rounded-3"
                    onClick={() => {
                      if (nav.subItems) {
                        setOpenDropdown(openDropdown === i ? null : i);
                      } else {
                        setView(nav?.view);
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: darkMode ? '#4A249D' : '#B6FFFA',
                        color: 'white'
                      }}
                      className="rounded-circle p-2 me-3"
                    >
                      {nav?.renderIcon()}
                    </div>
                    {!toggleNav && (
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <span
                          style={{
                            fontWeight: '700',
                            color: darkMode
                              ? (view === nav?.view || (nav.subItems && nav.subItems.some(subItem => view === subItem.view)) ? "white" : "#B0B0B0")
                              : (view === nav?.view || (nav.subItems && nav.subItems.some(subItem => view === subItem.view)) ? "white" : "#666666")
                          }}
                        >
                          {nav?.title}
                        </span>
                        {nav.subItems && (
                          <span
                            style={{
                              fontSize: "17px",
                              transform: openDropdown === i ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          >
                            🔽
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {nav.subItems && openDropdown === i && !toggleNav && (
                    <ul style={{ marginLeft: '20px', marginRight: '20px', listStyle: 'none', borderRadius: '10px', padding: '5px' }}>
                      {nav.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            setView(subItem.view);
                          }}
                          style={{
                            cursor: 'pointer',
                            padding: '10px',
                            fontWeight: view === subItem.view ? (darkMode ? "900" : "900") : "transparent",
                            borderRadius: '30px',
                            marginTop: '5px',
                            display: 'flex',
                            alignItems: 'center',
                        
                          }}
                        >
                          <span
                            className="rounded-circle p-1 me-2">{subItem.renderIcon()}</span>
                          <span style={{
                            color: darkMode
                              ? (view === subItem.view ? "white" : "#B0B0B0")
                              : (view === subItem.view ? "white" : "#666666"),
                            fontWeight:'900'
                          }}>
                            {subItem.title}
                          </span>

                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </motion.ul>
            <style jsx>{`
    .nav-item:hover {
      background-color: ${darkMode ? 'rgba(60, 91, 111, 0.5)' : '#CAF4FF'} !important;
    }
  `}</style>
          </section>
        </div>
      </div>
      {/* Content Nav */}
      <div
        className="col-lg-10 col-md-12 p-0 width-transition"
        style={{
          width: `calc(100vw - ${isScreenSizeLowerThanLG ? "0px" : toggleNav ? "65px" : "240px"})`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '98px'
        }}
      >
        <Navbar burgerMenu={burgerMenu} notification={notification} handleToggle={handleToggle} />

        <div style={{ flex: 1 }}>
          {children}
        </div>

        <div className="container d-flex mt-3 foter" style={{ marginLeft: '-10px' }}>
          <p className="fots" style={{ color: darkMode ? 'white' : 'grey' }}>
            ©{new Date().getFullYear()} Direktorat Jenderal Pendidikan Islam Kementerian Agama RI. All rights reserved. | Aplikasi Prodi Versi 2.0
          </p>
          <p style={{ color: darkMode ? 'white' : 'grey', }} className="ms-auto fots">Support</p>
        </div>
      </div>
    </div>
  );
};

export default CustomNavigation;
