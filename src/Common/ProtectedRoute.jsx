import React, { useContext, useEffect } from "react";
import { authContext } from "../Context/userContext";
import { toast } from "sonner";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isUserAuthenticated, userInfo } = useContext(authContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userAuthState = await isUserAuthenticated();
        if (!userAuthState) {
          toast.error("Kindly Sign In");
          navigate("/user/signin");
        } else {
          // navigate("/user/dashboard");
          //   toast.success("Welcome To Dashboard Page");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
