import { Router } from "express";
import {
  approveOrRejectVendors,
  createCategory,
  deleteCategory,
  deleteService,
  getCategories,
  getPendingVendors,
  getServices,
} from "../controllers/admin.controller.js";
import { verifyAdmin, Auth } from "../middlewares/auth.js";

const adminRouter = Router();

adminRouter.post("/category", Auth, verifyAdmin, createCategory);

adminRouter.get("/category", getCategories);
adminRouter.delete("/category", deleteCategory);

adminRouter.get("/pending_vendors", getPendingVendors);
adminRouter.patch("/vendor", Auth, verifyAdmin, approveOrRejectVendors);
adminRouter.get("/service", Auth, verifyAdmin, getServices);
adminRouter.delete("/service", Auth, verifyAdmin, deleteService);

export default adminRouter;
