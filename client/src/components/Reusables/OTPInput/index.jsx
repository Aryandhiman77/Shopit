import React, { useState } from "react";

const OTPInput = ({ maxLength = 4, onChangeOTP = () => {} }) => {
  const [otp, setOTP] = useState(new Array(maxLength).fill(""));

  const handleInput = (value, i) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[i] = value;
    setOTP(newOtp);

    // call parent callback with joined OTP
    onChangeOTP(newOtp.join(""));

    // auto-focus next input if value entered
    if (value && i < maxLength - 1) {
      document.getElementById(`otp-digit-${i + 1}`).focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      document.getElementById(`otp-digit-${i - 1}`).focus();
    }
  };

  return (
    <div className="flex justify-between gap-5">
      {otp.map((digit, i) => (
        <input
          key={i}
          value={digit}
          className={`w-1/6 h-15 border-[1px] px-4 focus:outline-none border-[#c6c6c6] rounded-sm text-center focus:border-primary`}
          type="tel"
          inputMode="numeric" // numeric keyboard
          autoComplete="one-time-code" // enables OTP auto-fill
          id={`otp-digit-${i}`}
          maxLength={1}
          onChange={(e) => handleInput(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
