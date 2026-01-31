import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const VerificationGuard = ({ children }) => {
  const { state } = useLocation();
  if (!state?.fromLogin) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default VerificationGuard;
