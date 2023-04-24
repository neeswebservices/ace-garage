import { Router } from "express";
import { book } from "../controllers/serviceBooking.controller.js";

const router = Router();

router.post("/service", book);

export default router;
