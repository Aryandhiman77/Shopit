import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, useAuth } from "../../../Context/Auth/AuthContext";

const ProtectedRoute = () => {
  const { authToken } = useContext(AuthContext);
  console.log(authToken);

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
