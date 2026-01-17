import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import AuthContext from "../Context/Auth/AuthContext";
import useAuth from "../Context/Auth/useAuth"

const ProtectedRoutes = () => {
  const { authToken } = useAuth();
  if (!authToken) {
    return <Navigate to={"/seller/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
