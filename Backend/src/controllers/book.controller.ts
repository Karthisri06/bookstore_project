
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";


export const getBooks = async (req: Request, res: Response) => {
  try {
    console.log("Request received at /books");

    const bookRepo = AppDataSource.getRepository(Book);
    console.log("Book repository loaded");

    const books = await bookRepo.find({
      relations: ["genre"],
    });

    console.log("Books fetched:", books.length);
    res.json(books);
  } catch (error) {
    console.error("Error in getBooks:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
};
  
  
