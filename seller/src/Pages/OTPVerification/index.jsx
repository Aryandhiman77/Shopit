import React, { useEffect, useRef, useState } from "react";
import OTPInput from "../../components/Reusables/OTPInput";
import useAuth from "../../hooks/useAuth";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RESEND_TIMEOUT = 40;

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const { loading, handleOtpVerification, handleLogin } = useAuth();
  const [creds, setCreds] = useState({ email: null, password: null });
  const [timeLeft, setTimeLeft] = useState(0);

  const intervalRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.email && state?.password) {
      setCreds({ ...creds, email: state.email, password: state.password });
    } else {
      navigate("/seller/login", { replace: true });
    }
  }, []);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }
    await handleOtpVerification({ email: creds.email, otp });
  };

  const resendOtp = async () => {
    setTimeLeft(RESEND_TIMEOUT);
    await handleLogin({
      email: creds.email,
      password: creds.password,
      role: "seller",
    });
  };
  useEffect(() => {
    localStorage.setItem("otpTimeout", JSON.stringify(timeLeft));

    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <OTPInput maxLength={6} onChangeOTP={setOtp} />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="pt-3">
          <Divider />
        </div>

        <div className="text-center mt-4">
          <button
            disabled={timeLeft > 0}
            className="text-sm text-indigo-600 hover:underline disabled:text-gray-400"
            onClick={resendOtp}
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
