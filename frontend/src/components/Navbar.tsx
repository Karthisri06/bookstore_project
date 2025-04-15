import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">BookStore</Link>

        {/* Center: Search Bar + Reviews */}
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

          {/* Reviews Link in center */}
          <Link to="/reviews" className="btn btn-outline-dark">
            Reviews
          </Link>
        </div>

        {/* Right side: Cart and Profile */}
        <div className="d-flex align-items-center">
          <Link to="/cart" className="btn btn-outline-primary me-2">
            <FaShoppingCart size={20} />
          </Link>
          <Link to="/profile" className="btn btn-outline-secondary">
            <FaUserCircle size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



