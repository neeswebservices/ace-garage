import { Router } from "express";
import { createService } from "../controllers/employee.controller";
import { Auth } from "../middlewares/auth";

const router = Router();

router.post("/create", Auth, createService);

export default router;
