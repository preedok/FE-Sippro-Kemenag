import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import { Helmet } from "react-helmet";
import { GetApiBaseUrl } from '../../../utils/env';
import style from "./style.module.css";
import logo from "../../../assets/logo.svg";
import axios from "axios";
import elipse3 from "../../../assets/Ellipse 3.svg";
import elipse4 from "../../../assets/Ellipse 4.svg";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const baseUrl = GetApiBaseUrl();
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);
    const token = urlParams.get('token');
    const resetPassword = async () => {
        if (token && password && confirmPassword && password === confirmPassword) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${baseUrl}/auth/resetpassword`, null, {
                    params: {
                        token: token,
                        password: password,
                    },
                });

                if (response.status === 200) {
                    if (response.data.message === "Invalid or expired token.") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Invalid or expired token.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: response.data.message,
                        });
                        navigate('/login');
                    }
                } else {
                    console.error('Password reset failed.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Password reset failed.'
                    });
                }
            } catch (error) {
                console.error('Password reset failed:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${error.message}`
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Error!',
                text: 'Konfirmasi Password Salah',
            });
        }
    };


    return (
        <>
            <Helmet>
                <title>Kemenag | Reset Password</title>
            </Helmet>


            <div
                className={`${style.main} ${style.customBackground} position-relative`}
                style={{ padding: "40px 32px", marginLeft: "auto" }}
            >
                <img
                    src={elipse4}
                    alt=""
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: 1,
                    }}
                />
                <img
                    src={elipse3}
                    alt=""
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        zIndex: 1,
                    }}
                />
                <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <div
                        style={{ zIndex: 2 }}
                        className={`container p-4 ${style.card3}`}
                    >
                        <div className="d-flex gap-3">
                            <img src={logo} className={style.logos} alt="" />
                            <h4 className={`${style.judul}`}>Reset Password</h4>
                        </div>
                        <hr />
                        <div className="gap-4">
                            <input
                                type="password"
                                placeholder="Masukkan Password"
                                value={password}
                                className="form-control mb-3 p-3"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Konfirmasi Password"
                                value={confirmPassword}
                                className="form-control mb-3 p-3"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button className="btn p-2 ms-auto d-flex btn-primary" type="submit" onClick={resetPassword}>
                                {isLoading ? "Loading..." : "Reset Password"}
                            </button>
                           
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
};

export default ResetPassword;


