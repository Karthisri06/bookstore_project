
import { Book } from "../entities/Book";
import { AppDataSource } from "../data-source";

const BookRepo = AppDataSource.getRepository(Book);

export const BookByGenre = async (genre: string) => {
  const books = await BookRepo.find({
    where: { genre },
  });
  return books;
};
