import express from "express";
import {
  loginController,
  registerAsAdmin,
} from "../../Controllers/auth/controller.js";
import validate from "../../Middlewares/validate.js";
import { LoginSchema } from "../../validations/authValidator.js";
import { requireRole } from "../../Middlewares/requireRole.js";
import tokenMiddleware from "../../Middlewares/tokenMiddleware.js";

const authRoutes = express.Router();

// one time manual postman registration --> no admin panel
authRoutes.post("/register-as-admin", registerAsAdmin);

authRoutes.post("/login", validate(LoginSchema), loginController);

export default authRoutes;
