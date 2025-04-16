import { Request, Response ,NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { User } from "../entities/User"; 
import { BookByGenre } from "../services/bookapi";


export const getBooks = async (req: Request, res: Response) => {
  try {
    console.log("Request received at /books");

    const bookRepo = AppDataSource.getRepository(Book);
    console.log("Book repository loaded");

    const books = await bookRepo.find({
      relations: ["author"],  // Ensure that the 'author' relation is included
    });

    console.log("Books fetched:", books.length);
    res.json(books);
  } catch (error) {
    console.error("Error in getBooks:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
};


export const assignAuthorToBook = async (req: Request, res: Response) => {
  const { bookId, email } = req.body;

  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const userRepo = AppDataSource.getRepository(User);

    // Find the book by ID
    const book = await bookRepo.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find the user by email
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assign the user as the author of the book
    book.authors = user.email;

    // Save the updated book
    await bookRepo.save(book);

    // Optionally, you can update the user's role to "author" here if necessary
    user.role = "author";
    await userRepo.save(user);

    // Send a success response
    res.json({ message: "Author assigned successfully" });

  } catch (error) {
    console.error("Error in assignAuthorToBook:", error);
    res.status(500).json({ message: "Error assigning author" });
  }
};



export const getBookGenre = async (req: Request, res: Response):Promise<void> => {
  try {
    const genre = req.params.genre;
    console.log("Genre received:", genre);

    const books = await BookByGenre(genre);
    
    if (books.length === 0) {
       res.status(404).json({ message: `No books found for genre: ${genre}` });
       return
    }

    res.status(200).json({ data: books });
  } catch (e) {
    console.error("Error fetching books by genre:", e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

