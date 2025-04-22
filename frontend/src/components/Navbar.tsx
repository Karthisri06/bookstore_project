import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../FormComponents/AuthContext";
import { useCart } from '../Cart/CartContext';

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  

    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          BookStore
        </Link>

        <div className="d-flex align-items-center">
          <Link to="/cart" className="btn btn-outline-primary me-2">
            <FaShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="badge bg-danger ms-1"></span>
            )}
          </Link>

          {isLogin ? (
            <>
              {user && (
                <Link
                  to="/profile"
                  className="btn btn-outline-secondary me-2 d-flex align-items-center"
                >
                  <FaUserCircle className="me-1" />
                  {user?.name || user?.email}
                </Link>
              )}

              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  logout();
                  navigate("/");
                  setIsLogin(false);
                  setUser(null);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-outline-primary" onClick={openAuthModal}>
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




