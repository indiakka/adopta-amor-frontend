import { NavLink } from "react-router-dom";
import React from "react"; 

import "./buttonDona.css";

const ButtonDona = () => {
  return (
    <NavLink to="/donar">
      <button className="button-dona">Dona</button>
    </NavLink>
  );
};

export default ButtonDona;
