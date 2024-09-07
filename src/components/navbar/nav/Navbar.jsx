import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../logo/Logo";
import ShelterLogo from "../shelterLogo/ShelterLogo";
import Shelter from "../../shelter/Shelter";

const Navbar = ({ animalNumber }) => {
  const [openShelter, setOpenShelter] = useState(false);
  const shelterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shelterRef.current && !shelterRef.current.contains(event.target)) {
        setOpenShelter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shelterRef]);

  const toggleCasita = () => {
    setOpenShelter(!openShelter);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="navlink-container">
          <NavLink className="navlink" to="/adoptar" id="active-link">
            Adoptar
          </NavLink>
          <NavLink className="navlink" to="/donar" id="active-link">
            Donar
          </NavLink>
          <NavLink className="navlink" to="/aboutUs" id="active-link">
            Sobre Nosotras
          </NavLink>
          <div className="hamburger">☰</div>
        </div>
        <div className="logo-container">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className="shelter-container" ref={shelterRef}>
          <ShelterLogo onClick={toggleCasita} />
          {animalNumber > 0 && (
            <span className="animal-number">{animalNumber}</span>
          )}
          {openShelter && (
            <div className="shelter-dropdown">
              <Shelter />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
