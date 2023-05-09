import { Router } from "express";
import { createService } from "../controllers/employee.controller.js";
import { Auth, verfiyEmployee } from "../middlewares/auth.js";
import { createAppointment } from "../controllers/appointment.controller.js";

const router = Router();

router.post("/create", Auth, verfiyEmployee, createService);

export default router;
