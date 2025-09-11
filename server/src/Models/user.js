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
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    accountStatus: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    refreshToken: {
      type: String,
    },
    loggedInUserCount: {
      type: Number,
      default: 0,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    suspensionCount: {
      type: Number,
      default: 0, // how many times suspended
    },
    suspensionExpires: {
      type: Date,
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

userSchema.methods.suspendUser = function () {
  this.suspensionCount += 1;

  let duration;

  if (this.suspensionCount <= suspensionDurations.length) {
    // Pick from predefined list
    duration = suspensionDurations[this.suspensionCount - 1];
  } else {
    // Beyond 1 month → keep doubling until 6 months max
    const months = Math.min(
      30 * Math.pow(2, this.suspensionCount - suspensionDurations.length),
      180
    );
    duration = months * 24 * 60 * 60 * 1000;
  }

  this.accountStatus = "suspended";
  this.suspensionExpires = new Date(Date.now() + duration);
};
userSchema.methods.isSuspended = function () {
  if (this.accountStatus === "suspended") {
    if (this.suspensionExpires && Date.now() < this.suspensionExpires) {
      return true; // still suspended
    } else {
      this.accountStatus = "active";
      this.suspensionExpires = null;
      return false;
    }
  }

  return false; // active
};

const User = mongoose.model("User", userSchema);
export default User;
