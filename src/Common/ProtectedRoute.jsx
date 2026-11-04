import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/userContext";
import { toast } from "sonner";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useContext(authContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const userAuthState = await isUserAuthenticated();
        if (!userAuthState) {
          toast.error("Kindly Sign In to continue");
          navigate("/user/signin", { replace: true });
        } else if (isMounted) {
          setChecking(false);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          navigate("/user/signin", { replace: true });
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
        <p className="text-sm font-medium">Verifying authentication...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
