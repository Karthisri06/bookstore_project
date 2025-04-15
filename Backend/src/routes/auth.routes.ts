import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authenticate ,getProfile);


  

export default router;


