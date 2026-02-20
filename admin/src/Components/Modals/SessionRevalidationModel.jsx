import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Modal from "../Reusables/Elements/Modal";
import CollapsablePanel from "../Reusables/CollapsablePanel";
import { TextField } from "@mui/material";
import Spinner from "../Reusables/Elements/Loader/Spinner";
import CustomButton from "../Reusables/Elements/CustomBtn";
import OTPVerification from "../../Pages/OTPVerification";
import { PiCross } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import CustomToast from "../Reusables/CustomToast";
import OTPInput from "../Reusables/OTPInput";

const SessionRevalidationModel = ({ isOpen, setOpened }) => {
  const {
    setIsPasswordModelOpen,
    isPasswordModelOpen,
    user,
    handleLogout,
    loading,
    handleSessionReValidation,
    isOTPModelOpen,
    setIsOTPModelOpen,
    handleOtpVerification,
  } = useAuth();
  const [revalidate, setRevalidate] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const promptUserForLogout = () => {
    toast.custom((toast) => (
      <CustomToast
        buttonTitle={"LOG OUT"}
        toastId={toast.id}
        message="Are you sure you want to log out ?"
        callFn={() => {
          setRevalidate(false);
          setIsPasswordModelOpen(false);
          handleLogout();
        }}
      />
    ));
  };
  const resetStates = () => {
    setOTP("");
    setPassword("");
    setRevalidate(false);
    setIsOTPModelOpen(!isOTPModelOpen);
    setIsPasswordModelOpen(!isPasswordModelOpen);
  };
  const verifyOTP = async () => {
    const verified = await handleOtpVerification(
      { email: user.email, otp },
      false,
    );
    if (verified) {
      resetStates();
      toast.success("Session Revalidated.");
    }
  };
  return (
    <>
      <Modal
        open={isPasswordModelOpen}
        fullScreen={true}
        header={false}
        className="bg-[rgba(0,0,0,0.4)]! flex justify-center items-center"
      >
        <div className="bg-white w-sm p-5 rounded-sm">
          {!isOTPModelOpen && (
            <>
              <div className="text-center space-y-4">
                {!revalidate && (
                  <>
                    <p className="font-medium">Your session is expired.</p>
                    <p>Do you want to re-validate ?</p>
                  </>
                )}
                <div className="space-x-4 ">
                  <CollapsablePanel isOpened={revalidate}>
                    <IoMdClose
                      className="ml-auto m-1 hover:bg-[#e5e5e5] rounded-2xl cursor-pointer"
                      size={20}
                      onClick={promptUserForLogout}
                    />
                    <p className="py-3 font-medium">Verify password</p>
                    {
                      <>
                        <TextField
                          name="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-[80%] mb-4!"
                          label={"Enter password"}
                          type="password"
                          placeholder="**********"
                          variant="outlined"
                        />

                        <CustomButton
                          title={"Revalidate Session"}
                          loading={loading}
                          disabled={
                            loading || (revalidate && password.length === 0)
                          }
                          onClick={() =>
                            handleSessionReValidation({
                              email: user.email,
                              password,
                            })
                          }
                          className="custom-btn! bg-primary! text-white! w-[80%] rounded-md! font-medium!"
                        />
                      </>
                    }
                  </CollapsablePanel>
                  <div className="space-x-4!">
                    {!revalidate && (
                      <>
                        <CustomButton
                          title={"Revalidate"}
                          loading={loading}
                          disabled={loading}
                          onClick={() => setRevalidate(true)}
                          className="custom-btn! bg-green-600! text-white! w-1/3 rounded-md! font-medium!"
                        />

                        <CustomButton
                          title={"LOG OUT"}
                          loading={loading}
                          disabled={loading}
                          onClick={() => {
                            promptUserForLogout();
                          }}
                          className="custom-btn! bg-red-600! text-white! w-1/3 rounded-md! font-medium!"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {isOTPModelOpen && (
            <>
              <div className="flex justify-center flex-col gap-4 items-center">
                <p className="py-3 font-medium text-center">Verify OTP</p>
                <OTPInput maxLength={6} onChangeOTP={setOTP} />
                <CustomButton
                  title={"VERIFY"}
                  loading={loading}
                  disabled={loading}
                  onClick={verifyOTP}
                  className="custom-btn! bg-blue-600! text-white! w-[80%] rounded-md! font-medium!"
                />
                <CustomButton
                  title={"reset"}
                  onClick={resetStates}
                  className="custom-btn! bg-blue-600! text-white! w-[80%] rounded-md! font-medium!"
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SessionRevalidationModel;
