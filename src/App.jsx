import React, { useState, useEffect } from "react";
import Router from "./router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./App.css";
import konek from "./assets/175.jpg";
import { DarkModeProvider } from './utils/DarkModeContext';
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div
        style={{
          paddingLeft: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <img src={konek} width="50%" height="100%" alt="No internet connection" />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DarkModeProvider>
          <Router />
        </DarkModeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;