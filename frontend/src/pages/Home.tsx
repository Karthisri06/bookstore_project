import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../FormComponents/AuthContext"; 
import { Book, CartItem } from "../types";
import { loginUser, signupUser } from "../FormComponents/authService";
import AuthModal from "../FormComponents/Authmodal";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useCart } from "../Cart/CartContext"; 
import { ToastContainer } from "react-toastify"; 
import { PurchaseItem } from "../types";
const Home = () => {
  const { isAuthenticated, setIsLoggedIn, openAuthModal, closeAuthModal, showModal } = useAuth();  
  const { addToCart } = useCart();  // Use CartContext to manage cart
  const [hotBooks, setHotBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [maybeLater, setMaybeLater] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const { cartItems } = useCart();



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    const username = localStorage.getItem('userName')
    if(username){
    setUserName(username)
    }
    
    const maybeLaterFlag = localStorage.getItem("maybeLater");
    if (maybeLaterFlag === "true") {
      setMaybeLater(true);
    }
  }, [setIsLoggedIn]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem('user', JSON.stringify(response))
      localStorage.setItem('userName', JSON.stringify(response.user.userName))
      localStorage.removeItem("maybeLater");
      console.log(JSON.stringify(response.user.userName), 'resname')
      setIsLoggedIn(true);
      setMaybeLater(false);
      closeAuthModal();
      if (response.user.role === "admin") {
        console.log("hi admin")
        toast("logged in as a admin")
        navigate("/admin");
      } else if (response.user.role === "author") {
        navigate("/author");
      } else {
        navigate("/");
      }
  
      window.location.reload();
      console.log("Login successful test");
      toast("Login succes!");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  
  const handleSignup = async (email: string, password: string,userName:string) => {
    try {
      const response = await signupUser(email, password, userName);
      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("maybeLater");
      setIsLoggedIn(true);
      setMaybeLater(false);
      closeAuthModal();
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup failed:", error);
      toast("Signup failed. Please try again.");
    }
  };

 
  const handleMaybeLater = () => {
    localStorage.setItem("maybeLater", "true");
    setMaybeLater(true);
    closeAuthModal();
  };

  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get<Book[]>("http://localhost:5000/books");
        const allBooks = res.data;
        setAllBooks(allBooks);

    
        const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
        setHotBooks(shuffled.slice(0, 5));
        console.log('asdfghjkpoiuytr',allBooks.slice(0, 15))
        setFeaturedBooks(allBooks.slice(0, 15));

    
        const seen = new Set<string>();
        const uniqueGenres: string[] = [];
        allBooks.forEach((book) => {
          if (book.genre && !seen.has(book.genre)) {
            seen.add(book.genre);
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


  const filterByGenre = (genre: string) => {
    const filteredBooks = allBooks.filter((book) => book.genre === genre);
    setFeaturedBooks(filteredBooks);
    navigate(`/genre/${genre}`);
  };

  const handleAddToCart = (book: Book) => {
    if (!isAuthenticated && !maybeLater) {
      openAuthModal();
    } 
      const cartItem = {
        id:book.id,
        description: book.description,
        bookName: book.title,
        price: book.price,
        imageUrl:book.imageUrl,
        userName:  userName,
      };
      addToCart(cartItem); 
  };
  
// console.log(featuredBooks);




  const handlePurchase = (bookId: number) => {
    if (!isAuthenticated && !maybeLater) {
      openAuthModal();
    } else {
      navigate('/purchase-page', { state: { bookId } });
    }
  };
  return (
    <div className="container mt-5 pt-4" style={{ maxWidth: "1400px" }}>
      <AuthModal
        show={showModal}
        handleClose={closeAuthModal}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        onMaybeLater={handleMaybeLater} 
      />

      {/* Hot Selling Section */}
      <section className="mb-5">
        <h2 className="mb-4 text-center">Hot Selling Books</h2>
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
                  <p>{book.author || "Unknown Author"}</p>
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

      {/* Featured Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Featured Books</h2>
        <div className="position-relative mb-5 px-4">
          <div
            id="featured-scroll"
            className="d-flex overflow-auto px-3 py-2"
            style={{
              scrollBehavior: "smooth",
              gap: "1.5rem",
            }}
          >
            {featuredBooks.map((book) => (
              <div
                className="card shadow-sm border-0"
                style={{
                  minWidth: "220px",
                  maxWidth: "220px",
                  transition: "transform 0.2s",
                }}
                key={book.id}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img
                  src={book.imageUrl || "/default-book-cover.jpg"}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "220px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                />
                <div className="card-body d-flex flex-column justify-content-between" style={{ height: "220px" }}>
                  <div>
                    <h5 className="card-title text-truncate">{book.title}</h5>
                    <p className="card-text text-muted small">{book.author || "Unknown Author"}</p>
                    <p className="card-text text-success fw-bold">₹{book.price || "N/A"}</p>
                  </div>
                  <div className="mt-auto d-flex flex-column gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleAddToCart(book)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlePurchase(book.id)}
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
        </div>
      </section>

      {/* Genre Buttons */}
      <section>
        <h2 className="text-center mb-4">Browse by Genre</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {genres.map((genre) => (
            <button
              key={genre}
              className="btn btn-outline-dark m-2 px-4 py-2 rounded-pill"
              onClick={() => filterByGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;







