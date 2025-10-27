import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL;

// console.log(baseUrl);

const AuthProvider = ({ children }) => {
  const [submitting, setSubmitting] = useState(false);
  const [sendUserOtp, sendingOtp] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showEvents, setShowingEvents] = useState([]);
  const [submitUserLogin, setSubmitUserLogin] = useState(false);

  const [singleBoooking, setSingleBooking] = useState({});

  const navigate = useNavigate();
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
        headers: {
          //   "Content-Type": "application/json",
          // "muli"
        },

        body: payload,
      });
      //   console.log("djdjd");

      const data = await response.json();
      if (data.Status == "Success") {
        toast.success("Account Created Successfully");
        navigate("/user/signin");
      } else {
        toast.error(data.Message || "Sign Up Failed");
      }
      //   return data;
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
        toast.success(`Welcome onboard ${data.verifyUser.name}`);
        localStorage.setItem("AccessToken", data.accessToken);
        navigate("/user/dashboard");
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
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

  const isUserAuthenticated = async () => {
    const userToken = localStorage.getItem("AccessToken");
    if (!userToken) {
      // toast.error()
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

      if (data.Status == "Success") {
        setUserInfo(data.user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayEvents = async () => {
    // setShowingEvents(true);
    try {
      const response = await fetch(`${baseUrl}/user/event/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      });
      const data = await response.json();
      setShowingEvents(data.events);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      // setShowingEvents(false);
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
      console.log(data);
      setSingleBooking(data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("AccessToken");
    try {
      const response = await fetch(`${baseUrl}/user/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      // console.log(data);
      if (data.Status == "Success") {
        toast.success("Log out Successful");
        navigate("/user/signin");
        localStorage.removeItem("AccessToken");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const BookTicket
  const authValue = {
    handleSignUp,
    submitting,
    handleSignIn,
    submitUserLogin,
    forgotPasswordEmail,
    sendUserOtp,
    isUserAuthenticated,
    userInfo,
    displayEvents,
    showEvents,
    getSingleBooking,
    singleBoooking,
    handleLogout,
  };
  return (
    <>
      <authContext.Provider value={authValue}>{children}</authContext.Provider>
    </>
  );
};

export default AuthProvider;
