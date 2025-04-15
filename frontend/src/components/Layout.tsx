import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "1rem" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
