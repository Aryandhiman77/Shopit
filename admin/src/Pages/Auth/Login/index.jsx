import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/admin-logo.jpg";
import { Checkbox } from "@mui/material";

const Login = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loginDetails, setLoginDetails] = useState({});

  return (
    <div className="h-[100vh] bg-[#f1f1f1] flex justify-center items-center">
      <section className="section py-10 ">
        <div className="container mx-auto">
          <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
            <div className="logo m-auto flex flex-col items-center">
              <img src={logo} width={100} alt="" />
              <p className="font-[600] -translate-y-2 text-2xl">Shopit</p>
            </div>
            <h2 className="font-[500] text-black text-center text-[20px]">
              Login as Administrator
            </h2>
            <form action="" className="m-4 flex flex-col gap-4">
              <TextField
                className="w-full"
                label="Phone Number / Email"
                variant="outlined"
                required={true}
                type={"text"}
              />
              <div className="password relative flex justify-end items-center">
                <TextField
                  className="w-full"
                  label="Password"
                  variant="outlined"
                  required={true}
                  type={passwordHidden ? "password" : "text"}
                />
                <button
                  type="button"
                  onClick={() => setPasswordHidden((prev) => !prev)}
                  className="absolute rounded-full text-black  p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
                >
                  {passwordHidden ? (
                    <IoMdEye className="text-2xl opacity-65" />
                  ) : (
                    <IoMdEyeOff className="text-2xl opacity-65" />
                  )}
                </button>
              </div>
              <div className="flex flex-row justify-between">
                <label htmlFor="rememberme">
                  <input
                    type="checkbox"
                    id="rememberme"
                    className="accent-black"
                  />
                  &nbsp;{" "}
                  <span className="text-[14px] font-[500]">Remember me</span>
                </label>

                <Link
                  to={"/verify"}
                  className="forgot-pass text-black font-[500] text-sm hover:text-primary"
                >
                  Forgot Password ?
                </Link>
              </div>
              <Button
                type="submit"
                className="btn !text-white !bg-primary hover:!bg-black !p-3"
              >
                Login
              </Button>
              <div className="flex flex-col gap-4 text-center">
                <p className="font-[400] text-sm">
                  Not Registered ?{" "}
                  <Link to={"/signup"} className="font-[600] text-gray-600">
                    Sign Up
                  </Link>
                </p>
                <p className="font-[600] text-gray-600">
                  Or continue with social account
                </p>
                <Button className=" !bg-[#e5e5e5] !p-3 !text-black">
                  <FcGoogle className="text-2xl mx-3" /> Login with Google
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
