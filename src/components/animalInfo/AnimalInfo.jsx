import "./animalInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaw } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { eliminarAnimal } from "../../axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AnimalInfo = ({ animal, setTodosLosAnimales, onClick, alEliminar }) => {
  const [animalesCasita, setAnimalesCasita] = useState([]);
  const [estaAbierta, setEstaAbierta] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [mostrarNotificacion, setMostrarNotificacion] = useState({
    isOpen: false,
    title: "",
    text: "",
    icon: "",
  });

  useEffect(() => {
    if (mostrarNotificacion.isOpen) {
      console.log("🚀 Mostrando alerta...");
    }
  }, [mostrarNotificacion]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const animalesAlmacenados =
      JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setAnimalesCasita(animalesAlmacenados);
  }, []);

  const guardarEnLocalStorage = (animales) => {
    localStorage.setItem("animalesCasita", JSON.stringify(animales));
    setAnimalesCasita(animales);
    setTodosLosAnimales(animales); 
  };

const anadirAnimal = () => {

  const existe = animalesCasita.some((elemento) => elemento.id === animal.id);

  if (existe) {
    Swal.fire({
      title: "Error",
      text: "Este animal ya está en tu casita",
      icon: "error",
    });
    return;
  }

  const nuevoAnimal = {
    id: animal.id,
    nombre: animal.nombre,
    imagen: animal.imagen,
    cantidad: 1,
  };

  const animalesActualizados = [...animalesCasita, nuevoAnimal];

  localStorage.setItem("animalesCasita", JSON.stringify(animalesActualizados));

  setAnimalesCasita(animalesActualizados);
  setTodosLosAnimales(animalesActualizados);

  window.dispatchEvent(new Event("storage"));


  Swal.fire({
    title: "Éxito",
    text: "Animal añadido a tu casita",
    icon: "success",
    confirmButtonColor: "rgb(131, 62, 172)",
  });
};

const clickEliminarAnimal = async (event) => {
  event.preventDefault();
  await eliminarAnimal(animal.id);

  const animalesActualizados = animalesCasita.filter((a) => a.id !== animal.id);
  localStorage.setItem("animalesCasita", JSON.stringify(animalesActualizados));
  setAnimalesCasita(animalesActualizados);
  setTodosLosAnimales(animalesActualizados);

  window.dispatchEvent(new Event("storage"));
};


  const manejarCerrar = () => {
    setEstaAbierta(false);
  };

  if (!estaAbierta) {
    return null;
  }

  return (
    <div className="container--first--animalInfo" onClick={onClick}>
      <div className="container--animalInfo">
        <div className="container--image--animalInfo">
          <img
            src={animal.imagen}
            alt={animal.nombre}
            className="animalInfo--img"
          />
        </div>
        <div className="container--text--animalInfo">
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
              className="button-adopta button--conoceme"
            >
              <FontAwesomeIcon icon={faPaw} /> Conóceme
            </button>
          </div>
        </div>

        <div className="container--buttons--edit">
          <div className="container-close-card">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-card"
              onClick={manejarCerrar}
            />
          </div>
          {isAdmin && (
            <>
              <NavLink to={`/editInfo/${animal.id}`}>
                <button onClick={manejarCerrar} className="buttons--edit">
                  <img src="./assets/images/Edit.png" alt="editar" />
                </button>
              </NavLink>
              <button onClick={clickEliminarAnimal} className="buttons--edit">
                <img src="./assets/images/Delete.png" alt="borrar" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;
