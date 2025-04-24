
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

AppDataSource.initialize().then(async () => {
  const userRepo = AppDataSource.getRepository(User);
  const bookRepo = AppDataSource.getRepository(Book);

  const user = userRepo.create({
    userName: "Karthisri",
    email: "karthisri@example.com",
    password: "hashedPassword", 
    role: "user"
  });

  const book = bookRepo.create({
    title: "Atomic Habits",
    author: "James Clear",
    price: 15.99,
    genre: "Self-help"
  });

  await userRepo.save(user);
  await bookRepo.save(book);

  console.log("Mock user and book seeded!");
  process.exit();
});
