import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import logo from '../../assets/logo.svg'
import logo2 from '../../assets/logosippro1.png'
import pusaka from '../../assets/pusak.svg'
import dashboard from '../../assets/mockup.svg'
import elipse from '../../assets/Ellipse 2 (1).svg'
import style from './style.module.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { GetApiBaseUrl } from "../../utils/env";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProsedutStep from './components/prosedur/prosedurStep';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDarkMode } from '../../utils/DarkModeContext';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FAQ from './components/faq/faq';
import Contact from './components/contact/contact';
import Regulasi from './components/regulasi/regulasi';
import DokumenPanduan from './components/panduan/panduan';
import Footer from './components/footer/footer';
import { getToken, getRole, getUserId, getFullname, clearAuth } from '../../utils/token';
import { Button, Menu, MenuItem, Avatar, Typography, Divider } from '@mui/material';
import UserMenu from './components/usermenu';
import Cookies from 'js-cookie';
import api from '../service/api';
import { getRegisterStatus } from '../../utils/token';
const Landing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const baseUrl = GetApiBaseUrl();
    const navigate = useNavigate();
    const [scrollBackground, setScrollBackground] = useState(false);
    const navBackgroundClass = darkMode
        ? (scrollBackground ? 'bg-primary-subtle' : 'transparent')
        : (scrollBackground ? 'bg-white' : 'transparent');
    useEffect(() => {
        AOS.init();
        AOS.refresh();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrollBackground(true);
        } else {
            setScrollBackground(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);
    const [showWarning, setShowWarning] = useState(false);
    const currentYear = new Date().getFullYear();
    const getDataConfig = async () => {
        const token = getToken()
        try {
            const response = await axios.get(`${baseUrl}/DatabaseSettings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const warningConfig = response.data.find(item => item.name === "App:ReqProdiWarning");
            if (warningConfig && warningConfig.value.toLowerCase() === 'false') {
                setShowWarning(true);
            } else {
                setShowWarning(false);
            }
        } catch (error) {
            console.log(error);
            // Swal.fire({
            //     icon: "error",
            //     title: "Error",
            //     text: `${error.message}`
            // });
        }
    };
    useEffect(() => {
        getDataConfig();
    }, []);
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
    const handleMenuClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const ssoUser = Cookies.get('ssoUser');
    let parsedSSOUser = null;
    if (ssoUser) {
        try {
            parsedSSOUser = JSON.parse(ssoUser);
        } catch (error) {
            console.error("Error parsing ssoUser cookie:", error);
        }
    }

    const registerStatus = getRegisterStatus()
    return (
        <div className='scrollbar'>
            <Helmet>
                <title>Kemenag | Sistem Informasi Program Studi Pendidikan Tinggi Keagamaan Islam</title>
            </Helmet>
            <div>
                <Navbar expand="lg" style={{ top: '0', zIndex: 99 }} className={`${style.navs} ${navBackgroundClass} w-100 col-md-12 position-fixed`}>
                    <Container fluid>
                        <Navbar>
                            <Container>
                                <Navbar.Brand href="#home" className={`d-flex ms-lg-5 gap-2 ${style.logoss}`}>
                                    <img
                                        src={logo}
                                        width="40px"
                                        height="47px"
                                        className="align-top"
                                        alt="Logo"
                                        data-aos="zoom-in-right"
                                        data-aos-duration="1000"
                                    />
                                    <img
                                        src={pusaka}
                                        width="40px"
                                        height="54px"
                                        className="align-top"
                                        alt="Pusaka"
                                        data-aos="zoom-in-left"
                                        data-aos-duration="1000"
                                    />
                                    <img
                                        src={logo2}
                                        width="80px"
                                        height="39px"
                                        className="d-inline-block align-top"
                                        alt="Logo2"
                                        data-aos="zoom-in-right"
                                        data-aos-duration="1000"
                                        style={{ marginLeft: '-7px', marginTop: '6px' }}
                                    />
                                    <div
                                        data-aos="zoom-in-right"
                                        data-aos-duration="1000"
                                        className="d-none d-lg-block mt-1"
                                        style={{
                                            backgroundColor: darkMode ? 'white' : '#626768',
                                            width: '4px',
                                            height: '47px',
                                            borderRadius: '7px'
                                        }}
                                    />
                                </Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Navbar.Brand href="#home" className='mt-2'>
                            <h1
                                data-aos="zoom-in-left"
                                data-aos-duration="1000"
                                style={{ marginLeft: '-14px', color: darkMode ? "white" : "black" }}
                                className={`d-none mt-2 d-lg-block ${style.textLogoss}`}
                            >
                                KEMENTERIAN AGAMA
                                <p style={{ color: darkMode ? "white" : "", fontSize: '15px' }}>
                                    Direktorat Jenderal Pendidikan Islam
                                </p>
                            </h1>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse>
                            <Nav
                                className={`ms-auto my-2 my-lg-0 fw-bold px-4 rounded-4 gap-4 ${style.bgPutih}`}
                                style={{ maxHeight: '300px' }}
                                navbarScroll
                            >
                                <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => handleMenuClick('home')}>
                                    HOME
                                </Nav.Link>
                                <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => handleMenuClick('prosedur')}>
                                    PROSEDUR
                                </Nav.Link>
                                <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => handleMenuClick('panduan')}>
                                    PANDUAN
                                </Nav.Link>
                                <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => handleMenuClick('regulasi')}>
                                    REGULASI
                                </Nav.Link>
                                <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => handleMenuClick('contact')}>
                                    KONTAK
                                </Nav.Link>
                                <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => handleMenuClick('faq')}>
                                    FAQ
                                </Nav.Link>
                                {parsedSSOUser && (
                                    <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('registrasi')}>
                                        DAFTAR
                                    </Nav.Link>
                                )}
                                <UserMenu darkMode={darkMode} />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <section
                    style={{ backgroundColor: darkMode ? "#17153B" : "" }}
                    className={`${style.backgroundRow} ${style.hidden} card-body scroll`}
                >
                    {/* <div
                        style={{
                            position: 'fixed',
                            bottom: '14px',
                            right: '14px',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: darkMode ? '#003285' : '#3ABEF9',
                            borderRadius: '50%',
                            padding: '3px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: '4px solid white'
                        }}
                        onClick={toggleDarkMode}
                    >
                        <Button
                            style={{
                                borderRadius: '50%',
                                padding: 0,
                                minWidth: '40px',
                                minHeight: '40px',
                                backgroundColor: 'transparent',
                                color: '#FFFFFF',
                                boxShadow: 'none',
                            }}
                        >
                            {darkMode ? <NightsStayIcon style={{ fontSize: '28px' }} /> : <WbSunnyIcon style={{ fontSize: '28px' }} />}
                        </Button>
                    </div> */}
                    <div id="home" className={`row ${style.homeSec}`}>
                        <div className='col-md-6 col-sm-12'>
                            {showWarning && (
                                <Stack sx={{ width: '100%', marginTop: '-60px' }} spacing={2}>
                                    <Alert severity="warning" style={{ fontSize: '18px', fontWeight: '800' }}>
                                        Saat ini pendaftaran program studi baru tahun {currentYear} belum dibuka, silahkan tunggu informasi selanjutnya
                                    </Alert>
                                </Stack>
                            )}
                            {!registerStatus && (
                                <Stack sx={{ width: '100%', marginTop: '-60px' }} spacing={2}>
                                    <Alert severity="warning" style={{ fontSize: '17px', fontWeight: '800' }}>
                                        Akun anda belum terdaftar di sippro, silahkan klik daftar untuk mendaftar akun baru
                                    </Alert>
                                </Stack>
                            )}
                            <h5
                                data-aos="zoom-in-right"
                                data-aos-duration="1000"
                                className={`fw-bold mt-5 ms-2 ${style.textLeft}`}
                            >
                                <motion.div
                                    className="animated-text"
                                    variants={container}
                                    initial="hidden"
                                    animate="visible"
                                    style={{ color: darkMode ? "white" : "" }}
                                >
                                    {'Sistem Informasi'.split('').map((char, index) => (
                                        <motion.span key={index} className="char" variants={child}>
                                            {char}
                                        </motion.span>
                                    ))}
                                    <br />
                                    {'Program Studi Baru Pendidikan Tinggi Keagamaan Islam'.split('').map((char, index) => (
                                        <motion.span key={index} className="char" variants={child} style={{ color: darkMode ? "#FB773C" : "#2190B2" }}>
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </h5>
                            <p className={`ms-2 fw-bold ${style.pProsedur}`}>
                                <motion.div
                                    className="animated-text"
                                    variants={container}
                                    initial="hidden"
                                    animate="visible"
                                    style={{ color: darkMode ? "white" : "" }}
                                >
                                    {' S I P P R O merupakan sistem informasi yang dikelola oleh Direktorat Pendidikan Tinggi Keagamaan Islam untuk melayani usulan program studi baru'.split('').map((char, index) => (
                                        <motion.span key={index} className="char" variants={child}>
                                            {char}
                                        </motion.span>
                                    ))}
                                    <br />
                                </motion.div>
                            </p>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <div className={style.imageRight}>
                                <img src={elipse} alt="" className={style.elipseImage} data-aos="zoom-in-right"
                                    data-aos-duration="1000" />
                                <img data-aos="zoom-in-left"
                                    data-aos-duration="1000" className={style.imageContainer} src={dashboard} alt="" />
                            </div>
                        </div>
                    </div>
    
                    <div id="prosedur" className={`row ${style.ProsedurSec}`} style={{ color: darkMode ? "white" : "" }}>
                        <ProsedutStep darkMode={darkMode} />
                    </div>
    
                    <div id="panduan" style={{ marginTop: '2rem' }} className={`${style.regulasiSec} row  px-5 py-5`}>
                        <DokumenPanduan darkMode={darkMode} />
                    </div>
    
                    <div id="regulasi" style={{ marginTop: '-2rem' }} className={`${style.regulasiSec} row  px-5 py-5`}>
                        <Regulasi darkMode={darkMode} />
                    </div>
    
                    <div id="contact" style={{ marginTop: '5rem' }}>
                        <Contact />
                    </div>
                    <div id="faq" style={{ marginTop: '6.3rem' }}>
                        <FAQ />
                    </div>
    
                    <div>
                        <Footer darkMode={darkMode} />
                    </div>
                </section>
            </div>
        </div>
    )
}
    
export default Landing
    