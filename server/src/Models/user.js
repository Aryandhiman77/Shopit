import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import crypto from "crypto";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    UUID: {
      type: String,
      default: () => customAlphabet("1234567890", 12)(),
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "seller"],
      default: "customer",
    },
    accountStatus: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    refreshToken: {
      type: String,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

userSchema.methods.createResetPasswordCode = function () {
  const generateResetCode = customAlphabet("1234567890", 6);
  const resetCode = generateResetCode();
  this.passwordResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  this.passwordResetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  // console.log(resetCode, this.passwordResetCode);
  return resetCode;
};
userSchema.methods.generateAuthToken = function ({ userId, role }) {
  const payload = { userId, role };
  const token = JWT.sign(payload, process.env.JWT_AUTH_SECRET, {
    expiresIn: process.env.JWT_AUTH_EXPIRY,
  });
  return token;
};
userSchema.methods.generateRefreshToken = function ({ userId, role }) {
  const payload = { userId, role };
  const token = JWT.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
