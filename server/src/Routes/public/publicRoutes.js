import express, { Router } from "express";
import {
  getAllStructuredCategories,
  getCategories,
  getCategoryBrands,
  getCategoryProducts,
  getProducts,
  getProduct,
} from "../../Controllers/public/index.js";
const publicRoutes = Router();

//1.get categories --> if (level) return levelCategories else return structuredCategories
// 2. get products -> reusable with filters using query params

publicRoutes
  .get("/categories", getAllStructuredCategories)
  .get("/categories/:level", getCategories);

publicRoutes.get("/products", getCategoryProducts);
publicRoutes.get("/product/:slug", getProduct);
// publicRoutes.get("/product/additional-information", getProductDetail);
publicRoutes.get("/brands/:category", getCategoryBrands);
// publicRoutes.get("/products", getProducts);

export default publicRoutes;
