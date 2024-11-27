import React, { useState, useEffect } from 'react';
import { Avatar, Button, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { ExitToApp, Dashboard, HowToReg } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../../../context/AuthContext';
import getRolePath from '../../../../utils/RolePath';
import { getFullname } from '../../../../utils/token';
import Cookies from 'js-cookie';
const UserMenu = ({ darkMode }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, userRole, logout, isLoading } = useAuth();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClick = (path) => {
        navigate(path);
        handleClose();
    };
    const handleLogout = () => {
        logout(); // Call the logout method from AuthContext
        Swal.fire({
            icon: 'success',
            title: 'Logged Out Successfully',
            text: 'You have been safely logged out.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            navigate('/login');
        });
    };
    const getAvatarLetter = () => {
        if (isAuthenticated) {
            const fullname = getFullname();
            return fullname.charAt(0).toUpperCase();
        }
        return 'G';
    };
    const getDisplayName = () => {
        if (isAuthenticated) {
            return getFullname();
        }
        return 'Guest';
    };
    if (isLoading) {
        return null;
    }
    const ssoUser = Cookies.get('ssoUser');
    let parsedSSOUser = null;
    if (ssoUser) {
        try {
            parsedSSOUser = JSON.parse(ssoUser);
        } catch (error) {
            console.error("Error parsing ssoUser cookie:", error);
        }
    }
    console.log('Current ssoUser cookie:', parsedSSOUser);
    return (
        <>
            <Button
                onClick={handleClick}
                startIcon={
                    <Avatar sx={{ width: 30, height: 30 }}>{getAvatarLetter()}</Avatar>
                }
                style={{ textTransform: 'none', color: darkMode ? "white" : "", fontSize: '18px', marginTop: '-3px', fontWeight: '600' }}
            >
                {getDisplayName()}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isAuthenticated
                    ? [
                        <>
                            {!parsedSSOUser && (
                                <MenuItem key="dashboard" onClick={() => handleMenuClick(getRolePath(userRole))}>
                                    <Dashboard sx={{ mr: 1 }} />
                                    <Typography variant="inherit">Dashboard</Typography>
                                </MenuItem>
                            )}
                            <Divider key="divider" />,
                            <MenuItem key="logout" onClick={handleLogout}>
                                <ExitToApp sx={{ mr: 1 }} />
                                <Typography variant="inherit">Logout</Typography>
                            </MenuItem>
                        </>
                    ]
                    : (
                        <MenuItem onClick={() => handleMenuClick('/login')}>
                            <ExitToApp sx={{ mr: 1 }} />
                            <Typography variant="inherit">Login</Typography>
                        </MenuItem>
                    )}
            </Menu>
        </>
    );
};

export default UserMenu;
