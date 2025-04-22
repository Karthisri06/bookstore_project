import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthModal from "../FormComponents/Authmodal";
import { useAuth } from "../FormComponents/AuthContext";
import { useCart } from "../Cart/CartContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";



interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  price: number;
  imageUrl: string;
  genre: string;
  publishedDate: string;
  pageCount: number;
  rating: number;
  bookId:number;
}

interface CartItem {
  book: Book;
  quantity: number;
}

const Genre = () => {
  const { genre } = useParams<{ genre: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, setUser } = useAuth(); 
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (genre) {
      axios
        .get(`http://localhost:5000/books/genre/${genre}`)
        .then((res) => {
          setBooks(res.data);
          setError("");
        })
        .catch((err) => {
          setError("No books found in this genre.");
          console.error("Fetch error:", err);
        });
    }
  }, [genre]);

  const handleSignup = async (email: string, password: string,userName:string) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
        userName
      });
      toast("Signup successful");
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Signup failed. Try a different email.");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const data = res.data;

      if (!data || !data.token || !data.user) {
        throw new Error("Invalid login response");
      }
  console.log('data', data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem('userName', JSON.stringify(data.user.userName))
      setUser(data.user); 
      setShowAuthModal(false);
      toast("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };


  const handleAddToCart=() =>{
    if(!user){
      toast.info("login to add to cart");
      return
    }

    if(book){
      addToCart(book);
      toast.success(`${book.title} has been added to your cart!`);
      
    }
  }
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">
        {genre ? `Books in "${genre}"` : "Loading genre..."}
      </h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="card shadow-sm"
            style={{ width: "200px", minHeight: "100%", borderRadius: "10px" }}
          >
            <img
              src={book.imageUrl || "https://via.placeholder.com/150"}
              alt={book.title}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
            />
            <div className="card-body d-flex flex-column">
              <h6 className="fw-bold mb-1">{book.title}</h6>
              <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                {book.authors || "Unknown Author"}
              </p>
              <p className="mb-1 text-success fw-bold">₹{book.price.toFixed(2)}</p>
              <div className="text-warning mb-3" style={{ fontSize: "0.9rem" }}>
                {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
              </div>

              <div className="d-flex flex-column gap-2 mt-auto">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowAuthModal(true);
                    } else {
                      addToCart({
                        book, quantity: 1,
                        id: 0,
                        title: "",
                        price: 0
                      });
                      toast(`Added ${book.title} to cart`);
                    }
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowAuthModal(true);
                    } else {
                      toast(`Bought ${book.title}`);
                      // Later: redirect to order/payment page here
                    }
                  }}
                >
                  Buy Now
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!error && books.length === 0 && (
        <p className="mt-4 text-muted text-center">No books to display yet.</p>
      )}

      <AuthModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        onMaybeLater={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Genre;
