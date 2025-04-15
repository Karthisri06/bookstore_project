import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Book, Genre } from "../types";
import AuthModal from "../pages/Authmodal"; 

const Home = () => {
  const [hotBooks, setHotBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [showModal, setShowModal] = useState(false); 
  const isLoggedIn = false;

  const handleLogin = (email: string, password: string) => {
    console.log("Logging in with", email, password);
    setShowModal(false);
  };

  const handleSignup = (email: string, password: string) => {
    console.log("Signing up with", email, password);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get<Book[]>("http://localhost:5000/books");
        const allBooks = res.data;

        const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
        setHotBooks(shuffled.slice(0, 5));
        setFeaturedBooks(allBooks.slice(0, 15));

        const seen = new Set<string>();
        const uniqueGenres: Genre[] = [];
        allBooks.forEach((book) => {
          if (book.genre && book.genre.name && !seen.has(book.genre.name)) {
            seen.add(book.genre.name);
            uniqueGenres.push(book.genre);
          }
        });
        setGenres(uniqueGenres);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  const scrollLeft = () => {
    const container = document.getElementById("featured-scroll");
    if (container) container.scrollLeft -= 300;
  };

  const scrollRight = () => {
    const container = document.getElementById("featured-scroll");
    if (container) container.scrollLeft += 300;
  };

  return (
    <div className="container mt-5 pt-4" style={{ maxWidth: "1200px" }}>
      <AuthModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />

      <section className="mb-5">
        <h2 className="mb-4 text-center"> Hot Selling Books</h2>
        <div id="hotCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {hotBooks.map((book, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={book.id}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "350px" }}>
                  <img
                    src={book.imageUrl || "/default-book-cover.jpg"}
                    className="d-block"
                    alt={book.title}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                  <h5>{book.title}</h5>
                  <p>{book.authors || "Unknown Author"}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#hotCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-dark rounded-circle p-2" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#hotCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-dark rounded-circle p-2" />
          </button>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-center mb-4">Featured Books</h2>
        <div className="position-relative mb-5">
          <button
            className="btn btn-outline-dark position-absolute top-50 start-0 translate-middle-y z-3"
            onClick={scrollLeft}
            style={{ borderRadius: "50%", padding: "10px" }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div
            id="featured-scroll"
            className="d-flex overflow-auto px-5"
            style={{ scrollBehavior: "smooth", gap: "1rem" }}
          >
            {featuredBooks.map((book) => (
              <div className="card" style={{ minWidth: "200px" }} key={book.id}>
                <img
                  src={book.imageUrl || "/default-book-cover.jpg"}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.authors || "Unknown Author"}</p>
                  <p className="card-text text-success fw-bold">₹{book.price || "N/A"}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        if (!isLoggedIn) {
                          setShowModal(true);
                        } else {
                          // addToCart(book.id)
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        if (!isLoggedIn) {
                          setShowModal(true);
                        } else {
                      
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-outline-dark position-absolute top-50 end-0 translate-middle-y z-3"
            onClick={scrollRight}
            style={{ borderRadius: "50%", padding: "10px" }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </section>
      <section>
        <h2 className="text-center mb-4">Browse by Genre</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.name}`}
              className="btn btn-outline-dark m-2 px-4 py-2 rounded-pill"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
