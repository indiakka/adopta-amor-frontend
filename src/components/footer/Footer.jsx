import './footer.css';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>

      <div className='footer-primer-bloque'>
          <img className="footer-logo" src="src/assets/images/logoblanco.png" alt="Logo" />
          <h3 className='footer-naming-solo-mobile'>Adopta amor</h3>
          <p>C/ de la Diputació, 150 <br></br>
          L'Eixample, 08007 Barcelona <br></br>
          +34611234567</p>
      </div>

      <div className='footer-segundo-bloque'>

        <div className='footer-nav-descubrir'>
          <h3>Descubrir</h3>
          <ul>
            <li>Cómo funciona</li>
            <li><NavLink to='/Adoptar'>Adopta</NavLink></li>
            <li><NavLink to='/Donar'>Dona</NavLink></li>
          </ul>
        </div>

        <div className='footer-nav-info'>
          <h3>Info</h3>
          <ul>
            <li>Sobre nosotros</li>
            <li>FAQ</li>
            <li>Contactar</li>
          </ul>
        </div>

        <div className='footer-redes-sociales'>
          <img src="src/assets/images/instagram.svg" alt="instagram-logo" />
          <img src="src/assets/images/facebook.svg" alt="facebook-logo" />
          <img src="src/assets/images/twitterx.svg" alt="twitter-logo" />
        </div>

      </div>

    </footer>
  )
}

export default Footer