import express from "express";
import { loginController } from "../../Controllers/auth/controller.js";
import validate from "../../Middlewares/validate.js";
import { customerLoginSchema } from "../../validations/authValidator.js";

const authRoutes = express.Router();

authRoutes.post("/login", validate(customerLoginSchema), loginController);
//   .post("/");

export default authRoutes;
