import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./shelter.css";

const Shelter = ({ todosLosAnimales, setTodosLosAnimales }) => {
  const [activo, setActivo] = useState(false);

  const eliminarAnimalCasita = (animal) => {
    const resultados = todosLosAnimales.filter(
      (elemento) => elemento.id !== animal.id
    );
    setTotal(total + animal.cantidad);
    setContarAnimales(contarAnimales - animal.cantidad);
    setTodosLosAnimales(resultados);
  };

  const alVaciarCasita = () => {
    setTodosLosAnimales([]);
    setTotal(0);
    setContarAnimales(0);
  };

  useEffect(() => {
    const cerrarCasita = (event) => {
      if (
        !document.getElementById("container-shelter").contains(event.target)
      ) {
        // Cerrar la shelter si el clic no ocurrió dentro de la shelter
        setCasitaAbierta(false);
      }
    };

    document.addEventListener("click", cerrarCasita);

    return () => {
      document.removeEventListener("click", cerrarCasita);
    };
  }, []);

  return (
    <div id="container-shelter" className="container-shelter-card">
      <div
        className={`container-animals-shelter ${
          activo ? "" : "shelter-oculta"
        }`}
      >
        {todosLosAnimales.length ? (
          <>
            <div className="listado-animals">
              {todosLosAnimales.map((animal) => (
                <div key={animal.id} className="shelter-card">
                  <div className="container-x-card">
                    <img
                      src="/assets/images/x_card.svg"
                      onClick={(event) => eliminarAnimalCasita(animal.id)}
                      className="x-card"
                      alt="descartar-animal"
                    />
                  </div>
                  <img
                    className="shelter-imagen"
                    src={animal.imagen}
                    alt={animal.nombre}
                  />
                  <div className="shelter-texto">
                    <h4>{animal.nombre}</h4>
                    <h5>
                      {animal.edad},{animal.ubicacion}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
            <button className="button-borrar-todo" onClick={alVaciarCasita}>
              Vaciar Carrito
            </button>
          </>
        ) : (
          <p>La shelter está vacía</p>
        )}
      </div>
      <NavLink to="/contact">
        <button type="submit" className="shelter-button">
          Reservar cita
        </button>
      </NavLink>
    </div>
  );
};

export default Shelter;
