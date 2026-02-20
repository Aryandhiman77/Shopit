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
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import ApiError from "./src/Helpers/ApiError.js";
import morgan from "morgan";
import os from "os";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];
// MIDDLEWARES
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new ApiError(403, "Not allowed by cors."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1minute
  limit: 60,
  handler: (req, res, next, options) => {
    throw new ApiError(429, "Too many clicks, please wait..");
  },
});
app.use(limiter); // endpoints must have separate api limitations

app.use(morgan(process.env.NODE_ENV !== "production" && "dev"));
app.use("/api/", routes);

app.use(errorHandler);
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Shopit running on ${APP_URL}`);
  });
});
