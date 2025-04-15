import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // state to track authentication status

  // Function to toggle login/logout state
  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          BookStore
        </Link>

        <div className="d-flex mx-auto align-items-center" style={{ gap: "1rem", width: "50%" }}>
          <form className="d-flex flex-grow-1">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search books..."
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <FaSearch />
            </button>
          </form>

          <Link to="/reviews" className="btn btn-outline-dark">
            Reviews
          </Link>
        </div>

        <div className="d-flex align-items-center">
          <Link to="/cart" className="btn btn-outline-primary me-2">
            <FaShoppingCart size={20} />
          </Link>

          {/* Conditional rendering based on authentication status */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="btn btn-outline-secondary me-2">
                <FaUserCircle size={20} />
              </Link>
              <button className="btn btn-outline-danger" onClick={handleAuthToggle}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-outline-primary" onClick={handleAuthToggle}>
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




