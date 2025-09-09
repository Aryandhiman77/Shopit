import express from "express";
import cors from "cors";
import AuthRouter from "./src/Routes/auth/authRoute.js";
import { connectDB } from "./src/Config/dbConfig.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth/", AuthRouter); // common auth route
app.use("/api/admin/", AuthRouter); // admin route
app.use("/api/seller/", AuthRouter); // admin routes
app.use("/api/", AuthRouter);  // customer routes


connectDB().then(() => {
  app.listen(process.env.PORT , () => {
    console.log(`Shopit running on http://localhost:${process.env.PORT}`);
  });
});
