import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../FormComponents/AuthContext";
import { useCart } from '../Cart/CartContext';
import ProfileButton from "./ProfileButton";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsLogin(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          BookStore
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="btn btn-outline-primary position-relative">
            <FaShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isLogin ? (
            <>
              <ProfileButton />
              <button className="btn btn-outline-danger" onClick={handleLogout}>
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





