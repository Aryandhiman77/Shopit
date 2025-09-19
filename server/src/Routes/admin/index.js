import express from "express";
import tokenVerification from "../../Middlewares/tokenVerification.js";
import categoryRoutes from "./category.Routes.js";
import requireRole from "../../Middlewares/requireRole.js";
const adminRoutes = express.Router();

adminRoutes
  .use(tokenVerification)
  .use("/categories", requireRole("admin"), categoryRoutes);
export default adminRoutes;
