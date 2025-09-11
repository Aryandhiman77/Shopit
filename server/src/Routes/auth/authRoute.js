import express from "express";
import {loginController,registerAsAdmin} from "../../Controllers/auth/controller.js";


const authRoutes = express.Router();
    
// one time manual postman registration --> no admin panel
// authRoutes.post("/register-as-admin",registerAsAdmin);

// authRoutes.post("/login",loginController);



export default authRoutes;