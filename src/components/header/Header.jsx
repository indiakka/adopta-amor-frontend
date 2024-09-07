import "./header.css";
import ButtonDona from "../buttons/buttonDona/ButtonDona";
import ButtonAdopta from "../buttons/buttonAdopta/ButtonAdopta";
import React from "react"; 


const Header = () => {
  return (
    <>
      <div className="container-header">
        <div className="buttons-header">
          <ButtonAdopta />
          <ButtonDona />
        </div>
      </div>
    </>
  );
};

export default Header;
