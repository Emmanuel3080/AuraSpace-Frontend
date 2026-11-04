import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";

const AuthProvider = ({ children }) => {
  const [submitting, setSubmitting] = useState(false);
  const [sendUserOtp, sendingOtp] = useState(false);

  // Initialize userInfo from localStorage if available
  const [userInfo, setUserInfoState] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [authLoading, setAuthLoading] = useState(true);
  const [showEvents, setShowingEvents] = useState([]);
  const [submitUserLogin, setSubmitUserLogin] = useState(false);
  const [singleBoooking, setSingleBooking] = useState({});

  const navigate = useNavigate();

  // Helper to update both state and localStorage
  const setUserInfo = useCallback((userData) => {
    setUserInfoState(userData);
    try {
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        localStorage.removeItem("user");
      }
    } catch (e) {
      console.error("Failed to sync user to localStorage:", e);
    }
  }, []);

  const handleSignUp = async (userData) => {
    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append("name", userData.name);
      payload.append("email", userData.email);
      payload.append("password", userData.password);
      if (userData.profileImage && userData.profileImage[0]) {
        payload.append("profileImage", userData.profileImage[0]);
      }
      const response = await fetch(`${baseUrl}/user/auth/signup`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      if (data.Status == "Success") {
        toast.success("Account Created Successfully");
        navigate("/user/signin");
      } else {
        toast.error(data.Message || "Sign Up Failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async (formData) => {
    setSubmitUserLogin(true);
    try {
      const response = await fetch(`${baseUrl}/user/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.Status == "Success") {
        const userObj = data.verifyUser || data.user;
        toast.success(`Welcome onboard ${userObj?.name || "Attendee"}`);
        localStorage.setItem("AccessToken", data.accessToken);
        if (userObj) {
          setUserInfo(userObj);
        }
        navigate("/user/dashboard");
      } else {
        toast.error(data.Message || "Sign in failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setSubmitUserLogin(false);
    }
  };

  const forgotPasswordEmail = async (formData) => {
    sendingOtp(true);
    try {
      const response = await fetch(`${baseUrl}/user/auth/forgot/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.Status == "Success") {
        toast.success(
          "Kindly Check your Mail, An Otp has been sent to your Inbox"
        );
        navigate(`/user/verify/otp?email=${data.user.email}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      sendingOtp(false);
    }
  };

  const isUserAuthenticated = useCallback(async () => {
    const userToken = localStorage.getItem("AccessToken");
    if (!userToken) {
      setUserInfo(null);
      return false;
    }
    try {
      const response = await fetch(`${baseUrl}/user/auth/verify/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();

      if (data.Status == "Success" && data.user) {
        setUserInfo(data.user);
        return true;
      } else {
        localStorage.removeItem("AccessToken");
        setUserInfo(null);
        return false;
      }
    } catch (error) {
      console.log("Token verification error:", error);
      return false;
    }
  }, [setUserInfo]);

  // Restore attendee profile automatically on initial app load / refresh
  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      isUserAuthenticated().finally(() => {
        setAuthLoading(false);
      });
    } else {
      setAuthLoading(false);
    }
  }, [isUserAuthenticated]);

  const displayEvents = async () => {
    try {
      const token = localStorage.getItem("AccessToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${baseUrl}/user/event/all`, { headers });
      if (!response.ok) {
        console.warn("displayEvents response not ok:", response.status);
        setShowingEvents([]);
        return;
      }
      const data = await response.json();
      if (data && Array.isArray(data.events)) {
        setShowingEvents(data.events);
      } else if (Array.isArray(data)) {
        setShowingEvents(data);
      } else {
        setShowingEvents([]);
      }
    } catch (error) {
      console.log(error);
      setShowingEvents([]);
    }
  };

  const getSingleBooking = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/user/booking/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      });

      const data = await response.json();
      setSingleBooking(data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("AccessToken");
    try {
      if (token) {
        await fetch(`${baseUrl}/user/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("AccessToken");
      setUserInfo(null);
      toast.success("Logged out successfully");
      navigate("/user/signin");
    }
  };

  const authValue = {
    handleSignUp,
    submitting,
    handleSignIn,
    submitUserLogin,
    forgotPasswordEmail,
    sendUserOtp,
    isUserAuthenticated,
    refreshUserProfile: isUserAuthenticated,
    userInfo,
    setUserInfo,
    authLoading,
    displayEvents,
    showEvents,
    getSingleBooking,
    singleBoooking,
    handleLogout,
  };

  return (
    <authContext.Provider value={authValue}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
