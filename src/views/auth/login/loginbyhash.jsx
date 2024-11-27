import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { StartLoading } from '../../../utils/swal2';
import { GetApiBaseUrl } from '../../../utils/env';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setSSOuser, setSSOAuth, getToken} from '../../../utils/token';

const LoginByHash = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const baseUrl = GetApiBaseUrl();
    // Get the `hash` from query parameters
    const rawHashValue = searchParams.get('hash');
    console.log("read params");
    console.log(rawHashValue);
    // Adjust the padding for base64 string
    const remainder = rawHashValue?.length % 4;
    const hashValue = remainder === 0 ? rawHashValue : rawHashValue + '='.repeat(4 - remainder);
    const { login } = useAuth();  // Get login method from context
    useEffect(() => {
      const fetchData = async () => {
        if (hashValue) {
            StartLoading('Please Wait');
            axios
                .post(`${baseUrl}/auth/checkloginbyhash`, null, {
                    params: {
                        base64Data: hashValue,
                    },
                })
                .then(async (response) => {
                    if (response.status === 200) {
                        const user = response.data.data;
                        await setSSOAuth(user.jwtToken, user.refreshToken);
                        await setSSOuser(user.user);

                        console.log("response.user", user);

                        const savedToken = getToken();
                        console.log("Saved token after SSO login:", savedToken);

                        await login();

                        // role condition
                        if (user.role === 'User') {
                            navigate('/ptki');
                        } else if (user.role === 'AsesorInstitusi') {
                            navigate('/asesor');
                        } else {
                            navigate('/kasubdit');
                        }
                    } else {
                        // handle login failed
                        const confirmed = window.confirm('Login Failed. User not found. OK to redirect to login page.');
                        if (confirmed) {
                            navigate('/login'); // Redirect to login page
                        }
                    }
                })
                .catch((err) => {
                    alert(err);
                    // handle login failed
                    const confirmed = window.confirm('Login Failed.  OK to redirect to login page.');
                    if (confirmed) {
                        navigate('/login'); // Redirect to login page
                    }
                });
        }
      }
      fetchData();
    }, [hashValue, baseUrl, navigate, login]);
    return (
        <div>
            <h1>Logging in using Hash...</h1>
        </div>
    );
};

export default LoginByHash;