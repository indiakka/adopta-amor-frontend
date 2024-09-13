import React, { useState, useEffect } from "react";
import "./shelter.css";
import { Link } from "react-router-dom";

const Shelter = ({ visible }) => {
  const [todosLosAnimales, setTodosLosAnimales] = useState([]);

  useEffect(() => {
    const animalesCasita =
      JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setTodosLosAnimales(animalesCasita);
  }, []);

  const eliminarAnimalCasita = (animalId) => {
    const resultados = todosLosAnimales.filter(
      (elemento) => elemento.id !== animalId
    );
    setTodosLosAnimales(resultados);
    localStorage.setItem( "animalesCasita", JSON.stringify( resultados ) );
    window.location.reload()

  };

  const alVaciarCasita = () => {
    setTodosLosAnimales([]);
    localStorage.setItem( "animalesCasita", JSON.stringify( [] ) );
    
  };
  if (!visible) return null; 

  return (
    <div className="container-shelter-card">
      <div className="listado-animales">
        {todosLosAnimales.length ? (
          <>
            <div className="animal-list">
              {todosLosAnimales.map((animal) => (
                <div key={animal.id} className="shelter-card">
                  <div className="container-x-card">
                    <img
                      src="/assets/images/x-card.svg"
                      onClick={() => eliminarAnimalCasita(animal.id)}
                      className="x-card"
                      alt="descartar-animal"
                    />
                  </div>
                  <img
                    className="shelter-image"
                    src={animal.imagen}
                    alt={animal.nombre}
                  />
                  <div className="shelter-text">
                    <h4>{animal.nombre}</h4>
                    <h5>
                      {animal.edad} {animal.ubicacion}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contacto" className="shelter-button">
              <button type="submit" className="shelter-button">
                Reservar cita
              </button>
            </Link>
          </>
        ) : (
          <p>La casita está vacía</p>
        )}
      </div>
    </div>
  );
};

export default Shelter;
