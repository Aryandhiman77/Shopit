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
  const { email, user, authToken, refreshToken } = await loginUserService(
    req.data
  );
  if (email) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          `6-digit verification code sent to ${email}.`
        )
      );
  }
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
        null,
        `Registration successful. 6-digit verification code sent to ${email}.`
      )
    );
});

export const verifyOTP = AsyncWrapper(async (req, res) => {
  const { user } = await otpVerificationService(req.data);
  const { authToken, refreshToken } = await generateTokens(user);

  // 3. SAVING MODIFIED USER INFO

  user.loggedInUserCount = 0;
  user.refreshToken = [];
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
  const hashPassword = await createPasswordHash(password);
  const user = await User.findByIdAndUpdate(_id, {
    $set: {
      passwordHash: hashPassword,
      passwordChangedAt: Date.now(),
    },
  });
  if (!user) throw new ApiError(500, "Techical issue, try again");
  res.clearCookie("authToken");
  return res
    .status(200)
    .json(new ApiResponse(200, true, "Password changed successfully."));
});

export const renewUserTokens = AsyncWrapper(async (req, res) => {
  const { refreshToken: oldToken } = req.cookies;

  if (!oldToken) {
    throw new ApiError(400, null, "No refresh authorization received.");
  }
  const user = await User.findOne({ refreshToken: oldToken });

  const { authToken, refreshToken: new_token } = await generateTokens(user);

  const updated = await User.updateOne(
    { refreshToken: oldToken },
    { $set: { "refreshToken.$": new_token } }
  );
  if (!updated) {
    throw new ApiError(400, "Login again.", "Already logged out.");
  }

  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.cookie("refreshToken", new_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, true, "Authorization refreshed."));
});
