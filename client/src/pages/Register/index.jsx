import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterSchema from "./validation";
import { useForm } from "react-hook-form";
import FormError from "../../components/Errors/FormError";
import useAuth from "../../hooks/useAuth";
import CustomButton from "../../components/Reusables/Elements/CustomBtn";

const Register = () => {
  const [passwordHidden, setPasswordHidden] = useState({
    pass: true,
    confirmPass: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const { loading, handleRegistration, formErrors } = useAuth();
  const onSubmit = (data) => {
    console.log(data);
    handleRegistration(data);
  };

  return (
    <section className="section py-10 bg-[#e5e5e5]">
      <div className="container-sm">
        <div className="card bg-white shadow-md rounded-md p-4 w-[500px] m-auto">
          <h2 className="font-[500] text-black text-center text-[20px]">
            Create your account
          </h2>
          <p className="text-sm text-center text-gray-500 mt-1">
            Start purchasing products today
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
            <div className="flex flex-row gap-2 w-full">
              <div className="w-1/2">
                <TextField
                  {...register("name")}
                  name="name"
                  id="outlined-basic"
                  label="Name"
                  className="w-full"
                  variant="outlined"
                  required={true}
                  type={"text"}
                />
                <FormError error={errors.name?.message} />
              </div>
              <div className="w-1/2">
                <TextField
                  {...register("email")}
                  type="email"
                  name="email"
                  className="w-full"
                  id="outlined-basic"
                  label="Email ID"
                  variant="outlined"
                />
                <FormError error={errors.email?.message} />
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="w-1/2">
                <div className="cpassword relative flex justify-end items-center">
                  <TextField
                    {...register("phoneNumber")}
                    type="tel"
                    name="phoneNumber"
                    placeholder="9876543210"
                    className="w-full"
                    id="outlined-basic"
                    label="Phone number"
                    variant="outlined"
                    required
                  />
                  <div className="absolute rounded-full p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer text-sm text-primary">
                    Verify
                  </div>
                </div>
                <FormError error={errors.phoneNumber?.message} />
              </div>
              {/* <TextField
                className="w-1/2"
                id="outlined-basic"
                label="Enter OTP"
                variant="outlined"
                type={"text"}
              /> */}
            </div>
            <div>
              <div className="password relative flex justify-end items-center">
                <TextField
                  {...register("password")}
                  name="password"
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
              <FormError error={errors.password?.message} />
            </div>
            <div>
              <div className="cpassword relative flex justify-end items-center">
                <TextField
                  {...register("confirmPassword")}
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
              <FormError error={errors.confirmPassword?.message} />
            </div>
            <CustomButton
              type={"submit"}
              title={"REGISTER"}
              fontWeight={500}
              loading={loading}
              disabled={loading}
              className="btn !text-white !bg-primary hover:!bg-black !p-3 rounded-md!"
            />
            <div className="flex flex-col gap-4 text-center">
              <p className="font-[400] text-sm">
                Already Registered ?{" "}
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

export default Register;
