import "./footer.css";
import React from "react"; 
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-first-block">
        <img
          className="footer-logo"
          src="assets/images/logoblanco.png"
          alt="Logo"
        />
        <h3 className="footer-naming-only-mobile">Adopta amor</h3>
      </div>
      <div className="footer-second-block">
        <div className="footer-nav-discover">
          <h3>Descubrir</h3>
          <p className="light-effect">Cómo funciona</p>
          <p className="light-effect">
            <NavLink to="/adoptar">Adopta</NavLink>
          </p>
          <p className="light-effect">
            <NavLink to="/donar">Dona</NavLink>
          </p>
        </div>
        <div className="footer-nav-info">
          <h3>Info</h3>
          <NavLink to='/aboutUs' className="light-effect">Sobre nosotros</NavLink>
          <p className="light-effect">FAQ</p>
          <NavLink to='/contacto' className="light-effect">Contactar</NavLink>
        </div>
        <div className="footer-social-media">
          <h3>
            <NavLink>
              <img
                className="light-effect"
                src="/assets/images/instagram.svg"
                alt="instagram-logo"
              />
            </NavLink>
            <NavLink>
              <img
                className="light-effect"
                src="/assets/images/facebook.svg"
                alt="facebook-logo"
              />
            </NavLink>
            <NavLink>
              <img
                className="light-effect"
                src="/assets/images/twitterx.svg"
                alt="twitter-logo"
              />
            </NavLink>
          </h3>
          <p>
            C/ de la Piruleta, 150 <br></br>
            48001 Bilbao <br></br>
            +340112345670
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
