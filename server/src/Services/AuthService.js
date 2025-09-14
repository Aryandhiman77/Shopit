import AsyncWrapper from "../Helpers/AsyncWrapper.js";
import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import ApiError from "../Helpers/ApiError.js";
import { formatDate, formatTime } from "../Helpers/DateTime.js";
import { verificationOtp } from "../Helpers/html/verificationOtp.js";
import mailSender from "../Helpers/nodeMailer.js";
import crypto from "crypto";
import JWT from "jsonwebtoken";
export const loginUserService = async ({
  email,
  UUID,
  phoneNumber,
  password,
  role,
}) => {
  // 1. Find user
  const user = await User.findOne({
    $or: [{ email }, { UUID }, { phoneNumber }],
  });
  if (!user) throw new ApiError(404, "User not found.");

  // 2. Check suspension &  roles validity
  if (user.isSuspended()) {
    throw new ApiError(
      403,
      `Account Suspended until ${user.suspensionExpires.toLocaleString()}`
    );
  }
  if (user.role !== role) throw new ApiError(403, "Access denied.");

  // 3. Too many attempts
  if (user.loginAttempts >= 10) {
    await user.suspendUser();
    await user.save();
    throw new ApiError(
      403,
      `Max login attempts exceeded. Account Suspended until ${formatDate(
        user.suspensionExpires
      )} ${formatTime(user.suspensionExpires)}`
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
  const isMaxDevicesHit = await user.maxDeviceLimitHit();
  if (isMaxDevicesHit)
    throw new ApiError(403, "Exceeded max login devices limit.");

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
  user.refreshToken.push(refreshToken);

  await user.save();

  return { user, refreshToken, authToken };
};

export const registerUserService = async ({
  name,
  email,
  password,
  phoneNumber,
  role,
}) => {
  const isExistingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (isExistingUser) {
    if (isExistingUser.email === email) {
      throw new ApiError(409, `User already exists with this email.`);
    }
    if (isExistingUser.phoneNumber === phoneNumber) {
      throw new ApiError(409, `User already exists with this phone number.`);
    }
  }
  // 2. Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //3.Create user
  const createdUser = await User.create({
    name,
    email,
    passwordHash: hash,
    phoneNumber,
    role,
  });

  //   4.Authorize using verification otp
  const OTP = await createdUser.createResetCode();
  await createdUser.save();
  mailSender({
    from: "support@shopit.com",
    to: email,
    subject: "Shopit phone verification",
    html: verificationOtp({ OTP }),
  });
  return { email };
};

export const otpVerificationService = async ({ otp, email }) => {
  const resetCode = crypto.createHash("sha256").update(otp).digest("hex");
  //1. VERIFY THE USER'S RESET TOKEN AND INVALIDATE AFTER 10 MINUTES
  const verifiedUser = await User.findOne({
    $and: [{ email }, { resetCode }, { resetCodeExpires: { $gt: Date.now() } }],
  });
  if (!verifiedUser) {
    throw new ApiError(400, `Invalid verification code.`);
  }

  // 2. GENERATE TOKENS TO GIVE LOGIN
  const authToken = await verifiedUser.generateAuthToken({
    userId: verifiedUser.id,
    role: verifiedUser.role,
  });
  const refreshToken = await verifiedUser.generateRefreshToken({
    userId: verifiedUser.id,
    role: verifiedUser.role,
  });
  const isMaxDevicesHit = await verifiedUser.maxDeviceLimitHit();
  console.log(isMaxDevicesHit);
  if (isMaxDevicesHit) {
    throw new ApiError(403, "Exceeded max login devices limit.");
  }
  // 3. SAVING MODIFIED USER INFO
  verifiedUser.loggedInUserCount++;
  verifiedUser.refreshToken.push(refreshToken);
  verifiedUser.verifiedEmail = true;
  verifiedUser.resetCode = null;
  verifiedUser.resetCodeExpires = null;

  await verifiedUser.save();

  return { user: verifiedUser, refreshToken, authToken };
};

export const logoutUserService = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new ApiError(403, "Already logged out.");
  }
  const user = await User.findOne({ refreshToken });
  if (!user) throw new ApiError(403, "Already logged out.");
  user.refreshToken = user.refreshToken.filter((t) => t !== refreshToken);
  user.loggedInUserCount--;
  await user.save();
};
