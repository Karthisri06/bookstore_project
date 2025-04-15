import express from "express";
import { AppDataSource } from "./data-source"; 
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";

const app = express();

app.get("/test", (req, res) => {
  res.send("Server is working!");
});


AppDataSource.initialize()
  .then(() => {
    console.log(" Connected to MySQL!");

    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/books", bookRoutes);

   
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



