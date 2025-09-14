import bcrypt from "bcryptjs";
import ApiError from "../ApiError.js";
export const generateTokens = async (user) => {
  const authToken = await user.generateAuthToken({
    userId: user.id,
    role: user.role,
  });
  const refreshToken = await user.generateRefreshToken({
    userId: user.id,
    role: user.role,
  });
  return { authToken, refreshToken };
};

export const deviceLimitChecker = async (user) => {
  const isMaxDevicesHit = await user.maxDeviceLimitHit();
  if (isMaxDevicesHit) {
    throw new ApiError(403, "Exceeded max login devices limit.");
  }
};

export const createPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
