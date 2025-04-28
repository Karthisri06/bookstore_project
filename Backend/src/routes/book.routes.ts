import { Router } from "express";
import { getBookGenre, getBooks, getBookById, editBook } from "../controllers/book.controller";

const router = Router();

router.get("/", getBooks); 
router.get("/genre/:genre", getBookGenre); 
router.get("/:id", getBookById);

router.put("/:id", editBook);



export default router;

