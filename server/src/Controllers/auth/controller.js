import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import bcrypt from "bcryptjs";
import User from "../../Models/user.js";
import { customAlphabet } from "nanoid";
import ApiResponse from "../../Helpers/ApiResponse.js";
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
  const { email, UUID, phoneNumber, password, role } = req.data;

  // 1. Find user
  const user = await User.findOne({
    $or: [{ email }, { UUID }, { phoneNumber }],
  });

  // 2. Check suspension
  if (user.isSuspended()) {
    throw new ApiError(
      403,
      `Max login attempts exceeded. Account Suspended until ${user.suspensionExpires.toLocaleString()}`
    );
  }
  //2. Check roles
  if (role === "admin" && user.role !== "admin") {
    throw new ApiError(403, "Access denied.");
  }
  if (role === "seller" && user.role !== "seller") {
    throw new ApiError(403, "Access denied.");
  }
  if (
    role === "customer" &&
    (user.role === "admin" || user.role === "seller")
  ) {
    throw new ApiError(403, "Access denied.");
  }

  // 3. Too many attempts
  if (user.loginAttempts > 10) {
    await user.suspendUser();
    await user.save();
    throw new ApiError(
      403,
      `Max login attempts exceeded. Account Suspended until ${user.suspensionExpires.toLocaleString()}`
    );
  }

  // 4. Verify password
  const isTrueUser = await bcrypt.compare(password, user.passwordHash);
  if (!isTrueUser) {
    user.loginAttempts++;
    await user.save();
    throw new ApiError(400, "Invalid credentials.");
  }

  // 7. Max device limit
  if (
    (user.role === "admin" || user.role === "seller") &&
    user.loggedInUserCount >= 1
  ) {
    throw new ApiError(
      403,
      "Login unsuccessfull.",
      "Exceeded max login devices."
    );
  }
  if (user.role === "customer" && user.loggedInUserCount >= 2) {
    throw new ApiError(
      403,
      "Login unsuccessfull.",
      "Exceeded max login devices."
    );
  }

  // 8. Tokens
  const authToken = await user.generateAuthToken({
    userId: user.id,
    role: user.role,
  });
  const refreshToken = await user.generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  user.loggedInUserCount++;
  user.loginAttempts = 0;
  const saved = await user.save();

  if (!saved) {
    throw new ApiError(
      400,
      "Login unsuccessfull.",
      "Technical error, try again."
    )();
  }

  // Send refreshToken as secure cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Return safe user details
  const savedUser = {
    UUID: saved.UUID,
    name: saved.name,
    email: saved.email,
    phoneNumber: saved.phoneNumber,
    loginCount: saved.loginCount,
    authToken,
    loggedInUserCount: saved.loggedInUserCount,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Login successful."));
});
