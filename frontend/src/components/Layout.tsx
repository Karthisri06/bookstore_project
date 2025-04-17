import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Make sure to import Outlet

const Layout = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "1rem" }}>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

