
import './footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-primer-bloque">
        <img className="footer-logo" src="src/assets/images/logoblanco.png" alt="Logo" />
        <h3 className="footer-naming-solo-mobile">Adopta amor</h3>
      </div>
      <div className="footer-segundo-bloque">
        <div className="footer-nav-descubrir">
          <h3>Descubrir</h3>
          <p className="efecto-claro">Cómo funciona</p>
          <p className="efecto-claro">
            <NavLink to="/Adoptar">Adopta</NavLink>
          </p>
          <p className="efecto-claro">
            <NavLink to="/Donar">Dona</NavLink>
          </p>
        </div>
        <div className="footer-nav-info">
          <h3>Info</h3>
          <p className="efecto-claro">Sobre nosotros</p>
          <p className="efecto-claro">FAQ</p>
          <p className="efecto-claro">Contactar</p>
        </div>
        <div className="footer-redes-sociales">
          <h3>
            <NavLink>
              <img src="assets/images/instagram.svg" alt="instagram-logo" />
            </NavLink>
            <NavLink>
              <img src="assets/images/facebook.svg" alt="facebook-logo" />
            </NavLink>
            <NavLink>
              <img src="assets/images/twitterx.svg" alt="twitter-logo" />
            </NavLink>
          </h3>
           <p>
            C/ de la Piruleta, 150 <br></br>
            48001 Bilbao<br></br>
            +34022345670
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;