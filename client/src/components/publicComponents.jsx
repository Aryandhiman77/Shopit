import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default PublicRoutes;
