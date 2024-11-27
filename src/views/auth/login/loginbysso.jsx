import React, { useEffect, useState,useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StartLoading, CloseLoading } from '../../../utils/swal2';
import Swal from "sweetalert2";
import { GetApiBaseUrl } from '../../../utils/env';
import { setAuth, setSSOuser, setSSOAuth, getToken, getRole, getUserId, getValidToken, getTokenWValidate } from '../../../utils/token';
import './loginbysso.css';
import style from '../login/style.module.css'
import { useAuth } from '../../../context/AuthContext';

const LoginBySSO = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const baseUrl = GetApiBaseUrl();
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const [errorMessage, setErrorMessage] = useState(null);
    const { login } = useAuth();
    const loginAttempted = useRef(false);
    useEffect(() => {
        const fetchData = async () => {
            if (code && !loginAttempted.current) {
                loginAttempted.current = true;
                StartLoading('Please Wait');
                try {
                    const response = await axios.post(`${baseUrl}/auth/ssologin`, null, {
                        params: { code, state },
                    });
                    CloseLoading();

                    if (response.status === 200) {
                        const user = response.data.data;
                        await setSSOAuth(user.jwtToken, user.refreshToken);
                        if(user.user)
                        await setSSOuser(user.user);

                        const savedToken = getToken();
                        console.log("Saved token after SSO login:", savedToken);

                        await login();
                        const role = getRole(); 
                        const redirectTo = (role === 'Kasubdit' || role === 'Subdit')
                            ? '/kasubdit/beranda'
                            : (role === 'Bendahara')
                                ? '/bendahara/report'
                                : '/';
                        Swal.fire({
                            title: 'Login Successful!',
                            text: 'You will be redirected shortly.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                            willClose: () => {
                                navigate(redirectTo);
                                // window.location.reload();
                            }
                        });
                    } else {
                        throw new Error('Login Failed. User not found.');
                    }
                } catch (error) {
                    CloseLoading();
                    console.error("SSO Login Error:", error);
                    
                    let errorMsg = 'Login Failed. Please try again.';
                    if (error.response) {
                        if (error.response.status === 400) {
                            errorMsg = 'SSO login failed. The link may have expired or already been used. Please try logging in again.';
                        } else if (error.response.data && error.response.data.message) {
                            errorMsg = error.response.data.message;
                        }
                    }
                    
                    Swal.fire({
                        title: 'Login Error',
                        text: errorMsg,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/login');
                    });
                }
            } else if (!code) {
                navigate('/login');
            }
        };
        fetchData();
    }, [code, baseUrl, navigate, state, login]);
    return (
        <section className={`${style.backgroundRow} d-flex justify-content-center align-items-center`} style={{ overflow: 'hidden' }}>
            <div className="login-content">
                <h1>Logging in using SSO...</h1>
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LoginBySSO;