import { Router } from "express";
import {
  addToCart,
  getCart,
  removeItem,
} from "../controllers/cart.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = Router();

router.post("/", Auth, addToCart);
router.get("/", Auth, getCart);
router.post("/remove", Auth, removeItem);

export default router;
