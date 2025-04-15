import express from "express";
// import { Request, Response } from "express";
import { AppDataSource } from "./data-source"; 
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import cors from "cors";


const app:express.Application=express();

app.use(cors({
  origin: "http://localhost:5178", 
  credentials: true, 
}));



app.use(express.json());
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

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



