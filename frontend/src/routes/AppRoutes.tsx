
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserProfile from "../pages/Profile";
import AuthDash from "../pages/AuthorDash";
import AdminDash from "../pages/AdminDash";
import Reviews from "../pages/Reviews";

const AppRoutes = () => {
  return (
    <Routes>
     <Route element={<Layout children={undefined}/>}></Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/author" element={<AuthDash />} />
      <Route path="/admin" element={<AdminDash />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  );
};

export default AppRoutes;
