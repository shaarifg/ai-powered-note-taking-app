import express from "express";
import cors from "cors";
import appConfig from "./config/app.config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import appRoutes from "./routes/index.js";

const app = express();

app.use(cors("*")); // CORS configuration

// Body Parser Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    environment: appConfig.app.environment,
    timestamp: new Date().toISOString(),
  });
});

// API Routes with versioning prefix
const API_PREFIX = appConfig.api.prefix;
app.use(API_PREFIX, appRoutes);

// 404 Handler
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
