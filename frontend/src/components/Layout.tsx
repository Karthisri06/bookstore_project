import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Make sure to import Outlet

const Layout = () => {
  return (
    <div>
      <Header />
      <Navbar />
      {/* Main content is rendered where the nested route will be injected */}
      <main style={{ minHeight: "70vh", padding: "1rem" }}>
        <Outlet /> {/* Child components will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

