import { Router } from "express";

import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.get("/", (req, res) => {
  // console.log(req.location);
  return res.status(200).json({ msg: "Hello from Ace-garage", success: true });
});
router.use("/api/v1/user", usersRouter);
router.use("/api/v1/auth", authRouter);

export default router;
