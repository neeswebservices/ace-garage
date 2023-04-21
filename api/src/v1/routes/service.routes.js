import { Router } from "express";
import { createService, getServices, getService, getSingleService } from "../controllers/service.controller.js";
import { Auth, verfiyEmployee } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadImage.js";
// import { uploadImageMiddleware } from '../middlewares/uploadImage.js';

const serviceRouter = Router();

serviceRouter.post("/", Auth, verfiyEmployee, upload.array("images", 10), createService);

serviceRouter.get("/", getServices);
serviceRouter.get("/single", getSingleService);
serviceRouter.get("/single", getService);

export default serviceRouter;
