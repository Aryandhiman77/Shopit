import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginSchema from "./validation";
import useAuth from "../../hooks/useAuth";
import FormError from "../../components/Errors/FormError";
import CustomButton from "../../components/Reusables/Elements/CustomBtn";

const Login = () => {
  const navigate = useNavigate();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const { handleLogin, loading, formErrors } = useAuth();
  const { state } = useLocation();
  const onSubmit = (data) => {
    handleLogin({
      email: data.email,
      password: data.password,
      role: "customer",
    });
  };
  const handleForgotPassword = () => {
    navigate("/verify", { state: { fromLogin: true }, replace: true });
  };

  return (
    <section className="section py-10 bg-[#e5e5e5]">
      <div className="container-sm">
        <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
          <h2 className="font-[500] text-black px-4 text-[20px] text-center">
            Login
          </h2>
          <p className="text-[12px] py-1 text-center">
            Get access to your account.
          </p>
          {formErrors?.length > 0 &&
            formErrors.map((err, i) => (
              <div className="bg-red-600 text-white mt-2 p-1 text-[12px] rounded-sm text-center">
                {i + 1}. {err}
              </div>
            ))}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="m-4 flex flex-col gap-4"
          >
            <div>
              <TextField
                {...register("email")}
                className="w-full"
                id="outlined-basic"
                label="Phone Number / Email"
                variant="outlined"
                required={true}
                type={"text"}
              />
              <FormError error={errors.email?.message} />
            </div>
            <div>
              <div className="password relative flex justify-end items-center">
                <TextField
                  {...register("password")}
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
              <FormError error={errors.password?.message} />
            </div>
            <button
              onClick={handleForgotPassword}
              className="forgot-pass text-black font-[500] text-sm hover:text-primary"
            >
              Forgot Password ?
            </button>
            <CustomButton
              type={"submit"}
              title={"LOGIN"}
              fontWeight={500}
              loading={loading}
              disabled={loading}
              className="btn !text-white !bg-primary hover:!bg-black !p-3 rounded-md!"
            />
            <div className="flex flex-col gap-4 text-center">
              <p className="font-[400] text-sm">
                Not Registered ?{" "}
                <Link to={"/register"} className="font-[600] text-gray-600">
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
  );
};

export default Login;
