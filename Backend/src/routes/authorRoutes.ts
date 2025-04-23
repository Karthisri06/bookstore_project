import express from "express";
import { publishBook, getAuthorBooks } from "../controllers/author.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = express.Router();

router.post("/publish/:author", authenticate, publishBook);
router.get("/my-books/:author", authenticate, getAuthorBooks);

export default router;