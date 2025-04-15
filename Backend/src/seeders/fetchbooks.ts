import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book"; // Make sure the correct path is here
import axios from "axios";

const fetchBooks = async () => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const genres = [
      "fiction",
      "romance",
      "science",
      "fantasy",
      "mystery",
      "biography",
      "history",
      "art",
      "self-help",
      "children",
      "poetry",
      "horror",
      "adventure",
      "comics",
      "travel",
    ];

    for (const genre of genres) {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=20&key=YOUR_GOOGLE_API_KEY`
      );
      
      const books = response.data.items;
      
      // Loop through books and save them to the DB
      for (const item of books) {
        const book = bookRepo.create({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown"],
          imageUrl: item.volumeInfo.imageLinks?.thumbnail,
          description: item.volumeInfo.description || "No description available",
          genre: genre,
        });

        await bookRepo.save(book);  // Save each book to the database
        console.log(`Saved book: ${book.title}`);
      }
    }
  } catch (error) {
    console.error("Error in fetchBooks seeder:", error);
  }
};

fetchBooks();

