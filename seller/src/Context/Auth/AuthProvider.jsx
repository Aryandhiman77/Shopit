import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tempCred, setTempCred] = useState(null);
  const navigate = useNavigate();
  const { error, loading, fetchData } = useAxios();

  const handleLogin = async (details) => {
    setTempCred(details.email);
    try {
      const result = await fetchData({
        url: "/auth/login",
        method: "POST",
        payload: details,
      });
      const response = result?.response;
      if (response?.success) {
        toast.success(response?.message);
      }
      if (response?.data?.otpRequired) {
        navigate("/seller/otp-verification");
      }
      if (response?.data?.isAuthenticated) {
        setUser(response.data);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpVerification = async ({ otp }) => {
    try {
      const result = await fetchData({
        url: "/auth/verify-otp",
        method: "POST",
        payload: { email: tempCred, otp },
      });
      const response = result?.response;
      if (response.success && response?.data?.isAuthenticated) {
        toast.success(response?.message);
        setUser(response.data);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const result = await fetchData({
      url: "/auth/logout",
      method: "PATCH",
    });
    const response = await result?.response;
    if (response.success) {
      localStorage.removeItem("user");
      setUser(null);
      setAuthenticated(false);
      toast.success(response?.message);
    }
    return true;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setAuthenticated(true);
      console.log("authenticateed");
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        loading,
        error,
        handleOtpVerification,
        user,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
