import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utilities/RequestAPI";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (details) => {
    setLoading(true);
    try {
      const response = await fetchData({
        url: "/auth/login",
        method: "POST",
        payload: { ...details, role: "admin" },
      });
      console.log(response);
      if (response?.formErrors) {
        setFormErrors(response.formErrors);
      }
      if (response?.success) {
        toast.success(response?.message);
      }
      if (response?.data?.otpRequired) {
        navigate("/otp-verification", {
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
    } finally {
      setLoading(false);
    }
  };
  // const handleRegistration = async (details) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetchData({
  //       url: "/auth/register",
  //       method: "POST",
  //       payload: { ...details, role: "admin" },
  //     });
  //     if (response?.success) {
  //       toast.success(response?.message);
  //     }
  //     if (response?.data?.otpRequired) {
  //       navigate("/otp-verification", {
  //         state: { email: details.email, password: details.password },
  //         replace: true,
  //       });
  //       return;
  //     }
  //     if (response?.data?.isAuthenticated) {
  //       setUser(response.data);
  //       setAuthenticated(true);
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleOtpVerification = async ({ email, otp }) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetchData({
        url: "/auth/logout",
        method: "PATCH",
      });
      if (
        response?.error?.response?.data?.message.includes("Already logged out.")
      ) {
        navigate("/login", { replace: true });
      }
      if (response?.success) {
        localStorage.removeItem("user");
        setUser(null);
        setAuthenticated(false);
        toast.success(response?.message);
      }
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const verifyMySession = async () => {
    setLoading(true);
    const response = await fetchData({
      url: "/auth/me",
      method: "GET",
    });
    if (response?.success) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setAuthenticated(true);
      setLoading(false);
    } else {
      handleLogout();
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyMySession();
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
