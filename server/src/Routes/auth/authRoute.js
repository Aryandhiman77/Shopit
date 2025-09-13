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
import { requireRole } from "../../Middlewares/requireRole.js";
import tokenMiddleware from "../../Middlewares/tokenMiddleware.js";

const authRoutes = express.Router();

// one time manual postman registration --> no admin panel
// authRoutes.post("/register-as-admin", registerAsAdmin);

authRoutes
  .post("/login", validate(LoginSchema), loginController)
  .post("/register", validate(RegistrationSchema), registrationController) // redirect to otp verification
  .post("/verify-otp", validate(otpVerificationSchema), verifyOTP)
  .post("/logout", validate(RegistrationSchema), logoutController);

export default authRoutes;
