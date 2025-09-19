import express from "express";
import requireRole from "../../Middlewares/requireRole.js";
import tokenVerification from "../../Middlewares/tokenVerification.js";
const sellerRoutes = express.Router();

sellerRoutes.use(tokenVerification).use("/products", requireRole("seller"),);

export default sellerRoutes;
