import express from "express";
import {
  loginController,
  registerAsAdmin,
  registrationController,
  logoutController,
  verifyOTP,
} from "../../Controllers/auth/controller.js";
import validate from "../../Middlewares/validate.js";
import {
  LoginSchema,
  otpVerificationSchema,
  RegistrationSchema,
} from "../../validations/authValidator.js";

const authRoutes = express.Router();

// one time manual postman registration --> no admin panel
// authRoutes.post("/register-as-admin", registerAsAdmin);

authRoutes
  .post("/login", validate(LoginSchema), loginController)
  .post("/register", validate(RegistrationSchema), registrationController)
  .post("/verify-otp", validate(otpVerificationSchema), verifyOTP)
  .post("/forgot-pass", validate(otpVerificationSchema))
  .post("/logout", logoutController);

export default authRoutes;
