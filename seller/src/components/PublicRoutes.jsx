import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Context/Auth/useAuth";

const PublicRoutes = () => {
  const { authToken } = useAuth();
  if (!authToken) {
    return <Outlet />;
  }
  return <Navigate to={"/dashboard"} />;
};

export default PublicRoutes;
