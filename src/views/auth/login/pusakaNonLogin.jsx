import React, { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import style from '../login/style.module.css'
import AOS from "aos";
import "aos/dist/aos.css";
import swal from 'sweetalert';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import api from '../../service/api';
import { useDarkMode } from '../../../utils/DarkModeContext';
import pusaka from '../../../assets/pusak.svg'
import { GetApiBaseUrl } from '../../../utils/env';
import { refreshToken, isTokenExpired, isAuth, setAuth, getValidToken, getRole } from '../../../utils/token';
import getRolePath from '../../../utils/RolePath';

const PusakaNonLogin = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleSSOCallback = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');
      const returnedState = query.get('state');
      const storedState = sessionStorage.getItem('sso_pusaka_state');

      if (code) {
        if (returnedState !== storedState) {
          alert('Invalid state parameter. Please try logging in again.');
          return;
        }
        sessionStorage.removeItem('sso_pusaka_state');

        try {
          const response = await api.post(`/auth/redirectsso`, null, {
            params: { code },
          });

          const { refreshToken, jwtToken } = response.data.data;

          // Simpan tokens ke cookie
          setAuth(jwtToken, refreshToken);

          // if (isTokenExpired(jwtToken)) {
          //   alert('Token expired. Please log in again.');
          //   return;
          // }
          if (isTokenExpired(jwtToken)) {
            // Attempt to refresh the token
            const newToken = await refreshToken(); // Call the refresh function
            if (!newToken) {
              swal({
                title: "Token Expired",
                text: "Token expired and refresh failed. Please log in again.",
                icon: "error",
                button: "OK",
              });
              navigate('/login');
              return;
            }
          }
          const role = getRole();
          const redirectTo = (role === 'Kasubdit' || role === 'Bendahara' || role === 'Subdit') ? '/kasubdit/beranda' : '/';
          navigate(redirectTo);
        } catch (error) {
          alert('Login Failed. Please try again.');
        }
      }
    };

    handleSSOCallback();
  }, [location.search, navigate]);
  useEffect(() => {
    AOS.init({ duration: 500, easing: 'ease-in-out', once: true });
  }, []);
  return (
    <>
      <Helmet>
        <title>Kemenag | Login</title>
      </Helmet>
      <section
        className={`d-flex justify-content-center align-items-center ${style.backgroundRow}`}
        style={{ backgroundColor: darkMode ? "#17153B" : "", overflow: 'hidden' }}
      >
        <div className="card position-relative w-100 bg-white shadow-lg border-0 overflow-hidden" style={{ maxWidth: '30rem' }}>
          <div className="position-absolute top-0 start-0 w-100 h-100" />
          <div className="card-body d-flex flex-column align-items-center p-5 position-relative">
            <img
              src={pusaka}
              alt="Pusaka Logo"
              className="mb-4"
              style={{ width: '6rem', height: '6rem', objectFit: 'cover' }}
            />
            <p className="fw-bold mb-2 text-center" style={{ color: '#496989', fontSize: '35px' }}>Login Via Pusaka</p>
            <button
              className="btn btn-primary w-100 py-2 my-2 fs-5 fw-semibold rounded-pill"
              style={{
                background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                border: 'none',
                transition: 'all 0.3s'
              }}
              onClick={() => navigate('/loginsso')}
            >
              <span className='px-5'>Login</span>
            </button>
            <p className="mt-4 small text-dark text-center" style={{ maxWidth: '20rem' }}>
              Dengan klik Login, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi SSO Pusaka
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PusakaNonLogin;
