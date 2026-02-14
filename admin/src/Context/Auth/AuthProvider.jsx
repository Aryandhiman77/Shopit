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
  const [isPasswordModelOpen, setIsPasswordModelOpen] = useState(false);
  const [isOTPModelOpen, setIsOTPModelOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (details) => {
    setLoading(true);
    try {
      const response = await fetchData({
        url: "/auth/login",
        method: "POST",
        payload: { ...details, role: "admin" },
      });
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
      // during session revalidation
      // if (response?.data?.otpRequired && isPasswordModelOpen) {
      //   setIsOTPModelOpen(true);
      // }
      if (response?.data?.isAuthenticated) {
        setUser(response.data);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSessionReValidation = async (details) => {
    setLoading(true);
    try {
      const response = await fetchData({
        url: "/auth/login",
        method: "POST",
        payload: { ...details, role: "admin" },
      });
      if (response?.formErrors) {
        setFormErrors(response.formErrors);
      }
      if (response?.data?.otpRequired) {
        setIsOTPModelOpen(true);
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

  const handleOtpVerification = async ({ email, otp }, navigate = true) => {
    console.log(navigate);
    setLoading(true);
    try {
      const response = await fetchData({
        url: "/auth/verify-otp",
        method: "POST",
        payload: { email: email, otp },
      });
      if (response?.success && response?.data?.isAuthenticated) {
        if (!navigate) {
          return true;
        }
        setUser(response.data);
        if (!JSON.parse(localStorage.getItem("user"))) {
          setAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(response.data));
          setLoading(false);

          navigate("/", { replace: true });
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
        setLoading(false);
        toast.success(response?.message);
      }
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const logout = () => handleLogout();
    const askToRevalidateLogin = () => {
      setIsPasswordModelOpen(true);
    };
    // received from request api
    window.addEventListener("ASK_LOGIN", askToRevalidateLogin);
    window.addEventListener("FORCE-LOGOUT", logout);

    return () => {
      window.removeEventListener("ASK_LOGIN", askToRevalidateLogin);
      window.removeEventListener("FORCE-LOGOUT", logout);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setLoading(false);
      return;
    }
    (async () => {
      const res = await fetchData({ url: "/auth/getme", method: "GET" });
      if (res.success) {
        setUser(res.data);
        setAuthenticated(true);
        setLoading(false);
        navigate("/", { replace: true });
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        handleLogout();
      }
      setLoading(false);
    })();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        formErrors,
        user,
        isPasswordModelOpen,
        isOTPModelOpen,
        setIsOTPModelOpen,
        setIsPasswordModelOpen,
        handleLogin,
        handleOtpVerification,
        handleLogout,
        handleSessionReValidation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
