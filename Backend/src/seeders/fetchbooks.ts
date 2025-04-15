import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { Genre } from "../entities/Genre";
import axios from "axios";

export const fetchBooks = async () => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const genreRepo = AppDataSource.getRepository(Genre);

    
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

    
    for (const genreName of genres) {
    
      let genre = await genreRepo.findOneBy({ name: genreName });
      if (!genre) {
        genre = genreRepo.create({ name: genreName });
        await genreRepo.save(genre);
      }

    
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genreName}&maxResults=20&key=AIzaSyB0u68RLRHkWd70jiX1i_slsxOIrI1uFYY`
      );
      const books = response.data.items;

      for (const item of books) {
       
        const imageUrl = item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.large ||
            item.volumeInfo.imageLinks.medium ||
            item.volumeInfo.imageLinks.thumbnail
          : "/default-book-cover.jpg";  

        const book = bookRepo.create({
          title: item.volumeInfo.title,
          authors: (item.volumeInfo.authors || ["Unknown"]).join(", "),
          description: item.volumeInfo.description || "No description available",
          imageUrl,  
          genre, 
          price: parseFloat((Math.random() * 500 + 100).toFixed(2)),    
          isHotSelling: false,  
        });

        
        await bookRepo.save(book);
        console.log(`Saved book: ${book.title}`);
      }
    }
  } catch (error) {
    console.error("Error in fetchBooks seeder:", error);
  }
};





