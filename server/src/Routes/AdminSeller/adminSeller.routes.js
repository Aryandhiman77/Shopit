import express from "express";
import {
  getCategories,
  getOrderedCategories,
} from "../../Controllers/AdminSeller/category.controller.js";
import tokenVerification from "../../Middlewares/tokenVerification.js";
import { requestEitherAdminSeller } from "../../Middlewares/requireRole.js";
import productRoutes from "./routes/product.routes.js";
import brandRoutes from "./routes/brand.routes.js";

const adminSellerRoutes = express.Router();

adminSellerRoutes
  .use(tokenVerification)
  .use(requestEitherAdminSeller())
  .get("/categories/:level", getCategories)
  .get("/categories", getOrderedCategories)
  .use("/brands", brandRoutes)
  .use("/product", productRoutes);

export default adminSellerRoutes;
