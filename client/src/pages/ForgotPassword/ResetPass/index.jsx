import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const ResetPass = () => {
  const [passwordHidden, setPasswordHidden] = useState({pass:true,confirmPass:true});

  return (
    <section className="section py-10 bg-[#e5e5e5]">
      <div className="container">
        <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
          <h2 className="font-[500] text-black text-center text-[20px]">
            Reset your password
          </h2>
          <form action="" className="m-4 flex flex-col gap-4">
            <div className="password relative flex justify-end items-center">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                required={true}
                type={passwordHidden.pass ? "password" : "text"}
              />
              <button
              type="button"
                onClick={() => setPasswordHidden((prev) => ({...prev,pass:!prev.pass}))}
                className="absolute rounded-full text-black  p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
              >
                {passwordHidden.pass ? (
                  <IoMdEye className="text-2xl opacity-65" />
                ) : (
                  <IoMdEyeOff className="text-2xl opacity-65" />
                )}
              </button>
            </div>
            <div className="cpassword relative flex justify-end items-center">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                required={true}
                type={passwordHidden.confirmPass ? "password" : "text"}
              />
              <button
               type="button"
                onClick={() => setPasswordHidden((prev) => ({...prev,confirmPass:!prev.confirmPass}))}
                className="absolute rounded-full text-black  p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
              >
                {passwordHidden.confirmPass ? (
                  <IoMdEye className="text-2xl opacity-65" />
                ) : (
                  <IoMdEyeOff className="text-2xl opacity-65" />
                )}
              </button>
            </div>
            <Button type="submit" className="btn !text-white !bg-primary hover:!bg-black !p-3">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPass;
