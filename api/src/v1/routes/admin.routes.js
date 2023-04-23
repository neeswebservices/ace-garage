import { Router } from "express";
import { createBranch, createBreakdown, createCategory } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/category", createCategory);
adminRouter.post("/branch", createBranch);
adminRouter.post("/breakdown", createBreakdown);

export default adminRouter;
