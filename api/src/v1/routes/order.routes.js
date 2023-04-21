import { Router } from "express";
import { changeStatus, getOrders, orderService } from "../controllers/order.controller.js";
import { Auth } from "../middlewares/auth.js";
import { getCart, toggleCartChecked } from "../controllers/cart.controller.js";

const orderRouter = Router();

orderRouter.post("/", Auth, orderService);
orderRouter.get("/", Auth, getOrders);
orderRouter.patch("/", Auth, changeStatus);
orderRouter.post("/toggle", Auth, toggleCartChecked);

export default orderRouter;
