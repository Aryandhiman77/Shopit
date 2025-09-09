import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    UUID: {
      type: String,
      default: () => customAlphabet("1234567890", 10),
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
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
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);
userSchema.methods.createResetPasswordCode = function () {
  const generateResetCode = nanoid.customAlphabet("1234567890", 6);
  const resetCode = generateResetCode();
  this.passwordResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  this.passwordResetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  console.log(resetCode, this.passwordResetCode);
  return resetCode;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
