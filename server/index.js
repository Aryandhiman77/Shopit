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

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
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

app.use(morgan("dev"));
app.use("/api/", routes);

app.use(errorHandler);
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Shopit running on ${APP_URL}`);
  });
});
