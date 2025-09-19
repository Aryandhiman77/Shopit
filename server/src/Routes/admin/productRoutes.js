import express from "express";
import { nanoid } from "nanoid";
const adminRoutes = express.Router();

adminRoutes.get("/products",createProduct)

export default adminRoutes;
