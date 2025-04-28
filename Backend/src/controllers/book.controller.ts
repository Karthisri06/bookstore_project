import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

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

export const getBookGenre = async (req: Request, res: Response):Promise<void> => {
  try {
    const genre = req.params.genre;

    if (!genre) {
   res.status(400).json({ message: "Genre is required" });
   return 
    }

    const books = await bookRepo.find({ where: { genre } });

    if (books.length === 0) {
      res.status(404).json({ message: `No books found for genre: ${genre}` });
      return
    }

    res.json(books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      imageUrl: book.imageUrl,
      genre: book.genre,
      price: book.price,         
      rating: book.rating,      
    })));
    
  } catch (err) {
    console.error("Error fetching books by genre:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  console.log('rewerty', req.params)
  try {
    const bookId = parseInt(req.params.id);

   
    if (isNaN(bookId)) {
     res.status(400).json({ message: "Invalid book ID" });
     return
    }

    const book = await bookRepo.findOne({
      where: { id: bookId },
    });
console.log(book, 'wertyujhrhjjhgfd')
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


export const editBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = parseInt(req.params.id);
    const { title, description, genre, price, imageUrl } = req.body;

    if (isNaN(bookId)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const book = await bookRepo.findOne({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Update the book details
    book.title = title || book.title;
    book.description = description || book.description;
    book.genre = genre || book.genre;
    book.price = price || book.price;
    book.imageUrl = imageUrl || book.imageUrl;

    // Save the updated book
    await bookRepo.save(book);

    res.json({ message: "Book updated successfully", book });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};