import { Router } from "express";
import {
  authRegister,
  checkLogin,
  logout,
  userDetails,
  verifyLogin,
} from "../controllers/auth.controller.js";
import { Auth } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", authRegister);
authRouter.post("/login", verifyLogin);
authRouter.get("/logout", Auth, logout);
authRouter.get("/status", Auth, checkLogin);
authRouter.get("/user", Auth, userDetails);

export default authRouter;
