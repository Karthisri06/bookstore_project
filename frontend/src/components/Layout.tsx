import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Navbar />
      <main className="flex-grow-1" style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


