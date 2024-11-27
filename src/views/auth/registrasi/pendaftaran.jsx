import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, TextField, IconButton } from '@mui/material';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from '../../home/style.module.css'
import logo from '../../../assets/logo.svg'
import pusaka from '../../../assets/pusak.svg'
import logo2 from '../../../assets/logosippro1.png'
import elipse3 from '../../../assets/Ellipse 3.svg'
import elipse4 from '../../../assets/Ellipse 4.svg'
import user1 from "../../../assets/icon1.svg";
import user2 from "../../../assets/icon2.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import bg1 from "../../../assets/k1.jpg";
import bg3 from "../../../assets/k3.jpg";
import bg4 from "../../../assets/k2.jpg";
import Swal from "sweetalert2";
import { GetApiBaseUrl } from "../../../utils/env";
import { isAuth, setAuth } from "../../../utils/token";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
const sectionIds = ['home', 'prosedur', 'daftar', 'regulasi', 'login'];
import { motion } from 'framer-motion';
import { useDarkMode } from '../../../utils/DarkModeContext';
import { getFullname } from './../../../utils/token';
import Cookies from 'js-cookie';
const Login = () => {
    const navigate = useNavigate();
    const handleSSOLogin = () => {
        navigate('/loginssoprompt');
    };
    const { darkMode } = useDarkMode()
    const ssoUser = Cookies.get('ssoUser');
    let parsedSSOUser = null;
    if (ssoUser) {
        try {
            parsedSSOUser = JSON.parse(ssoUser);
        } catch (error) {
            console.error("Error parsing ssoUser cookie:", error);
        }
    }
    return (
        <>
            <Helmet>
                <title>Kemenag | Daftar Akun</title>
            </Helmet>
            <Navbar expand="lg" style={{ top: '0', zIndex: 99, color: darkMode ? "white" : "" }} className={` ${style.navs}  w-100 col-md-12 position-fixed`}>
                <Container fluid>
                    <Navbar >
                        <Container >
                            <Navbar.Brand onClick={() => navigate('/')} className={`d-flex gap-3 ${style.logoss}`}>
                                <img src={logo2} width="151px"
                                    height="64px" className="d-inline-block ms-4 align-top"
                                    alt="React Bootstrap logo"
                                    data-aos="zoom-in-right"
                                    data-aos-duration="1000" />
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" >
                        <Nav
                            className={`ms-auto my-2 my-lg-0 fw-bold px-4 rounded-4 gap-4 text-dark ${style.bgPutih}`}
                            style={{ maxHeight: '300px', color: darkMode ? "white" : "" }}
                            navbarScroll
                        >


                            <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('/')}
                            >HOME</Nav.Link>
                            <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('/')}
                            >PROSEDUR</Nav.Link>
                            <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('/')}
                            >PANDUAN</Nav.Link>
                            <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('/')}
                            >REGULASI</Nav.Link>
                            <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('/')}
                            >KONTAK</Nav.Link>
                            <Nav.Link style={{ color: darkMode ? "white" : "" }} onClick={() => navigate('/')}
                            >FAQ</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <section style={{ backgroundColor: darkMode ? "#17153B" : "" }} className={`${style.daftarSec}  ${style.hidden}`}>
                    <img src={elipse4} alt="" style={{ position: 'absolute', top: '0', left: '0' }} />
                    <img src={elipse3} alt="" style={{ position: 'absolute', bottom: '0', right: '0' }} />
                    <div style={{ marginTop: '4%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div className={`text-center p-5 ${style.card}`} style={{ background: darkMode ? "#3C5B6F" : "" }}>
                            <h4  className={style.textDaftar1} style={{ fontFamily: 'sans-serif', fontSize: '30px', fontWeight: '500', color: darkMode ? "white" : "" }}>Selamat datang  {getFullname()}!</h4>
                            <h1  className={style.textDaftar} style={{ color: darkMode ? "white" : "" }} >Daftarkan Akun Anda <span style={{ color: '#3A9CBB' }}>Sekarang</span> </h1>

                            {parsedSSOUser ? (
                                <div className={`d-flex justify-content-center mt-4 ${style.gaps}`}>
                                    <div className={`text-center ${style.card2}`}   >
                                        <img src={user1} alt="" />
                                        <h4 style={{ fontFamily: 'sans-serif', fontSize: '21px', fontWeight: '400' }}>Registrasi Sebagai User PTKI</h4>

                                        <Link to="/pendaftaran">
                                            <Button onClick={() => {
                                                localStorage.setItem('lastViewLanding', 'daftar')
                                            }}
                                                variant='contained' className={`${style.button2} rounded-5 px-4 fw-bold`}>DAFTAR DISINI</Button>
                                        </Link>

                                    </div>

                                    <div className={`text-center ${style.card2}`}>
                                        <img className='mt-1' src={user2} alt="" />
                                        <h4 className='mt-1' style={{ fontFamily: 'sans-serif', fontSize: '21px', fontWeight: '400' }}>Registrasi Sebagai User Evaluator</h4>

                                        <Link to="/pendaftaran-assesor">
                                            <Button onClick={() => {
                                                localStorage.setItem('lastViewLanding', 'daftar')
                                            }}
                                                variant='contained' className={`${style.button2} rounded-5 px-4 fw-bold`}>DAFTAR DISINI</Button>
                                        </Link>
                                    </div>

                                </div>
                            ) : 
                                <div>
                                    <Button
                                        variant="none"
                                        style={{
                                            height: "54px",
                                            fontSize: '16px',
                                            fontWeight: "600",
                                            padding: '0px 190px',
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                        }}
                                        className="mt-4 mb-3 rounded-5 btn-primary"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSSOLogin}
                                    >
                                        <span style={{ color: 'blue' }}><img src={pusaka} height='35px' alt="" className='me-2' />Login Pusaka Dengan User Lainnya</span>
                                    </Button>
                                </div>
                            }
                            
                           

                            <p className='mt-5 fw-bold' style={{ color: darkMode ? "white" : "" }} >Butuh bantuan ? <span style={{
                                color: darkMode ? "orange" : "#0089ED",

                            }}>Baca petunjuk berikut</span> </p>
                        </div>
                    </div>

                </section>
            </motion.div>
        </>
    );
};

export default Login;
