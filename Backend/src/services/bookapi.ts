
import { Book } from "../entities/Book";
import { AppDataSource } from "../data-source";

const BookRepo = AppDataSource.getRepository(Book);

export const BookByGenre = async (genre: string) => {
  const books = await BookRepo.find({
    where: { genre },
  });
  return books;
};


export const getUnassignedBooks = async () => {
  try {
    const books = await AppDataSource.getRepository(Book).find({
      where: {
        authors: 'unknown', 
      },
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      genre: book.genre,
      price: book.price,
      rating: book.rating,
      authors: book.authors,
      imageUrl: book.imageUrl,
    }));
  } catch (err) {
    throw new Error("Error fetching unassigned books");
  }
};


export const assignAuthorToBook = async (bookId: number, authorId: string) => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const book = await bookRepo.findOneBy({ id: bookId });

    if (!book) {
      throw new Error("Book not found");
    }

    book.authors = authorId; // Update author field with the given authorId
    await bookRepo.save(book);

    return book;
  } catch (err) {
    throw new Error("Error assigning author to book");
  }
};