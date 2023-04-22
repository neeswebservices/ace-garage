import { Router } from "express";
import { createSpare } from "../controllers/spare.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = Router();

router.post("/", Auth, createSpare);

export default router;
