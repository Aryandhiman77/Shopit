import express from "express";
import requireRole from "../../Middlewares/requireRole.js";
import tokenVerification from "../../Middlewares/tokenVerification.js";
import productRoutes from "./product.routes.js";
import brandRoutes from "./brand.route.js";
const sellerRoutes = express.Router();

sellerRoutes
  .use(tokenVerification)
  .use("/products", requireRole("seller"), productRoutes)
  .use("/brand", requireRole("seller"), brandRoutes);

export default sellerRoutes;
