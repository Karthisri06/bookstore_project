import React, { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useAuth } from "./services/AuthContext";
import AuthModal from "./pages/Authmodal";
import { loginUser, signupUser } from "./services/authService";
import AdminDash from "./pages/AdminDash";
import AuthDash from "./pages/AuthorDash";
import Genre from "./pages/Genre";
import BookDetails from "./pages/BookDetails";
import Layout from "./components/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




const App: React.FC = () => {
  const {
    showModal,
    closeAuthModal,
    login,
    setIsLoggedIn,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("hi")
      const res = await loginUser(email, password);
      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.token);
      login(
        { email: res.data.email, role: res.data.role },
        res.data.token 
      );
      
      closeAuthModal();

      const { role } = res.data.user;
      console.log("Logged in user role:", role);


      if (role === "admin") {
        navigate("/admin");
      } else if (role === "author") {
        navigate("/author");
      } else {
        navigate("/");
      }

      window.location.reload();

    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Try again.");
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const res = await signupUser(email, password);
      localStorage.setItem("token", res.data.token);
      login(
        { email: res.data.email, role: res.data.role },
        res.data.token // make sure your backend sends a token
      );
      
      closeAuthModal();
    } catch (err) {
      alert("Signup failed. Try again.");
    }
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
  <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={ <Profile />} />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/author" element={ <AuthDash />} />
          <Route path="/genre/:genre" element={<Genre/>} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;









