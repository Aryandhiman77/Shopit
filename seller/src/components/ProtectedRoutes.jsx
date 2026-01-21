import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import AuthContext from "../Context/Auth/AuthContext";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={"/seller/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
