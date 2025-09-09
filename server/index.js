import express from "express";
import cors from "cors";
import AuthRouter from "./src/Routes/authRoute.js";

const app = express();

// MIDDLEWARES
app.use(cors());               
app.use(express.json());      
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth/", AuthRouter);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Shopit running on http://localhost:${PORT}`);
});
