// routes/book.routes.ts
import { Router } from "express";
import { getBookGenre, getBooks } from "../controllers/book.controller";

const router = Router();

router.get("/", getBooks);
router.get("/genre/:genre",getBookGenre);


export default router;
