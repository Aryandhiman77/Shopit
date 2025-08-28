import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <section className="section py-10 bg-[#e5e5e5]">
      <div className="container">
        <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
          <h2 className="font-[500] text-black text-center text-[20px]">
            Login to your account
          </h2>
          <form action="" className="m-4 flex flex-col gap-4">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Phone Number / Email"
              variant="outlined"
              required={true}
              type={"text"}
            />
            <div className="password relative flex justify-end items-center">
              <TextField
                className="w-full"
                id="outlined-basic"
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
            <Link className="forgot-pass text-black font-[500] text-sm hover:text-primary">
                Forgot Password ?
            </Link>
            <Button type="submit" className="btn !text-white !bg-primary hover:!bg-black !p-3">
                Login
            </Button>
            <div className="flex flex-col gap-4 text-center">
            <p className="font-[400] text-sm">Not Registered ? <Link to={"/register"} className="font-[600] text-gray-600">Sign Up</Link></p>
            <p className="font-[600] text-gray-600">Or continue with social account</p>
            <Button className=" !bg-[#e5e5e5] !p-3 !text-black">
                <FcGoogle className="text-2xl mx-3"/> Login with Google
            </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
