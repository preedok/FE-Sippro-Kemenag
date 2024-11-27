import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Box, Stack } from '@mui/material';
import style from '../login/style.module.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../../utils/DarkModeContext';
import bgRight from '../../../assets/campus.jpg'
import logoSrc from '../../../assets/logo.svg'
import pusaka from '../../../assets/pusak.svg'
import { styled } from '@mui/system';

const Login = () => {
  const { darkMode } = useDarkMode()
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 500, easing: 'ease-in-out', once: true });
  });
  // Styled components
  const LogoContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 24,
  });
  const Logo = styled('img')({
    width: 80,
    height: 80,
  });
  const LoginButton = styled(Button)(({ theme }) => ({
    color: darkMode ? `white` : theme.palette.primary.main,
    borderRadius: 8,
    padding: '10px 0',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    border: darkMode ? `2px solid white` : `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderColor: theme.palette.primary.main,
      transform: 'scale(1.02)',
    },
  }));
  const AnimatedText = ({ text, gradient }) => (
    <motion.div
      className="animated-text"
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: '1.85rem',
        fontWeight: 900,
        background: gradient,
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} className="char" variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
  const AnimatedTextTwo = ({ text, gradient }) => (
    <motion.div
      className="animated-text"
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: '1.1rem',
        fontWeight: 900,
        background: gradient,
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} className="char" variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
  const AnimatedInstructionText = ({ text, color }) => (
    <motion.div
      className="animated-text"
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: '0.9rem',
        fontWeight: 600,
        color: color,
        maxWidth: '100%',
        marginBottom: '20px',
        textAlign: 'center'
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} className="char" variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Helmet>
        <title>Kemenag | Login</title>
      </Helmet>
      <section
        className={` ${style.backgroundRow} d-flex align-items-center`}
        style={{ backgroundColor: darkMode ? "#17153B" : "", overflow: 'hidden' }}
      >
        {/* Form Login di sebelah kiri, centered vertically */}
        <div className=" col-12 col-md-8 col-lg-6 d-flex justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <motion.div
              className={style.cardLogin1}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <LogoContainer>
                <Logo src={logoSrc} alt="Logo" />
                {/* <Logo1 src={bgSipro} alt="Pusaka" /> */}
              </LogoContainer>
              <Stack alignItems="center">
                <AnimatedText
                  text="Selamat Datang di SIPPRO"
                  gradient={darkMode ? 'white' : 'linear-gradient(45deg, #0000FF, #800080)'}
                />
                <AnimatedTextTwo
                  text="Sistem Informasi Pengajuan Program Studi Baru"
                  gradient={darkMode ? 'white' : 'linear-gradient(45deg, #0000FF, #800080)'}
                />

                <AnimatedInstructionText
                  text="Silahkan Login dengan Pusaka untuk melanjutkan ke sistem layanan kami"
                  color={darkMode ? '#BBBBBB' : '#666666'}
                />
              </Stack>
              <LoginButton
                fullWidth
                onClick={() => navigate('/loginsso')}
                startIcon={<img src={pusaka} alt="Pusaka Icon" width="32" height="32" />}
              >
                Login SSO Pusaka
              </LoginButton>
            </motion.div>
          </div>
        </div>
        {/* Gambar di sebelah kanan, full height */}
        <div data-aos="fade-up"
          data-aos-delay={100}
          className='position-absolute d-none d-md-block top-0 end-0'
          style={{ width: '50%', height: '100%' }}
        >
          <img src={bgRight} className='p-5' alt="" style={{ borderRadius: '70px', width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>
    </>
  );
};

export default Login;
