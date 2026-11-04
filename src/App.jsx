import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AuthProvider from "./Context/userContext";
import AdminProvider from "./Context/adminAuthContext";

// Auth & Public Pages
import SignUp_Page from "./AuthUserPages/SignUp_Page";
import SignIn_Page from "./AuthUserPages/SignIn_Page";
import LandingPage from "./AuthUserPages/LandingPage";
import ForgotPasswordPage from "./AuthUserPages/ForgotPasswordPage";
import VerifyOtpPage from "./AuthUserPages/VerifyOtpPage";
import ChangePasswordPage from "./AuthUserPages/ChangePasswordPage";

// Discovery & Attendee Experience
import DashbaordPage from "./Dashboard/Users/DashbaordPage";
import AllEventsPage from "./Dashboard/Users/AllEventsPage";
import SingleEventsPage from "./Common/SingleEventsPage";
import MyTickets from "./Dashboard/Users/MyTickets";
import About from "./Dashboard/Users/AboutUspage";
import ProtectedRoute from "./Common/ProtectedRoute";

// Admin Auth & Organizer Experience
import AdminSignUpPage from "./AdminAuthPages/AdminSignUpPage";
import AdminSign_InPage from "./AdminAuthPages/AdminSign_InPage";
import AdminForgotPasswordpage from "./AdminAuthPages/forgetPasswordpageAdmin";
import AdminVerifyOtp from "./AdminAuthPages/AdminVerifyOtp";
import AdminChangePassword from "./AdminAuthPages/AdminChangePassword";
import AdminProtectedRoute from "./Common/AdminProtectedRoute";
import AdminSalesDasboard from "./Dashboard/Admin/AdminSalesDasboard";
import AdminEventsPage from "./Dashboard/Admin/AdminEventsPage";
import AddEventsPage from "./AdminApp/AddEventsPage";
import UpdateSinglePage from "./Dashboard/Admin/UpdateSinglePage";
import AdminSettings from "./Dashboard/Admin/AdminSettings";


// import "/"
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Toaster
            richColors
            closeButton
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "12px 16px",
                fontFamily: "Inter, sans-serif",
                border: "1px solid #E9E9E7",
                boxShadow: "0 4px 12px rgba(17, 24, 39, 0.08)",
              },
            }}
          />

          <Routes>
            {/* Account Selection */}
            <Route path="/accountType" element={<LandingPage />} />

            {/* Attendee Auth */}
            <Route path="/user/signup" element={<SignUp_Page />} />
            <Route path="/user/signin" element={<SignIn_Page />} />
            <Route path="/forgot/password" element={<ForgotPasswordPage />} />
            <Route path="/user/verify/otp" element={<VerifyOtpPage />} />
            <Route path="/user/change/password" element={<ChangePasswordPage />} />

            {/* Public Attendee Discovery Experience (Luma / DICE style) */}
            <Route path="/" element={<DashbaordPage />} />
            <Route path="/user/dashboard" element={<DashbaordPage />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/event/:eventId" element={<SingleEventsPage />} />
            <Route path="/about" element={<About />} />

            {/* Authenticated Attendee Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/tickets/:bookingId" element={<MyTickets />} />
            </Route>

            {/* Organizer Auth */}
            <Route path="/admin/signup" element={<AdminSignUpPage />} />
            <Route path="/admin/signin" element={<AdminSign_InPage />} />
            <Route path="/admin/forgot/password" element={<AdminForgotPasswordpage />} />
            <Route path="/admin/change/password" element={<AdminChangePassword />} />
            <Route path="/admin/verify/otp" element={<AdminVerifyOtp />} />

            {/* Organizer Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/dashboard" element={<AdminSalesDasboard />} />
              <Route path="/admin/dashboard" element={<AdminSalesDasboard />} />
              <Route path="/create/events" element={<AddEventsPage />} />
              <Route path="/overview/event/:eventId" element={<AdminEventsPage />} />
              <Route path="/admin/update/:eventId" element={<UpdateSinglePage />} />
              <Route path="/account" element={<AdminSettings />} />
            </Route>
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
