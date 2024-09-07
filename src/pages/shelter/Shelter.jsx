import "./shelter.css";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Shelter = () => {
  const [shelter, setCasita] = useState([]);

  useEffect(() => {
    const dataCasita = JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setCasita(dataCasita);
  }, []);

  const eliminarAnimal = (animalId) => {
    const animalesAlmacenados =
      JSON.parse(localStorage.getItem("animalesCasita")) || [];
    const nuevosAnimales = animalesAlmacenados.filter(
      (animal) => animal.id !== animalId
    );
    localStorage.setItem("animalesCasita", JSON.stringify(nuevosAnimales));
    const dataCasita = JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setCasita(dataCasita);
  };

  return (
    <div className="container-shelter-card">
      {shelter.map((a) => (
        <div key={a.id} className="shelter-card">
          <div className="container-x-card">
            <img
              src="assets/images/x_card.svg"
              onClick={(e) => eliminarAnimal(a.id)}
              className="x-card"
              alt="descartar-animal"
            />
          </div>
          <img className="shelter-imagen" src={a.imagen} alt={a.nombre} />
          <div className="shelter-texto">
            <h4>{a.nombre}</h4>
            <h5>
              {a.años},{a.ubicacion}
            </h5>
          </div>
        </div>
      ))}
      <NavLink to="/contact">
        <button type="submit" className="shelter-button">
          Reservar cita
        </button>
      </NavLink>
    </div>
  );
};

export default Shelter;
