import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const adminAuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL;
// console.log(baseUrl);

const AdminProvider = ({ children }) => {
  const [submitting, setSubmiting] = useState(false);
  const [submitAdminLogin, setAdminLogin] = useState(false);
  const [userInfo, setuserInfo] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [submitEventForm, setSubmittingEventForm] = useState(false);
  const [adminSingleEvent, setAdminSingleEvents] = useState({});
  const [adminEvents, setAdminEvents] = useState([]);
  const [userBookingInfo, setUserBookingInfo] = useState([]);
  const [numberOfBookedTicket, setBookedTicket] = useState(0);
  const navigate = useNavigate();
  const [updateEventData, setUpdatingEvent] = useState(false);
  const adminSignUp = async (adminData) => {
    setSubmiting(true);
    try {
      const payload = new FormData();
      payload.append("OrganizerName", adminData.OrganizerName);
      payload.append("accountNumber", adminData.accountNumber);
      payload.append("bankAccount", adminData.bankAccount);
      payload.append("email", adminData.email);
      payload.append("password", adminData.password);
      payload.append("PhoneNumber", adminData.PhoneNumber);
      if (adminData.AdminProfileImg && adminData.AdminProfileImg[0]) {
        payload.append("AdminProfileImg", adminData.AdminProfileImg[0]);
      }
      const response = await fetch(`${baseUrl}/admin/signup`, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/json",
        },
        body: payload,
      });
      const data = await response.json();
      if (data.Status == "Success") {
        toast.success("Sign Up Successful");
        navigate("/admin/signin");
      } else {
        toast.error(data.Message || "Sign Up Failed");
      }
    } catch (error) {
    } finally {
      setSubmiting(false);
    }
  };

  const adminSignIn = async (formData) => {
    setAdminLogin(true);
    try {
      const response = await fetch(`${baseUrl}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (data.Status == "Success") {
        //  "Status": "Success",
        toast.success(`Welcome onboard ${data.user.OrganizerName} `);
        localStorage.setItem("AdminAccessToken", data.accesToken);
        navigate("/dashboard");
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAdminLogin(false);
    }
  };

  const adminLogout = async () => {
    const token = localStorage.getItem("AdminAccessToken");
    try {
      const response = await fetch(`${baseUrl}/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        toast.success("Logging Out....");
        localStorage.removeItem("AdminAccessToken");
        navigate("/admin/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isAdminAuthenticated = async () => {
    const getToken = localStorage.getItem("AdminAccessToken");
    if (!getToken) {
      return false;
    }
    try {
      const response = await fetch(`${baseUrl}/admin/verify/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      const data = await response.json();
      if (data.Status == "Success") {
        // console.log(data);

        setuserInfo(data.user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordReset = async (formData) => {
    setSendOtp(true);
    try {
      const response = await fetch(`${baseUrl}/admin/send/otp`, {
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
        navigate(`/admin/verify/otp?email=${data.user.email}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSendOtp(false);
    }
  };

  const CreateEvent = async (formData) => {
    setSubmittingEventForm(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      payload.append("location", formData.location);
      payload.append("eventDate", formData.eventDate);
      payload.append("endTime", formData.endTime);
      payload.append("startTime", formData.startTime);
      payload.append("eventDuration", formData.eventDuration);
      // payload.append("eventMode", payload.eventMode);
      // payload.append("meetingLink", payload.meetingLink);
      // payload.append("priceCategory", payload.priceCategory);
      payload.append("TicketsAvailable", formData.TicketsAvailable);
      payload.append("price", formData.price);

      if (formData.coverImage && formData.coverImage[0]) {
        payload.append("coverImage", formData.coverImage[0]);
      }
      const response = await fetch(`${baseUrl}/admin/add/event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
        },
        body: payload,
      });

      const data = await response.json();
      const managerId = data.event.createdBy;
      if (data.Status == "Success") {
        toast.success(data.Message);
        navigate(`/dashboard`);
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittingEventForm(false);
    }
  };

  const getAdminEvents = async (managerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/admin/events/manager/${managerId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.Status == "Success") {
        setAdminEvents(data.events);
      }
      // else
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleEvents = async (id) => {
    setUpdatingEvent(true);
    try {
      const response = await fetch(`${baseUrl}/admin/event/${id}`);
      const data = await response.json();
      if (data.Status == "Success") {
        setAdminSingleEvents(data.event);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingEvent(false);
    }
  };

  // const
  // const generateNewOtp = async()=>{
  //   try {

  //   } catch (error) {

  //   }
  // }

  const getUserBookings = async (id) => {
    try {
      const bookings = await fetch(
        `${baseUrl}/admin/bookings/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
          },
        }
      );

      const data = await bookings.json();
      console.log(data);
      if (data.Status == "Success") {
        console.log(data);
        setUserBookingInfo(data.userBookingCount);
        setBookedTicket(data.No_of_Bookings);
      } else {
        // toast.error("Booking Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const authValue = {
    // greet,
    adminSignUp,
    submitting,
    adminSignIn,
    submitAdminLogin,
    isAdminAuthenticated,
    userInfo,
    handlePasswordReset,
    sendOtp,
    submitEventForm,
    CreateEvent,
    getAdminEvents,
    adminEvents,
    getSingleEvents,
    adminSingleEvent,
    updateEventData,
    adminLogout,
    getUserBookings,
    userBookingInfo,
    numberOfBookedTicket
  };

  return (
    <>
      <adminAuthContext.Provider value={authValue}>
        {children}
      </adminAuthContext.Provider>
    </>
  );
};

export default AdminProvider;
