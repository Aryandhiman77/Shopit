import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import bcrypt from "bcryptjs";
import User from "../../Models/user.js";
import { customAlphabet } from "nanoid";
import ApiResponse from "../../Helpers/ApiResponse.js";
import ApiError from "../../Helpers/ApiError.js";

import {
  loginUserService,
  registerUserService,
} from "../../Services/AuthService.js";

export const registerAsAdmin = AsyncWrapper(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const UUID = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 20)();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password: hash,
    UUID: UUID,
  });

  if (user) {
    res
      .status(200)
      .json(new ApiResponse(200, user, "Admin Created Successfully."));
  }
});

export const loginController = AsyncWrapper(async (req, res) => {
  const { user, authToken, refreshToken } = await loginUserService(req.data);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  const savedUser = {
    UUID: user.UUID,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    authToken,
    loggedInUserCount: user.loggedInUserCount,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Login successful."));
});

export const registrationController = AsyncWrapper(async (req, res) => {
  const { OTP, email } = await registerUserService(req.data);
  // 1. CHECK IF EXISTING USER CONFLICT

  // 4.Send refreshToken as secure cookie
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  // });

  // 5.Return safe user details
  // const savedUser = {
  //   UUID: user.UUID,
  //   name: user.name,
  //   email: user.email,
  //   phoneNumber: user.phoneNumber,
  //   // authToken,
  //   loggedInUserCount: user.loggedInUserCount,
  // };

  return res
    .status(200)
    .json(new ApiResponse(200, `6-digit verification OTP sent to ${email}.`));
  // return res.status(303).redirect(`${process.env.NODE_ENV === "production"?`https:${FRONTEND_DOMAIN}`:"http://localhost:5173/"}`);
});

export const verifyOTP = AsyncWrapper(async (req, res) => {
  const { otp } = req.body;

  // if (!user) throw new ApiError();
  res.send(otp);
});
export const logoutController = AsyncWrapper(() => {});
