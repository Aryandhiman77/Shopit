import express from "express";
import cors from "cors";
import AuthRouter from "./src/Routes/auth/authRoute.js";
import { connectDB } from "./src/Config/dbConfig.js";
import adminRoutes from "./src/Routes/admin/productRoutes.js";
import authRoutes from "./src/Routes/auth/authRoute.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth/", authRoutes); // common auth route
// app.use("/api/admin/", adminRoutes); // admin route
// app.use("/api/seller/", AuthRouter); // admin routes
// app.use("/api/", AuthRouter);  // customer routes


connectDB().then(() => {
  app.listen(process.env.PORT , () => {
    console.log(`Shopit running on http://localhost:${process.env.PORT}`);
  });
});
