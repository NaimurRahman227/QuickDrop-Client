import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const { user, loading } = useAuth();
  const [showSpinner, setShowSpinner] = useState(true);

  // fallback token check
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading || showSpinner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  //  check token OR user
  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;