import { Router } from "express";
import {
  authActivate,
  authRegister,
  checkLogin,
  forgotPassword,
  logout,
  resetPassword,
  userDetails,
  verifyLogin,
} from "../controllers/auth.controller.js";
import { Auth } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.get("/activate/:token", authActivate);
authRouter.post("/register", authRegister);
authRouter.post("/login", verifyLogin);
authRouter.get("/logout", Auth, logout);
authRouter.get("/status", Auth, checkLogin);
authRouter.get("/user", Auth, userDetails);
authRouter.post("/forgot", forgotPassword);
authRouter.patch("/reset/:resetToken", resetPassword);

export default authRouter;
