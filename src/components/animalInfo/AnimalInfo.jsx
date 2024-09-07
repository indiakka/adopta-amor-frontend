import "./animalInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaw } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { eliminarAnimal } from "../../axios";
import React, { useState, useEffect } from "react";

const AnimalInfo = ({
  animal,
  setTodosLosAnimales,
  todosLosAnimales,
  onClick,
  alEliminar,
}) => {
  const [animalesCasita, setAnimalesCasita] = useState([]);
  const [estaAbierta, setEstaAbierta] = useState(true); // Estado para controlar la visibilidad de la card

  const anadirAnimal = (animal) => {
    if (todosLosAnimales.find((elemento) => elemento.id === animal.id)) {
      const animals = todosLosAnimales.map((elemento) =>
        elemento.id === animal.id
          ? { ...elemento, cantidad: elemento.cantidad + 1 }
          : elemento
      );
      setTotal(total);
      setContarAnimales(contarAnimales + animal.cantidad);
      alert("Animal añadido a tu casita");
      return setTodosLosAnimales([...animals]);
    }
  };

  useEffect(() => {
    const animalesAlmacenados = localStorage.getItem("animalesCasita");
    if (animalesAlmacenados) {
      setAnimalesCasita(JSON.parse(animalesAlmacenados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("animalesCasita", JSON.stringify(animalesCasita));
  }, [animalesCasita]);

  const clickEliminarAnimal = async (event) => {
    event.preventDefault();
    await eliminarAnimal(animal.id);
    await alEliminar();
  };

  const manejarCerrar = () => {
    setEstaAbierta(false); // Cambiar el estado para ocultar la card
  };

  // Verificar si la card está abierta
  if (!estaAbierta) {
    return null; // Si está cerrada, no renderizamos nada
  }

  return (
    <div className="container--principal--animalInfo" onClick={onClick}>
      <div className="container--animalInfo">
        <div className="container--imagen--animalInfo">
          <img
            src={animal.imagen}
            alt={animal.nombre}
            className="animalInfo--img"
          />
        </div>
        <div className="container--texto--animalInfo">
          <h2>Información sobre {animal.nombre}</h2>
          <p>
            <strong>Tipo:</strong> {animal.tipo}
          </p>
          <p>
            <strong>Raza:</strong> {animal.raza}
          </p>
          <p>
            <strong>Tamaño:</strong> {animal.tamano}
          </p>
          <p>
            <strong>Cuidados Especiales:</strong> {animal.cuidadosEspeciales}
          </p>
          <p>
            <strong>Ubicación:</strong> {animal.ubicacion}
          </p>
          <p>
            <strong>Edad:</strong> {animal.edad}
          </p>
          <p>
            <strong>Gastos de Gestión:</strong> {animal.gastosDeGestion}
          </p>
          <div className="container--button">
            <button
              onClick={anadirAnimal}
              className="button-adopta btn--conoceme"
            >
              <FontAwesomeIcon icon={faPaw} /> Conóceme
            </button>
          </div>
        </div>
        <div className="container--buttons--edit">
          <div className="container-cerrar-card">
            <FontAwesomeIcon
              icon={faTimes}
              className="cerrar-card"
              onClick={manejarCerrar}
            />
          </div>
          <NavLink to={`/editInfo/${animal.id}`}>
            <button onClick={manejarCerrar} className="buttons--edit">
              <img src="..//assets/images/Edit.png" alt="edit" />
            </button>
          </NavLink>
          <button onClick={clickEliminarAnimal} className="buttons--edit">
            <img src="..//assets/images/Delete.png" alt="borrar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;
