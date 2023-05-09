import { Router } from "express";
import { createService } from "../controllers/employee.controller.js";
import { upload } from "../middlewares/uploadImage.js";
import { Auth, verfiyEmployee } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/service",
  Auth,
  verfiyEmployee,
  upload.single("image"),
  createService
);

export default router;
