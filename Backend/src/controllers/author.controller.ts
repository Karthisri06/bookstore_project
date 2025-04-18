import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { AuthRequest } from "../middleware/auth.middleware";
import { User } from "../entities/User";

export const publishBook = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, genre, imageUrl, price } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const bookRepo = AppDataSource.getRepository(Book);

    const user = await userRepo.findOne({ where: { id: req.user?.id } });

    if (!user || user.role !== "author") {
      res.status(403).json({ message: "Only authors can publish books" });
      return;
    }

    const newBook = bookRepo.create({
      title,
      description,
      genre,
      imageUrl,
      price,
      author: user, 
    });

    await bookRepo.save(newBook);

    res.status(201).json({ message: "Book published successfully", book: newBook });
  } catch (err:any) {
    console.error("Error publishing book:", err.message,err.stack);
    res.status(500).json({ message: "Failed to publish book", error: err.message  });
  }
};


export const getAuthorBooks = async (req: AuthRequest, res: Response) => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);

    const books = await bookRepo.find({
      where: { author: { id: req.user?.id } },
      relations: ["author"],
    });

    res.json(books);
  } catch (err) {
    console.error("Error fetching author's books:", err);
    res.status(500).json({ message: "Failed to get books" });
  }
};

