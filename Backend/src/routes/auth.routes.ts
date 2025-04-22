import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { CartController } from "../controllers/cart.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authenticate ,getProfile);
//cart routes
router.post("/", CartController.addToCart);
router.get("/:userId", CartController.getUserCart);
router.delete("/:itemId", CartController.removeFromCart);


  

export default router;


