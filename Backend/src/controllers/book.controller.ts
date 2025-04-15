// controllers/book.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";


export const getBooks = async (req: Request, res: Response):Promise<void> => {
    try {
      const genre = req.query.genre as string;
  
      const bookRepo = AppDataSource.getRepository(Book);
      const query = bookRepo
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.genre", "genre");
  
      if (genre) {
        query.where("genre.name = :genre", { genre });
      }
  
      const books = await query.getMany();
  
      res.json(books);
      return


    } catch (err) {
      console.error(err);
     res.status(500).json({ message: "Error fetching books" });
     return
    }
  };
  
  
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const book = await bookRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["genre"],
    });

    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
};
