
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout"; // Make sure the path is correct
import Home from "../pages/Home";
import UserProfile from "../pages/Profile";
import AuthDash from "../pages/AuthorDash";
import AdminDash from "../pages/AdminDash";
import Reviews from "../pages/Reviews";
import Genre from "../pages/Genre";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/author" element={<AuthDash />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/reviews" element={<Reviews bookId={""} />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:id" element={<BookDetails />} />
        
      </Route>
    </Routes>
  );
};

export default AppRoutes;
