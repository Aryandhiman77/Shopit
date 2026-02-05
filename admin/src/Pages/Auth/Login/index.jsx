import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/admin-logo.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoginSchema from "./validation";
import useAuth from "../../../Components/hooks/useAuth";
import FormError from "../../../Components/Reusables/FormError";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";

const Login = () => {
  const navigate = useNavigate();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const { handleLogin, loading, formErrors } = useAuth();
  const detectLoginKey = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (emailRegex.test(value)) return "email";
    if (phoneRegex.test(value)) return "phoneNumber";
    return null;
  };
  const onSubmit = (data) => {
    const key = detectLoginKey(data.login);
    if (!key) {
      setError("login", {
        message: "Enter a valid email, phone number.",
      });
      return;
    }
    const payload = {
      [key]: data.login,
      password: data.password,
    };
    LoginSchema.validate(payload)
      .then(() => {
        handleLogin(payload);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleForgotPassword = () => {
    navigate("/verify", { state: { fromLogin: true }, replace: true });
  };

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
            {formErrors?.length > 0 && (
              <div className="bg-red-600 text-white mt-2 p-1 text-[12px] rounded-sm text-center">
                {formErrors.map((formErr, i) => (
                  <div key={"formerror" + i}>
                    {i + 1}. {formErr}
                  </div>
                ))}
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="m-4 flex flex-col gap-4"
            >
              <>
                <TextField
                  {...register("login")}
                  name="login"
                  className="w-full"
                  label="Phone Number / Email"
                  variant="outlined"
                  required={true}
                  type={"text"}
                />
                <FormError error={errors.login?.message} />
              </>
              <>
                <div className="password relative flex justify-end items-center">
                  <TextField
                    {...register("password")}
                    name="password"
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
                <FormError error={errors.login?.message} />
              </>
              <div className="flex flex-row justify-between">
                <label htmlFor="rememberme" className="cursor-pointer">
                  <input
                    type="checkbox"
                    id="rememberme"
                    className="accent-black"
                  />
                  &nbsp;{" "}
                  <span className="text-[14px] font-[500] select-none">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot-pass text-black font-[500] text-sm hover:text-primary"
                >
                  Forgot Password ?
                </button>
              </div>
              <CustomButton
                type={"submit"}
                title={"LOGIN"}
                disabled={loading}
                loading={loading}
                fontWeight={500}
                fontSize={16}
                className={
                  "btn !text-white !bg-primary hover:!bg-black !p-3 rounded-md!n"
                }
              />
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
