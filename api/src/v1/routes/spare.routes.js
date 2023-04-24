import { Router } from "express";
import { createSpare } from "../controllers/spare.controller.js";
import { Auth, verfiyEmployee } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadImage.js";

const router = Router();

router.post("/", Auth, verfiyEmployee, upload.single("image"), createSpare);

export default router;
