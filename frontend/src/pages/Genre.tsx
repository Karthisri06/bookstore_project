import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  authors: string;
  imageUrl?: string;
  genre: string;
}

const Genre = () => {
  const { genre } = useParams<{ genre: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (genre) {
      axios
        .get(`http://localhost:5000/books/genre/${genre}`)
        .then((res) => {
          console.log("books fetched:", res.data);
          setBooks(res.data.data);
          setError("");
        })
        .catch((err) => {
          setError("No books found in this genre.");
          console.error("Fetch error:", err);
        });
    }
  }, [genre]);

  return (
    <div className="container py-5">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {genre ? `Books in "${genre}"` : "Loading genre..."}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {books.map((book) => (
          <div key={book.id} className="col">
            <div className="card shadow-sm">
              <img
                src={book.imageUrl || "https://via.placeholder.com/150"} // Fallback image
                alt={book.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Title: {book.title}</h5>
                <p className="card-text">Author: {book.authors}</p>
                
                {/* Buttons are stacked vertically */}
                <div className="mt-auto d-flex flex-column gap-2">
                  <button
                    onClick={() => alert(`Added ${book.title} to cart`)}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => alert(`Bought ${book.title}`)}
                    className="btn btn-success"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!error && books.length === 0 && (
        <p className="mt-4 text-gray-500 text-center">No books to display yet.</p>
      )}
    </div>
  );
};

export default Genre;









