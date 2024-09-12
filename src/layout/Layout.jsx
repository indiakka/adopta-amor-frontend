import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/nav/Navbar";
import Footer from "../components/footer/Footer";
import "./layout.css";

const Layout = () => {
  const [animalNumber, setAnimalNumber] = useState(0);

  useEffect(() => {
    const animalesCasita =
      JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setAnimalNumber(animalesCasita.length);
  }, []);

  return (
    <div className="container-principal">
      <div className="container-principal-navbar-main">
        <Navbar/>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
