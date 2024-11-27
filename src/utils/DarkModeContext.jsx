import React, { createContext, useState, useContext, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // useEffect(() => {
    //     const checkTime = () => {
    //         const now = new Date();
    //         const hours = now.getHours();

    //         // Anggap malam adalah antara jam 18:00 (6 PM) dan 6:00 (6 AM)
    //         if (hours >= 18 || hours < 6) {
    //             setDarkMode(true);
    //         } else {
    //             setDarkMode(false);
    //         }
    //     };

    //     // Periksa waktu saat komponen dimount
    //     checkTime();

    //     // // Set interval untuk memeriksa waktu setiap menit
    //     // const interval = setInterval(checkTime, 60000);

    //     // // Bersihkan interval saat komponen di-unmount
    //     // return () => clearInterval(interval);
    // }, []);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);