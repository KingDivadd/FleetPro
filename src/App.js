import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ChatState } from "context/chatContext";
import Login from "auth/loginPage";
import RecoverPassword from "auth/recover-password";
import SignUp from "auth/signupPage";
import "./index.css";
import Workbay from "pages/assignee/workbay";
import WorkbayReport from "pages/assignee/workbay-report";
import VehicleLog from 'pages/assignee/vehicle-log'
import VehicleLogReport from "pages/assignee/vehicle-log-report";
import VehiclePage from 'pages/assignee/vehicle-page'
import Report from 'pages/assignee/reports'
import LandingPage from 'pages/landing-page'
import VehicleService from "pages/maint/vehicle-service";
import VehicleServiceReport from "pages/maint/vehilce-service-report";
import ServiceHistory from "pages/maint/service-history"
import ServiceHistoryReport from "pages/maint/service-history-report";
import Vehicles from "pages/admin/vehicle";
import VehicleReport from 'pages/admin/vehicle-report'
import Drivers from "pages/admin/driver";
import Dash from "pages/dashboard";
import Assignee from "pages/admin/assignee";


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
            {/* Will make a better not found page later */}
              <Route path="*" element={<LandingPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/dashboard" element={<Dash />} />
              <Route path="/workbay" element={<Workbay />} />
              <Route path="/workbay/:id" element={<WorkbayReport />} />
              <Route path="/vehicle-log" element={<VehicleLog />} />
              <Route path="/vehicle-log/:id" element={<VehicleLogReport />} />
              <Route path="/vehicle" element={<VehiclePage />} />
              <Route path="/reports" element={<Report />} />
              <Route path="/vehicle-service" element={<VehicleService />} />
              <Route path="/vehicle-service/:id" element={<VehicleServiceReport />} />
              <Route path="/service-history" element={<ServiceHistory />} />
              <Route path="/service-history/:id" element={<ServiceHistoryReport />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleReport />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/drivers/:id" element={<Drivers />} />
              <Route path="/assignee" element={<Assignee />} />

              {/* <Route
                path="/home"
                element={persistData.isAuth ? <HomePage /> : <Navigate to="/" />}
              /> */}
              {/* <AlertMessage /> */}
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
