import express from "express";
import cors from "cors";
import { connectDB } from "./src/Config/dbConfig.js";
import authRoutes from "./src/Routes/auth/index.js";
import errorHandler from "./src/Middlewares/errorHandler.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "node:url";
import { APP_URL } from "./src/Config/appConfig.js";
import routes from "./src/Routes/index.js";

const app = express();

// MIDDLEWARES
app.use(cors());
// app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

app.use("/api/", routes);

app.use(errorHandler);
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Shopit running on ${APP_URL}`);
  });
});
