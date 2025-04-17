
import { AppDataSource } from "../data-source";
import { fetchBooks } from "../seeders/fetchbooks";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    await fetchBooks();
    console.log("Seeding finished");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
