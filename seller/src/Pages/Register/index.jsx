import { useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../components/Reusables/FormError";
import RegisterSchema from "./validation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Register() {
  const [passHidden, setPassHidden] = useState(true);
  const [confirmPassHidden, setConfirmPassHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <img src={logo} className="m-auto" />
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Seller Account
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Start selling your products today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Seller Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seller Name
            </label>
            <input
              {...register("name")}
              type="text"
              name="name"
              required
              placeholder="David jain"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <FormError error={errors.name?.message} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address*
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              required
              placeholder="seller@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <FormError error={errors.email?.message} />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="tel"
              name="phoneNumber"
              placeholder="9876543210"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <FormError error={errors.phoneNumber?.message} />
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={`${confirmPassHidden ? "password" : "text"}`}
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <button
                type="button"
                className="absolute top-[15%] right-1 rounded-full text-black  p-2 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
                onClick={() => setConfirmPassHidden(!confirmPassHidden)}
              >
                {confirmPassHidden ? (
                  <IoMdEye size={20} className="text-2xl opacity-65" />
                ) : (
                  <IoMdEyeOff size={20} className="text-2xl opacity-65" />
                )}
              </button>
            </div>

            <FormError error={errors.confirmPassword?.message} />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <input
                {...register("agreeTerms")}
                id="termsAndConditions"
                type="checkbox"
              />{" "}
              <label
                htmlFor="termsAndConditions"
                className="text-sm text-gray-500 select-none"
              >
                {" "}
                Terms and conditions
              </label>
              <FormError error={errors.agreeTerms?.message} />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition mt-4"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have a seller account?{" "}
          <a
            href="/seller/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
