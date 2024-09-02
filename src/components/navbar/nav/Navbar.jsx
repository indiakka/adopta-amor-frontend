import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../logo/Logo";

const Navbar = () => {

  return (

    <nav className="navbar-container">
      <div className="navbar">
        <div className="navlink-container">
          <NavLink className='navlink' to='/sobreNosotras' id='active-link'>Sobre Nosotras</NavLink>
          <NavLink className='navlink' to='/adoptar' id='active-link'>Adoptar</NavLink>
          <NavLink className='navlink' to='/donar' id='active-link'>Donar</NavLink>
          <div className="hamburger">☰</div>
        </div>
        <div className="logo-container">
          <NavLink to='/'><Logo /></NavLink>
        </div>
        <NavLink to='/casita'>
          <div className="casita-container">
            <img className="casita" alt="casita" src="src\assets\images\casitaIcon.png" />
          </div>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar