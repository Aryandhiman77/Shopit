import React, { useEffect, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tempCred, setTempCred] = useState(null);
  const navigate = useNavigate();
  const { formErrors, loading, fetchData } = useAxios();

  const handleLogin = async (details) => {
    setTempCred(details?.email);
    try {
      const response = await fetchData({
        url: "/auth/login",
        method: "POST",
        payload: details,
      });
      if (response?.success) {
        toast.success(response?.message);
      }
      if (response?.data?.otpRequired) {
        navigate("/seller/otp-verification", {
          state: { email: details.email, password: details.password },
          replace: true,
        });
        return;
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

  const handleOtpVerification = async ({ email, otp }) => {
    try {
      const response = await fetchData({
        url: "/auth/verify-otp",
        method: "POST",
        payload: { email: email, otp },
      });
      if (response?.success && response?.data?.isAuthenticated) {
        setUser(response.data);
        toast.success(response?.message);
        if (!JSON.parse(localStorage.getItem("user"))) {
          setAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(response.data));
          toast.success("Login successful.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const response = await fetchData({
      url: "/auth/logout",
      method: "PATCH",
    });
    if (response?.success) {
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
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        loading,
        formErrors,
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
