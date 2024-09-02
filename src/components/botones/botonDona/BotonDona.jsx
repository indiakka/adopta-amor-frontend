import { NavLink } from "react-router-dom";
import "./botonDona.css"

const BotonDona = () => {
  return (
    
    <NavLink to='/donar'><button className='boton-dona' >Dona</button></NavLink>

  )
}

export default BotonDona