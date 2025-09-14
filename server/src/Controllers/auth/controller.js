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
  forgotPassService,
} from "../../Services/AuthService.js";
import {
  createPasswordHash,
  generateTokens,
} from "../../Helpers/Auth/authHelper.js";
import ApiError from "../../Helpers/ApiError.js";

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
    .json(
      new ApiResponse(
        200,
        `Registration successful. 6-digit verification code sent to ${email}.`
      )
    );
});

export const verifyOTP = AsyncWrapper(async (req, res) => {
  const { user } = await otpVerificationService(req.data);
  const { authToken, refreshToken } = await generateTokens(user);

  await deviceLimitChecker(user);
  // 3. SAVING MODIFIED USER INFO
  user.loggedInUserCount++;
  user.refreshToken.push(refreshToken);
  user.verifiedEmail = true;
  await user.save();

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
    .json(new ApiResponse(200, savedUser, "Email verified successfully."));
});

export const logoutController = AsyncWrapper(async (req, res) => {
  await logoutUserService(req.cookies);
  res.clearCookie("refreshToken");
  res.clearCookie("authToken");

  return res.status(200).json(new ApiResponse(200, null, "Logout successful."));
});

export const forgotPassController = AsyncWrapper(async (req, res) => {
  const { email } = await forgotPassService(req.data);
  return res
    .status(200)
    .json(
      new ApiResponse(200, null, `6-digit verification OTP sent to ${email}.`)
    );
});

export const forgotPassOTPCheckController = AsyncWrapper(async (req, res) => {
  const { user } = await otpVerificationService(req.data);
  await user.save();
  const authToken = await user.generateAuthToken({
    userId: user.id,
    role: user.role,
  });
  console.log(authToken);
  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, true, "OTP verification successful."));
});

export const resetPassController = AsyncWrapper(async (req, res) => {
  const { password } = req.data;
  const { _id } = await req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  const hashPassword = await createPasswordHash(password);
  user.passwordHash = hashPassword;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.clearCookie("authToken");
  return res
    .status(200)
    .json(new ApiResponse(200, true, "Password changed successfully."));
});
