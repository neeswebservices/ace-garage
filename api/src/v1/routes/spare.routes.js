import { Router } from "express";
import { createSpare } from "../controllers/spare.controller.js";
import { Auth, verfiyEmployee } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadImage.js";
import {
  acceptAppointment,
  createAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller.js";

const router = Router();

router.post("/", Auth, verfiyEmployee, upload.single("image"), createSpare);
router.post("/announcement", Auth, createAppointment);

export default router;
