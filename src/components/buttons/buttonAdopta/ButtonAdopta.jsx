import { NavLink } from "react-router-dom";
import React from "react"; 

import "./buttonAdopta.css";

const ButtonAdopta = () => {
  return (
    <NavLink to="/adoptar">
      <button className="button-adopta">Adopta</button>
    </NavLink>
  );
};

export default ButtonAdopta;
