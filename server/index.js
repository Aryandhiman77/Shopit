import express from "express";
import cors from "cors";
import { connectDB } from "./src/Config/dbConfig.js";
import authRoutes from "./src/Routes/auth/authRoute.js";
import errorHandler from "./src/Middlewares/errorHandler.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth/", authRoutes); // common auth route
app.use("/admin/", authRoutes); // admin route
// app.use("/api/seller/", AuthRouter); // admin routes
// app.use("/api/", AuthRouter);  // customer routes
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Shopit running on http://localhost:${process.env.PORT}`);
  });
});
