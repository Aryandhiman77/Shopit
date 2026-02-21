import express from "express";
import tokenVerification from "../../Middlewares/tokenVerification.js";
import categoryRoutes from "./category.Routes.js";
import requireRole from "../../Middlewares/requireRole.js";
import brandRoutes from "./brand.Route.js";
import productRoutes from "./product.Routes.js";
import UserRouter from "./users.Routes.js";
const adminRoutes = express.Router();

adminRoutes
  .use(tokenVerification)
  .use("/categories", requireRole("admin"), categoryRoutes)
  .use("/brands", requireRole("admin"), brandRoutes)
  .use("/products", requireRole("admin"), productRoutes)
  .use("/users", requireRole("admin"), UserRouter);
export default adminRoutes;
