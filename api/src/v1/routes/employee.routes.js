import { Router } from "express";
import { createService } from "../controllers/employee.controller.js";

const router = Router();

router.post("/service", createService);

export default router;
