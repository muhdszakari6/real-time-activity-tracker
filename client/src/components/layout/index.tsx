import { Outlet } from "react-router";
import Header from "../ui/header";
import Footer from "../ui/footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
