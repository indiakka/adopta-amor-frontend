import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/nav/Navbar";
import Footer from "../components/footer/Footer";
import "./layout.css";

const Layout = () => {
  return (
    <div className="container-principal">
      <div className="container-principal-navbar-main">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
