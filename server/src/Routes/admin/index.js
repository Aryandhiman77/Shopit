import express from "express";
import tokenVerification from "../../Middlewares/tokenVerification.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import requireRole from "../../Middlewares/requireRole.js";
const adminRoutes = express.Router();

adminRoutes
  .use(tokenVerification)
  .use("/categories", requireRole("admin"), categoryRoutes);
export default adminRoutes;
