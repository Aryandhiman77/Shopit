import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import ApiError from "../Helpers/ApiError.js";
import { formatDate, formatTime } from "../Helpers/DateTime.js";
import { verificationOtp } from "../Helpers/html/verificationOtp.js";
import mailSender from "../Helpers/nodeMailer.js";
import crypto from "crypto";
import cryptoHash from "../Helpers/cryptoHash.js";
import {
  createPasswordHash,
  deviceLimitChecker,
  generateTokens,
} from "../Helpers/Auth/authHelper.js";
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

  if (user.loggedInUserCount > 0 && user.loggedInUserCount <= 3) {
    const OTP = await user.createResetCode();
    mailSender({
      from: "support@shopit.com",
      to: user.email,
      subject: "Shopit OTP verification",
      html: verificationOtp({ OTP }),
    });
    await user.save();
    return { email: user.email };
  }
  // 5. Max device limit
  await deviceLimitChecker(user);

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
  const hash = await createPasswordHash(password);

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
    to: createdUser.email,
    subject: "Shopit OTP verification",
    html: verificationOtp({ OTP }),
  });
  return { email };
};

export const otpVerificationService = async ({ otp, email, phoneNumber }) => {

  const resetCode = cryptoHash(otp);
  const verifiedUser = await User.findOne({
    $and: [
      { $or: [{ email }, { phoneNumber }] },
      { resetCode },
      { resetCodeExpires: { $gt: Date.now() } },
    ],
  });
  if (!verifiedUser) {
    throw new ApiError(400, `Invalid verification code.`);
  }
  verifiedUser.resetCode = null;
  verifiedUser.resetCodeExpires = null;

  return { user: verifiedUser };
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

export const forgotPassService = async ({ email, phoneNumber }) => {
  const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (!user) throw new ApiError(404, "User not found.");

  const OTP = await user.createResetCode();
  if (!OTP) throw new ApiError(403, "Technical issue, try again.");
  mailSender({
    from: "support@shopit.com",
    to: user.email,
    subject: "Shopit OTP verification",
    html: verificationOtp({ OTP }),
  });
  await user.save();

  return { email: user.email };
};
