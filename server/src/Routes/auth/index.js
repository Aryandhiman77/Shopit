import express from "express";
import {
  loginController,
  registerAsAdmin,
  registrationController,
  logoutController,
  forgotPassController,
  verifyOTP,
  forgotPassOTPCheckController,
  resetPassController,
  renewUserTokens,
  getMe
} from "../../Controllers/auth/controller.js";
import validate from "../../Middlewares/validate.js";
import {
  resetPasswordSchema,
  forgotPasswordSchema,
  LoginSchema,
  otpVerificationSchema,
  RegistrationSchema,
} from "../../validations/authValidator.js";
import tokenVerification from "../../Middlewares/tokenVerification.js";

const authRoutes = express.Router();

// one time manual postman registration --> no admin panel
// authRoutes.post("/register-as-admin", registerAsAdmin);

authRoutes
  .post("/login", validate(LoginSchema), loginController)
  .post("/register", validate(RegistrationSchema), registrationController)
  .post("/verify-otp", validate(otpVerificationSchema), verifyOTP)
  .post("/forgot-pass", validate(forgotPasswordSchema), forgotPassController)
  .post(
    "/verify-reset-otp",
    validate(otpVerificationSchema),
    forgotPassOTPCheckController,
  )
  .post(
    "/reset-password",
    validate(resetPasswordSchema),
    tokenVerification,
    resetPassController,
  )
  .patch("/logout", logoutController)
  .patch("/refresh-access", renewUserTokens);

authRoutes.get("/me", tokenVerification, getMe);

export default authRoutes;
