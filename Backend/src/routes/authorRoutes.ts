import express from "express";
import { publishBook, getAuthorBooks } from "../controllers/author.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = express.Router();

// Only accessible after login
router.post("/publish", authenticate, publishBook);
router.get("/my-books", authenticate, getAuthorBooks);

export default router;

