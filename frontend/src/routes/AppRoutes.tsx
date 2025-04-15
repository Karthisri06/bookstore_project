
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout"; // Make sure the path is correct
import Home from "../pages/Home";
import AuthModal from "../pages/Authmodal";
import UserProfile from "../pages/Profile";
import AuthDash from "../pages/AuthorDash";
import AdminDash from "../pages/AdminDash";
import Reviews from "../pages/Reviews";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/authmodal" element={<AuthModal show={false} handleClose={function (): void {
          throw new Error("Function not implemented.");
        } } handleLogin={function (): void {
          throw new Error("Function not implemented.");
        } } handleSignup={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/author" element={<AuthDash />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

