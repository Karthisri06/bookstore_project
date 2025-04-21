import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { useCart } from '../services/CartContext';


const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:5000/books/search?q=${searchTerm}`
        );
        const results = response.data; 

      
        navigate("/search-results", { state: { results } });
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          BookStore
        </Link>

      
        <div className="d-flex align-items-center">
          <Link to="/cart" className="btn btn-outline-primary me-2">
            <FaShoppingCart size={20} />
          </Link>

          {isAuthenticated ? (
            <>
           
              <button className="btn btn-outline-danger" onClick={() => {
    logout();
    navigate("/");
    window.location.reload();
  }}>Logout</button>
            </>
          ) : (
            <button className="btn btn-outline-primary" onClick={openAuthModal}>Login / Sign Up</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



