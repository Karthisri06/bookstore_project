
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Book, Genre } from "../types";

const Home = () => {
  const [hotBooks, setHotBooks] = useState<Book[]>([]); 
  const [carouselBooks, setCarouselBooks] = useState<Book[]>([]); 
  const [genres, setGenres] = useState<Genre[]>([]); 

  useEffect(() => {
   
    const fetchBooks = async () => {
      try {
        const res = await axios.get<Book[]>("http://localhost:5000/auth/books"); // Specify response type
        setHotBooks(res.data.filter((book) => book.isHotSelling)); // For hot selling books
        setCarouselBooks(res.data); // All books for carousel
        setGenres(
          res.data
            .map((book) => book.genre) // Get genres from books
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .map((genre) => ({ name: genre })) // Create Genre objects
        ); // Unique genres
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mt-5 pt-4">
      {/* 🔥 First Container: Hot Selling Books */}
      <h2 className="mb-4 text-center">Recently Hot Selling Books</h2>
      <div className="row">
        {hotBooks.length === 0 ? (
          <p>No hot selling books available.</p>
        ) : (
          hotBooks.slice(0, 5).map((book) => (
            <div className="col-md-3 mb-4" key={book.id}>
              <div className="card h-100">
                <img
                  src={book.imageUrl}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author?.name || "Unknown Author"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🎠 Second Container: Carousel of Books */}
      <h2 className="mb-4 text-center">Featured Books</h2>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {carouselBooks.slice(0, 5).map((book, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={book.id}>
              <div className="d-flex justify-content-center">
                <img
                  src={book.imageUrl}
                  className="d-block w-50"
                  alt={book.title}
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5>{book.title}</h5>
                <p>{book.author?.name || "Unknown Author"}</p>
                <div>
                  <button className="btn btn-primary mx-2">Add to Cart</button>
                  <button className="btn btn-success">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* 🏷 Third Container: Genre Buttons */}
      <h2 className="mb-4 text-center">Explore by Genre</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {genres.length === 0 ? (
          <p>No genres available.</p>
        ) : (
          genres.map((genre) => (
            <Link key={genre.name} to={`/genre/${genre.name}`} className="btn btn-outline-secondary mx-2 my-2">
              {genre.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;




