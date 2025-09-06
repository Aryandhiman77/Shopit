import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";

const PublicRoute = () => {
  const { login } = useAuth();
  return !login ? <Outlet/>:<Navigate to={"/"} replace/>
};

export default PublicRoute;
