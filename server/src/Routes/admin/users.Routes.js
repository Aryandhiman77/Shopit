import express from "express";
import { getAllUsers } from "../../Controllers/admin/users.controller.js";
const UserRouter = express.Router();

UserRouter.get("/", getAllUsers);

export default UserRouter;
