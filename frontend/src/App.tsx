import React, { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./Cart/Cart";
import Navbar from "./components/Navbar";
import { useAuth } from "./FormComponents/AuthContext";
import AuthModal from "./FormComponents/Authmodal";
import { loginUser, signupUser } from "./FormComponents/authService";
import AdminDash from "./Admin/AdminDash";
import Genre from "./pages/Genre";
import BookDetails from "./pages/BookDetails";
import Layout from "./components/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PrivateRoute from "./components/PrivateRoutes";
import DashboardLayout from "./pages/DashboardLayout";
import AuthorDashboard from "./Author/AuthorDash";
import PurchaseForm from "./Purchase/purchase";
import PurchasePage from './Purchase/PurchasePage';
import ManageUsers from "./Admin/ManagaeUsers";
import ManageBooks from "./Admin/ManageBooks";
import AllOrders from "./Admin/AdminOrders";




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
      console.log("Attempting login...");
      const res = await loginUser(email, password);
      console.log("------------>",res)
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('userName', JSON.stringify(res.user.userName))
      console.log(res, 'res')
      console.log("Login success:", res.data.token); 
  
      if (!res || !res.data) {
        throw new Error("Invalid response from server");
      }
  
      console.log("Login success:", res.data.token);
      localStorage.setItem("token", res.data.token);
  
      login(
        {
          email: res.data.email,
          role: res.data.role,
          name: res.data.name,
          userName: "",
          id: undefined
        },
        res.data.token
      );
  
      closeAuthModal();
  
   
      const { role } = res.data;
      console.log("Logged in user role:", role);
  
      if (role === "admin") {
        console.log("Hi admin")
        toast("Logged in as a admin")
        navigate("/admin");
      } else if (role === "author") {
        console.log("Hi author")
        toast("logged in as a author")
        navigate("/author");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err); 
      toast("Login failed. Please check your credentials.");
    }
  };
  
  const handleSignup = async (email: string, password: string, userName:string) => {
    try {
      const res = await signupUser(email, password,userName);
      console.log("Full response object:",res);
      // console.log("SignUp success:",res.data);
      toast(res.data.message || "Signup successful! Please login.");
      closeAuthModal();
    } catch (err: any) {
      console.error("Signup failed:", err);
      toast(err.response?.data?.message || "Signup failed. Please try again.");
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
    <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />

    <Route path="/admin" element={<PrivateRoute element={<AdminDash/>} isAdmin />} />

    <Route path="/author" element={<PrivateRoute element={<AuthorDashboard />} isAuthor />} />

    <Route path="/genre/:genre" element={<Genre />} />
    <Route path="/book/:id" element={<BookDetails />} />
    <Route path="/dashboard" element={<PrivateRoute element={<DashboardLayout children={undefined}/>}/>}/>


    <Route path="/purchase-page" element={<PurchasePage />} />

   
    <Route path="/admin/users" element={<ManageUsers />} />
    <Route path="/admin/books" element={<ManageBooks />} />
    <Route path="/admin/orders" element={<AllOrders />} />


  </Route>
</Routes>

    </>
    
  );
};

export default App;


















