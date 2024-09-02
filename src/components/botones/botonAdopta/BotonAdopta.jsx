import { NavLink } from 'react-router-dom';
import './botonAdopta.css';

const BotonAdopta = () => {
  return (
    <NavLink to="/adoptar">
      <button className="boton-adopta">Adopta</button>
    </NavLink>
  );
};

export default BotonAdopta;
