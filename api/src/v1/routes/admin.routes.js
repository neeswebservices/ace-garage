import { Router } from "express";
import {
  createBranch,
  createBreakdown,
  createCategory,
  createEmployee,
  createFAQ,
  getBranches,
  getEmployee,
  getUser,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/category", createCategory);
adminRouter.post("/branch", createBranch);
adminRouter.post("/breakdown", createBreakdown);
adminRouter.post("/faq", createFAQ);
adminRouter.post("/employee", createEmployee);

adminRouter.get("/users", getUser);
adminRouter.get("/employees", getEmployee);
adminRouter.get("/branch", getBranches);

export default adminRouter;
