import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import bcrypt from "bcryptjs";
import User from "../../Models/user.js";
import { customAlphabet } from "nanoid";
import ApiResponse from "../../Helpers/ApiResponse.js";

import {
  loginUserService,
  otpVerificationService,
  registerUserService,
  logoutUserService,
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
  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  const savedUser = {
    UUID: user.UUID,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    loggedInUserCount: user.loggedInUserCount,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Login successful."));
});

export const registrationController = AsyncWrapper(async (req, res) => {
  const { email } = await registerUserService(req.data);
  return res
    .status(200)
    .json(new ApiResponse(200, `6-digit verification code sent to ${email}.`));
});

export const verifyOTP = AsyncWrapper(async (req, res) => {
  const { user, refreshToken, authToken } = await otpVerificationService(
    req.data
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  const savedUser = {
    UUID: user.UUID,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    loggedInUserCount: user.loggedInUserCount,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Registration successful."));
});

export const logoutController = AsyncWrapper(async (req, res) => {
  await logoutUserService(req.cookies);
  res.clearCookie("refreshToken");
  res.clearCookie("authToken");

  return res.status(200).json(new ApiResponse(200, null, "Logout successful."));
});
