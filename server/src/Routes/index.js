import express from "express";
const router = express.Router();
import adminRoutes from "./admin/index.js";
import sellerRoutes from "./seller/index.js";
import customerRoutes from "./customer/index.js";
import authRoutes from "./auth/index.js";
import publicRoutes from "./public/publicRoutes.js";
import adminSellerRoutes from "./AdminSeller/adminSeller.routes.js";

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/seller", sellerRoutes);
router.use("/", publicRoutes); // open to anyone
router.use("/common", adminSellerRoutes);

export default router;
