import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import OTPInput from "../../../components/Reusables/OTPInput";
const ForgotPassword = () => {
  const [otp, setOTP] = useState(null);
  const [otpSectionHidden, setOtpSectionHidden] = useState(true);

  const navigate = useNavigate();
  
  const handleOtpVerification = ()=>{
    setOtpSectionHidden(false);
  }

  return (
    <div>
      <section className="section py-10 bg-[#e5e5e5]">
        <div className="container">
          <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
            <h2 className="font-[500] text-black text-center text-[20px]">
              Verify your Identity
            </h2>
            <div className="m-4 flex flex-col gap-4">
              <div
                onClick={(e) => e.preventDefault()}
                className="cpassword relative flex justify-end items-center"
              >
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Phone number / Email"
                  variant="outlined"
                  type={"text"}
                  required
                />
                <button
                  onClick={handleOtpVerification}
                  type="submit"
                  className="absolute rounded-full p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer text-sm text-primary "
                >
                  GET OTP
                </button>
              </div>
              <div className={otpSectionHidden?"hidden":"flex flex-col gap-4"}>
                <div className="w-full">
                  <p className="font-[500] py-2">Enter OTP</p>
                  <OTPInput maxLength={4} onChangeOTP={setOTP} />
                </div>
                <Button
                  onClick={() => navigate("/reset")}
                  type="submit"
                  className="btn !text-white !bg-primary hover:!bg-black !p-3"
                >
                  verify OTP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
