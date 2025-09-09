import express from "express";
import cors from "cors";
import AuthRouter from "./src/Routes/authRoute.js";
import { connectDB } from "./src/Config/dbConfig.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth/", AuthRouter);


connectDB().then(() => {
  app.listen(process.env.PORT , () => {
    console.log(`Shopit running on http://localhost:${process.env.PORT}`);
  });
});
