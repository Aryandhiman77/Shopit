import express from "express";
const router = express.Router();
import adminRoutes from "./admin/index.js";
import sellerRoutes from "./seller/index.js";
import customerRoutes from "./customer/index.js";
import authRoutes from "./auth/index.js";

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/seller", sellerRoutes);
// router.use("/", customerRoutes);

export default router;
