import { useState } from "react";
import logo from "../../assets/logo.svg";
import LoginSchema from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormError from "../../components/Reusables/FormError";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const [passHidden, setPassHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <img src={logo} className="m-auto" />
        {/* Logo / Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Seller's Login
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Manage your products & orders
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              required
              placeholder="seller@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <p className="text-red-500 h-2 text-sm">{}</p> */}
            <FormError error={errors.email?.message} />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={`${passHidden ? "password" : "text"}`}
                name="password"
                required
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none "
              />
              <button
                type="button"
                className="absolute top-[15%] right-1 rounded-full text-black  p-2 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
                onClick={() => setPassHidden(!passHidden)}
              >
                {passHidden ? (
                  <IoMdEye size={20} className="text-2xl opacity-65" />
                ) : (
                  <IoMdEyeOff size={20} className="text-2xl opacity-65" />
                )}
              </button>
            </div>
            <FormError error={errors.password?.message} />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a
              href="/seller/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have a seller account?{" "}
          <a
            href="/seller/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
