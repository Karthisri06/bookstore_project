import express from "express";
import { AppDataSource } from "./data-source"; 
import authRoutes from "./routes/auth.routes";
import authRoute from "./routes/authorRoutes";
import bookRoutes from "./routes/book.routes";
import { User } from "../src/entities/User";
import ReviewController from './routes/review.routes';
import cors from "cors";
import dotenv from 'dotenv'
import { CartController } from "./controllers/cart.controller";

dotenv.config();

const app:express.Application=express();

app.use(cors());


app.use(express.json());
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", ReviewController);
app.use("/author",authRoutes);
app.use("/cart", authRoutes );


app.get("/test", (req, res) => {
console.log("HI")
  res.status(200).json("Backend is working!");
});

AppDataSource.initialize()
  .then(() => {
    console.log(" Connected to MySQL!");
    app.listen(5000, () => {
      console.log(" Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("Error during DataSource initialization", error);
  });


  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

export default app;

