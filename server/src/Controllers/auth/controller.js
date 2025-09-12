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
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // 2. Check suspension &  roles validity
  if (user.isSuspended()) {
    throw new ApiError(
      403,
      `Max login attempts exceeded. Account Suspended until ${user.suspensionExpires.toLocaleString()}`
    );
  }
  if (user.role !== role) {
    throw new ApiError(403, "Access denied.");
  }

  // 3. Too many attempts
  if (user.loginAttempts >= 10) {
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

  // 5. Max device limit
  const DEVICE_LIMITS = {
    admin: 1,
    seller: 1,
    customer: 2,
  };
  if (user.loggedInUserCount >= DEVICE_LIMITS[user.role]) {
    throw new ApiError(403, "Exceeded max login devices.");
  }

  // 6. Tokens for giving successful login.
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
  user.suspensionCount = 0;
  user.suspensionExpires = null;

  const saved = await user.save();

  if (!saved) {
    throw new ApiError(
      400,
      "Login unsuccessfull.",
      "Technical error, try again."
    );
  }

  // 7.Send refreshToken as secure cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // 8.Return safe user details
  const savedUser = {
    UUID: saved.UUID,
    name: saved.name,
    email: saved.email,
    phoneNumber: saved.phoneNumber,
    authToken,
    loggedInUserCount: saved.loggedInUserCount,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Login successful."));
});
