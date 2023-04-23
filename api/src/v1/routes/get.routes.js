import { Router } from "express";
import { getBranches, getBreakdown, getCategories, getSpares } from "../controllers/get.controller.js";

const getRouter = Router();

getRouter.get("/category", getCategories);
getRouter.get("/branch", getBranches);
getRouter.get("/breakdown", getBreakdown);
getRouter.get("/spare", getSpares);

export default getRouter;
