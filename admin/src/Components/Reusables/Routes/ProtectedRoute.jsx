import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";


const ProtectedRoute = () => {
  const { login } = useAuth();
  console.log(login)

  if (!login) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />
};

export default ProtectedRoute;
