import express from "express";
const adminRoutes = express.Router();

adminRoutes.post("/category",createCategory);

export default adminRoutes;