import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv/config";
import * as url from "url";
import indexRouter from "./src/v1/routes/index.js";
import usersRouter from "./src/v1/routes/users.routes.js";
import authRouter from "./src/v1/routes/auth.routes.js";
import cors from "cors";
import serviceRouter from "./src/v1/routes/service.routes.js";
import adminRouter from "./src/v1/routes/admin.routes.js";
import orderRouter from "./src/v1/routes/order.routes.js";
import cartRouter from "./src/v1/routes/cart.routes.js";

const app = express();
export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "./src/v1/public/*")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes configurations

app.use("/", indexRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);

// Handling error in routes

app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.status || 500).send({
      msg: err.message || "Opps ! Something went wrong 🥲...",
      success: false,
      stack: process.env.ENV === "development" ? err.stack : null,
    });
  }
});

export default app;
