import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../../assets/admin-logo.jpg";

const Signup = () => {
  const [passwordHidden, setPasswordHidden] = useState({
    pass: true,
    confirmPass: true,
  });

  return (
    <section className="section py-10 bg-[#e5e5e5]">
      <div className="container mx-auto">
        <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
          <div className="logo m-auto flex flex-col items-center">
            <img src={logo} width={100} alt="" />
            <p className="font-[600] -translate-y-2 text-2xl">Shopit</p>
          </div>
          <h2 className="font-[500] text-black text-center text-[20px]">
            Create your account
          </h2>
          <form action="" className="m-4 flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                required={true}
                type={"text"}
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                required={true}
                type={"text"}
              />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="cpassword relative flex justify-end items-center w-1/2">
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type={"text"}
                  required
                />
                <div className="absolute rounded-full p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer text-sm text-primary">
                  Verify
                </div>
              </div>
              <TextField
                className="w-1/2"
                id="outlined-basic"
                label="Enter OTP"
                variant="outlined"
                type={"number"}
              />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="cpassword relative flex justify-end items-center w-1/2">
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Phone number"
                  variant="outlined"
                  type={"Number"}
                  required
                />
                <div className="absolute rounded-full p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer text-sm text-primary">
                  Verify
                </div>
              </div>
              <TextField
                className="w-1/2"
                id="outlined-basic"
                label="Enter OTP"
                variant="outlined"
                 type={"number"}
              />
            </div>
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
                onClick={() =>
                  setPasswordHidden((prev) => ({ ...prev, pass: !prev.pass }))
                }
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
                onClick={() =>
                  setPasswordHidden((prev) => ({
                    ...prev,
                    confirmPass: !prev.confirmPass,
                  }))
                }
                className="absolute rounded-full text-black  p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
              >
                {passwordHidden.confirmPass ? (
                  <IoMdEye className="text-2xl opacity-65" />
                ) : (
                  <IoMdEyeOff className="text-2xl opacity-65" />
                )}
              </button>
            </div>
            <Button
              type="submit"
              className="btn !text-white !bg-primary hover:!bg-black !p-3"
            >
              Register
            </Button>
            <div className="flex flex-col gap-4 text-center">
              <p className="font-[400] text-sm">
                Already have an account ?
                <Link to={"/login"} className="font-[600] text-gray-600">
                  Login
                </Link>
              </p>
              <p className="font-[600] text-gray-600">
                Or continue with social account
              </p>
              <Button className="!bg-[#e5e5e5] !p-3 !text-black">
                <FcGoogle className="text-2xl mx-3" /> Sign up with Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
