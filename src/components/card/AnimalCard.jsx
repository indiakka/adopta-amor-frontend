import React, { useState } from "react";
import "./animalCard.css";
import AnimalInfo from "../animalInfo/AnimalInfo";

const CardAnimal = ({ animal, alEliminar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeInfoState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="card" onClick={changeInfoState}>
        <img src={animal.imagen} alt={animal.nombre} className="card--imagen" />
        <div className="card--components">
          <div>
            <h2 className="card--components--name">{animal.nombre}</h2>
            <p className="card--components--description">
              <strong>Edad:</strong> {animal.edad} <br /> <strong>Raza:</strong>{" "}
              {animal.raza} <br /> <strong>Ubicación:</strong>{" "}
              {animal.ubicacion}
            </p>
          </div>
          <div>
            <img
              src="/assets/images/iconoInfo.png"
              alt="icono información"
              className="card--components--icons"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <AnimalInfo
          alEliminar={alEliminar}
          animal={animal}
          onClick={changeInfoState}
        />
      )}
    </>
  );
};

export default CardAnimal;
