import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, isTokenExpired,getRole, refreshToken, isAuth, clearAuth as clearAuthUtil, getTokenWValidate } from '../utils/token';
import axios from 'axios';

const AuthContext = createContext(null);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const checkAuth = async () => {
        console.log("AuthProvider: Checking authentication...");
        try {
            let token = await getToken();
            if(token)
            {
                if(isTokenExpired(token)) token = await refreshToken();
            }
            const validToken = getTokenWValidate();
            if (validToken) {
                console.log("AuthProvider: Valid token found, setting isAuthenticated to true");
                setIsAuthenticated(true);
                const role = getRole();
                console.log("AuthProvider: User role:", role);
                setUserRole(role);
            } else {
                console.log("AuthProvider: No valid token found, setting isAuthenticated to false");
                setIsAuthenticated(false);
                setUserRole(null);
            }
        } catch (error) {
            console.error("AuthProvider: Error during authentication check:", error);
            setIsAuthenticated(false);
            setUserRole(null);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        checkAuth();

        //Set up interceptor for token refresh
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log(error);
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const newToken = await refreshToken();
                        if (newToken) {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                            return axios(originalRequest);
                        }
                    } catch (refreshError) {
                        console.error("Failed to refresh token:", refreshError);
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Clean up function
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);
    const login = async () => {
        const authInfo = isAuth();
        if (authInfo) {
            setIsAuthenticated(true);
            setUserRole(authInfo.role);
        }
    };
    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        clearAuthUtil();
    };
    const clearAuthState = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        clearAuthUtil();
    };
    const value = {
        isAuthenticated,
        isLoading,
        userRole,
        setIsAuthenticated,
        setUserRole,
        checkAuth,
        login,
        logout,
        clearAuthState
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Make sure both AuthProvider and useAuth are exported
export { AuthProvider, useAuth, getToken };