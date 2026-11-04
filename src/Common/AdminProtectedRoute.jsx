import React, { useContext, useEffect, useState } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminProtectedRoute = () => {
  const { isAdminAuthenticated } = useContext(adminAuthContext);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const isAuth = await isAdminAuthenticated();
        if (!isAuth) {
          toast.error("Kindly Sign In as Organizer");
          navigate("/admin/signin", { replace: true });
        } else if (isMounted) {
          setChecking(false);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          navigate("/admin/signin", { replace: true });
        }
      }
    };

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium">Verifying organizer credentials...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
