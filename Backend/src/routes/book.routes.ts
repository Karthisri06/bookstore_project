import { Router } from "express";
import { getBookGenre, getBooks, getBookById } from "../controllers/book.controller";
const router = Router();

router.get("/", getBooks); 
router.get("/genre/:genre", getBookGenre); 
router.get("/:id", getBookById);


export default router;

