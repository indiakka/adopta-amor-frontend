import React, { useState } from 'react';
import './tarjetaAnimal.css';
import AnimalInfo from '../animalInfo/AnimalInfo';

const TarjetaAnimal = ({ animal, alEliminar }) => {
  const [estaAbierto, setEstaAbierto] = useState(false);

  const cambiarEstadoInfo = () => {
    setEstaAbierto(!estaAbierto);
  };

  return (
    <>
      <div className="tarjeta" onClick={cambiarEstadoInfo}>
        <img src={animal.imagen} alt={animal.nombre} className="tarjeta--imagen" />
        <div className="tarjeta--componentes">
          <div>
            <h2 className="tarjeta--componentes--nombre">{animal.nombre}</h2>
            <p className="tarjeta--componentes--descripcion">
              <strong>Edad:</strong> {animal.edad} <br /> <strong>Raza:</strong> {animal.raza} <br />{' '}
              <strong>Ubicación:</strong> {animal.ubicacion}
            </p>
          </div>
          <div>
            <img src="/assets/images/iconoInfo.png" alt="iconoInformacion" className="tarjeta--componentes--icono" />
          </div>
        </div>
      </div>
      {estaAbierto && <AnimalInfo alEliminar={alEliminar} animal={animal} onClick={cambiarEstadoInfo} />}{' '}
      {/* Renderizar AnimalInfo solo si estáAbierto es true */}
    </>
  );
};

export default TarjetaAnimal;
