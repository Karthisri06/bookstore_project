
import { Request, Response,Router } from "express";
import { AppDataSource } from "../data-source"; 
import { Book } from "../entities/Book"; 
import { ILike } from "typeorm";



const bookRepo = AppDataSource.getRepository(Book);

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookRepo.find(); 
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookGenre = async (req: Request, res: Response) => {
  try {
    const genre = req.params.genre;
    const books = await bookRepo.find({ where: { genre } }); 
    res.json(books.map(book => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      imageUrl: book.imageUrl,
      genre: book.genre,
      price: book.price,         
      rating: book.rating ,      
    })));
    
  } catch (err) {
    console.error("Error fetching books by genre:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getBookById = async (req: Request, res: Response):Promise<void> => {
  try {
    const bookId = parseInt(req.params.id);

  console.log('id', bookId)
    const book = await bookRepo.findOne({
      where: { id: bookId },
    });

    if (!book) {
    res.status(404).json({ message: "Book not found" });
      return 
    }

    res.json(book);
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
