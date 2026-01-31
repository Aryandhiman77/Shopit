import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ResetPasswordGuard = ({ children }) => {
  const { state } = useLocation();
  if (!state?.fromVerification) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ResetPasswordGuard;
