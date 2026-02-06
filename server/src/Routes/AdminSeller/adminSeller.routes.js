import express from "express";
import {
  getCategories,
  getOrderedCategories,
} from "../../Controllers/AdminSeller/category.controller.js";
import tokenVerification from "../../Middlewares/tokenVerification.js";
import { requestEitherAdminSeller } from "../../Middlewares/requireRole.js";

const adminSellerRoutes = express.Router();

adminSellerRoutes
  .use(tokenVerification)
  .use(requestEitherAdminSeller())
  .get("/categories/:level", getCategories)
  .get("/categories", getOrderedCategories);

export default adminSellerRoutes;
