import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { AuthRequest } from "../middleware/auth.middleware";
import { User } from "../entities/User";

export const publishBook = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, genre, imageUrl, price } = req.body;
console.log(req, '123456789095423456789098765, ', req.params)
  try {
    const bookRepo = AppDataSource.getRepository(Book);

    // Save author's name as a string in the Book entity
    const newBook = bookRepo.create({
      title:title,
      description:description,
      genre:genre,
      imageUrl:imageUrl,
      price:price,
      author: req.params.author,
    });
    console.log(newBook, 'new')

    await bookRepo.save(newBook);

    res.status(201).json({ message: "Book published successfully", book: newBook });
  } catch (err: any) {
    console.error("Error publishing book:", err.message, err.stack);
    res.status(500).json({ message: "Failed to publish book", error: err.message });
  }
};

export const getAuthorBooks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('req1111111111111111111111111', req.params.author)
    const userRepo = AppDataSource.getRepository(User);
    const bookRepo = AppDataSource.getRepository(Book);

    // const user = await userRepo.findOne({ where: { id: req.user?.id } });

    // if (!user || user.role !== "author") {
    //   res.status(403).json({ message: "Only authors can view their books" });
    //   return;
    // }

    // Query books using author's name as string
    const books = await bookRepo.find({ where: { author: req.params.author } });

    res.json(books);
  } catch (err) {
    console.error("Error fetching author's books:", err);
    res.status(500).json({ message: "Failed to get books" });
  }
};



