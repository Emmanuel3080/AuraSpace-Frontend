import React, { useContext, useEffect } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminProtectedRoute = () => {
  const { isAdminAuthenticated, userInfo } = useContext(adminAuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await isAdminAuthenticated();
        if (!isAuth) {
          toast.error("Kindly Sign In");
          navigate("/admin/signin");
        } else {
          // navigate("/admin/dashboard");
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

export default AdminProtectedRoute;
