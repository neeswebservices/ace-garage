import { Router } from "express";
import { addCartItems, getCart, toggleCartChecked } from "../controllers/cart.controller.js";
import { Auth } from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.post("/add/:id", Auth, addCartItems);
cartRouter.get("/toggle", Auth, toggleCartChecked);

cartRouter.get("/", Auth, getCart);

export default cartRouter;
