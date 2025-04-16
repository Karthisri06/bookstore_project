import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useAuth } from "./services/AuthContext";
import AuthModal from "./pages/Authmodal";
import { loginUser, signupUser } from "./services/authService";
import AdminDash from "./pages/AdminDash";
import AuthDash from "./pages/AuthorDash";
import Reviews from "./pages/Reviews";
import Genre from "./pages/Genre";
import BookDetails from "./pages/BookDetails";
import Layout from "./components/Layout";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const {
    isAuthenticated,
    showModal,
    closeAuthModal,
    openAuthModal,
    login,
    setIsLoggedIn,
  } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      closeAuthModal();
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const res = await signupUser(email, password);
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      closeAuthModal();
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  const handleLoginClick = () => {
    openAuthModal();
  };

  return (
    <>
      <Navbar />

      <AuthModal
        show={showModal}
        handleClose={closeAuthModal}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        onMaybeLater={closeAuthModal}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Home />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Home />} />
          <Route path="/admin" element={isAuthenticated ? <AdminDash /> : <Home />} />
          <Route path="/author" element={isAuthenticated ? <AuthDash /> : <Home />} />
          <Route path="/reviews" element={<Reviews bookId={""} />} />
          <Route path="/genre/:genre" element={<Genre />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;









