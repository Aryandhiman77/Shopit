import express from "express";
import { loginController, registerAsAdmin } from "../../Controllers/auth/controller.js";
import validate from "../../Middlewares/validate.js";
import { panelLoginSchema } from "../../validations/authValidator.js";

const authRoutes = express.Router();

// one time manual postman registration --> no admin panel
authRoutes.post("/register-as-admin", registerAsAdmin);

authRoutes.post("/login", validate(panelLoginSchema), loginController);

export default authRoutes;
