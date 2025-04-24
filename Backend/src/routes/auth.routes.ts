import { Router } from "express";
import { registerUser, loginUser, getProfile, getAllUsers, deleteUser, editUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { CartController } from "../controllers/cart.controller";
import { getAuthorBooks, publishBook } from "../controllers/author.controller";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authenticate ,getProfile);
router.get("/alluser",authenticate,getAllUsers);
router.put("/update", authenticate, editUser);
router.delete("/delete", authenticate, deleteUser);





export default router;


