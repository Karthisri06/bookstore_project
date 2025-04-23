
import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

const router = Router();


router.post("/", CartController.addToCart);
router.get("/:userId", CartController.getUserCart);
router.delete("/:itemId", CartController.removeFromCart);

export default router;
