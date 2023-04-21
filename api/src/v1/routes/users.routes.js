import { Router } from "express";
import { getAllUsers, getAllVendors, requestVendor, updateProfile, updateUser } from "../controllers/user.controller.js";
import { verifyAdmin, Auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadImage.js";

const usersRouter = Router();
/* GET users listing. */
usersRouter.get("/", Auth, verifyAdmin, getAllUsers);
usersRouter.get("/vendor", Auth, verifyAdmin, getAllVendors);
usersRouter.post("/vendor", Auth, requestVendor);
usersRouter.patch("/update", Auth, updateUser);
usersRouter.post("/profile", Auth, upload.single("images"), updateProfile);

export default usersRouter;
