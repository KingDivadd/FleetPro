import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ChatState } from "context/chatContext";
// import Login from "auth/loginPage";
// import RecoverPassword from "auth/recover-password";
// import SignUp from "auth/signupPage";
import "./index.css";
import HomePage from "pages/home";



function App() {
  const {isAuth, setIsAuth, mode, persistData} = ChatState()
  const theme = useMemo(() => createTheme(themeSettings(persistData.mode)), [persistData.mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));

  

  return (
    <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
