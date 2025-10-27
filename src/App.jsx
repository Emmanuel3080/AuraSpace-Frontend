import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/userContext";
import SignUp_Page from "./AuthUserPages/SignUp_Page";
import SignIn_Page from "./AuthUserPages/SignIn_Page";
import LandingPage from "./AuthUserPages/LandingPage";
// import AdminSignUp from "./AuthPages/AdminSignUp";
import { Toaster } from "sonner";
import ForgotPasswordPage from "./AuthUserPages/ForgotPasswordPage";
import VerifyOtpPage from "./AuthUserPages/VerifyOtpPage";
import ChangePasswordPage from "./AuthUserPages/ChangePasswordPage";
import DashbaordPage from "./Dashboard/Users/DashbaordPage";
import ProtectedRoute from "./Common/ProtectedRoute";
import AdminSignUpPage from "./AdminAuthPages/AdminSignUpPage";
import AdminSign_InPage from "./AdminAuthPages/AdminSign_InPage";
import AdminProvider from "./Context/adminAuthContext";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import AdminProtectedRoute from "./Common/AdminProtectedRoute";
import AdminForgotPasswordpage from "./AdminAuthPages/forgetPasswordpageAdmin";
import AdminVerifyOtp from "./AdminAuthPages/AdminVerifyOtp";
import AdminChangePassword from "./AdminAuthPages/AdminChangePassword";
import AddEventsPage from "./AdminApp/AddEventsPage";
import AdminEventsPage from "./Dashboard/Admin/AdminEventsPage";
import UpdateSinglePage from "./Dashboard/Admin/UpdateSinglePage";
import AdminSalesDasboard from "./Dashboard/Admin/AdminSalesDasboard";
import AdminSettings from "./Dashboard/Admin/AdminSettings";
import SingleEventsPage from "./Common/SingleEventsPage";
import MyTickets from "./Dashboard/Users/MyTickets";
import AllEventsPage from "./Dashboard/Users/AllEventsPage";
import About from "./Dashboard/Users/AboutUspage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>Welcome To AuraSpace</h1> */}

      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <Toaster
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "500",
                  padding: "12px",
                  fontFamily: "sans-serif",
                  boxShadow: "0px 0px 2px purple",
                },
              }}
            />
            <Routes>
              <Route path="/accountType" element={<LandingPage />} />
              <Route path="/forgot/password" element={<ForgotPasswordPage />} />
              <Route path="/user/verify/otp" element={<VerifyOtpPage />} />
              {/* <Route path="/admin/createAccount" element={<AdminSignUp />} /> */}
              <Route
                path="/user/change/password"
                element={<ChangePasswordPage />}
              />

              <Route path="/user/signup" element={<SignUp_Page />} />
              <Route path="/user/signin" element={<SignIn_Page />} />

              {/*user Protected Route */}
              <Route element={<ProtectedRoute />}>
                <Route path="/user/dashboard" element={<DashbaordPage />} />
                <Route path="/event/:eventId" element={<SingleEventsPage />} />
                <Route path="/tickets/:bookingId" element={<MyTickets />} />
                <Route path="/events" element={<AllEventsPage />} />
                <Route path="/about" element={<About/>} />
              </Route>

              {/* Admin protected Route */}
              <Route path="/admin/signup" element={<AdminSignUpPage />} />
              <Route path="/admin/signin" element={<AdminSign_InPage />} />
              <Route
                path="/admin/forgot/password"
                element={<AdminForgotPasswordpage />}
              />
              <Route
                path="/admin/change/password"
                element={<AdminChangePassword />}
              />
              <Route path="/admin/verify/otp" element={<AdminVerifyOtp />} />
              {/* Admin Protected Route */}
              <Route element={<AdminProtectedRoute />}>
                <Route
                  path="/overview/event/:eventId"
                  element={<AdminEventsPage />}
                />
                <Route path="/account" element={<AdminSettings />} />
                <Route path="/dashboard" element={<AdminSalesDasboard />} />

                <Route
                  path="/admin/update/:eventId"
                  element={<UpdateSinglePage />}
                />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/create/events" element={<AddEventsPage />} />
              </Route>
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
