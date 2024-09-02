import './animalInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { eliminarAnimal } from '../../axios';
import React, { useState, useEffect } from 'react';

const AnimalInfo = ({ animal, setTodosLosAnimales, todosLosAnimales, onClick, alEliminar }) => {
  const [animalesCasita, setAnimalesCasita] = useState([]);
  const [estaAbierta, setEstaAbierta] = useState(true); // Estado para controlar la visibilidad de la tarjeta

  const anadirAnimal = (animal) => {
    if (todosLosAnimales.find((elemento) => elemento.id === animal.id)) {
      const animales = todosLosAnimales.map((elemento) =>
        elemento.id ? { ...elemento, cantidad: elemento.cantidad + 1 } : elemento,
      );
      setTotal(total);
      setContarAnimales(contarAnimales + animal.cantidad);
      alert('Animal añadido a tu casita');
      return setTodosLosAnimales([...animales]);
    }
  };

  useEffect(() => {
    const animalesAlmacenados = localStorage.getItem('animalesCasita');
    if (animalesAlmacenados) {
      setAnimalesCasita(JSON.parse(animalesAlmacenados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('animalesCasita', JSON.stringify(animalesCasita));
  }, [animalesCasita]);

  const clickEliminarAnimal = async (event) => {
    event.preventDefault();
    await eliminarAnimal(animal.id);
    await alEliminar();
  };

  const manejarCerrar = () => {
    setEstaAbierta(false); // Cambiar el estado para ocultar la tarjeta
  };

  // Verificar si la tarjeta está abierta
  if (!estaAbierta) {
    return null; // Si está cerrada, no renderizamos nada
  }

  return (
    <div className="contenedor--principal--animalInfo" onClick={onClick}>
      <div className="contenedor--animalInfo">
        <div className="contenedor--imagen--animalInfo">
          <img src={animal.imagen} alt={animal.nombre} className="animalInfo--img" />
        </div>
        <div className="contenedor--texto--animalInfo">
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
          <div className="contenedor--boton">
            <button onClick={anadirAnimal} className="boton-adopta btn--conoceme">
              <FontAwesomeIcon icon={faPaw} /> Conóceme
            </button>
          </div>
        </div>
        <div className="contenedor--botones--editar">
          <div className="contenedor-cerrar-tarjeta">
            <FontAwesomeIcon icon={faTimes} className="cerrar-tarjeta" onClick={manejarCerrar} />
          </div>
          <NavLink to={`/editarInfo/${animal.id}`}>
            <button onClick={manejarCerrar} className="botones--editar">
              <img src="../src/assets/images/Edit.png" alt="editar" />
            </button>
          </NavLink>
          <button onClick={clickEliminarAnimal} className="botones--editar">
            <img src="../src/assets/images/Delete.png" alt="borrar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;
