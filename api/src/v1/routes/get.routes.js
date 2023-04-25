import { Router } from "express";
import {
  getBranches,
  getBreakdown,
  getCategories,
  getSpares,
  getFaqs,
  getServices,
} from "../controllers/get.controller.js";
import {
  acceptAppointment,
  createAppointment,
  deleteAppointment,
  deleteCategory,
  getAppointment,
} from "../controllers/appointment.controller.js";
import { verfiyEmployee, Auth, verifyAdmin } from "../middlewares/auth.js";

const getRouter = Router();

getRouter.get("/category", getCategories);
getRouter.get("/branch", getBranches);
getRouter.get("/breakdown", getBreakdown);
getRouter.get("/spare", getSpares);
getRouter.get("/faq", getFaqs);
getRouter.get("/service", getServices);
getRouter.get("/appointments", Auth, verfiyEmployee, getAppointment);
getRouter.post("/appointment", Auth, verfiyEmployee, acceptAppointment);
getRouter.post("/appointment/delete", Auth, verfiyEmployee, deleteAppointment);
getRouter.post("/category/delete", Auth, verifyAdmin, deleteCategory);

export default getRouter;
