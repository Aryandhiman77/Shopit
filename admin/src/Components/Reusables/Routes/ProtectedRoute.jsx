import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../Components/hooks/useAuth";
import Spinner from "../Elements/Loader/Spinner";
import logo from "../../../assets/admin-logo.jpg";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return !isAuthenticated ? (
      <div className="flex justify-center items-center h-[100vh] bg-[#e5e5e5]">
        <div className="flex justify-center items-center flex-col border border-gray-400 p-10 bg-[rgba(154,192,247,0.4)]">
          <div className="text-center">
            <img src={logo} width={200} alt="" className="mix-blend-multiply" />
            <h1 className="font-semibold text-2xl text-gray-700">
              Shopit-Admin
            </h1>
          </div>
          <p className="text-[14px] font-medium">Verifying your identity...</p>
          <div className="mt-2">
            <Spinner size={30} />
          </div>
        </div>
      </div>
    ) : (
      <>
        <Navigate to="/login" replace />{" "}
      </>
    );
  }
  return loading ? (
    <div className="flex justify-center items-center h-[100vh] bg-[#e5e5e5]">
      <div className="flex justify-center items-center flex-col border border-gray-400 p-10 bg-[rgba(154,192,247,0.4)]">
        <div className="text-center">
          <img src={logo} width={200} alt="" className="mix-blend-multiply" />
          <h1 className="font-semibold text-2xl text-gray-700">Shopit-Admin</h1>
        </div>
        <p className="text-[14px] font-medium">Verifying your identity...</p>
        <div className="mt-2">
          <Spinner size={30} />
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
