import { NavLink } from "react-router-dom";
import "./botonDona.css"

const BotonDona = () => {
  return (
    
    <NavLink to='/donar'><button className='button-dona' >Dona</button></NavLink>

  )
}

export default BotonDona