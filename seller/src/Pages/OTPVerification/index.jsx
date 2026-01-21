import React, { useEffect, useState } from "react";
import OTPInput from "../../components/Reusables/OTPInput";
import useAuth from "../../hooks/useAuth";
import Divider from "@mui/material/Divider";

const OTPVerification = (cred) => {
  const [otp, setOtp] = useState("");
  const { loading, handleOtpVerification } = useAuth();
  const handleVerify = () => {
    handleOtpVerification({
      otp,
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to you
        </p>
        <OTPInput maxLength={6} onChangeOTP={setOtp} />
        <button
          onClick={handleVerify}
          className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          Verify
        </button>
        <div className="pt-3">
          <Divider />
        </div>
        <div className="text-center mt-4">
          <button
            className="text-sm text-indigo-600 hover:underline cursor-pointer"
            onClick={() => toast("Resend OTP feature here")}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
