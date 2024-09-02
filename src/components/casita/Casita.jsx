import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './casita.css';

const Casita = ({ todosLosAnimales, setTodosLosAnimales }) => {
  const [activo, setActivo] = useState(false);

  const eliminarAnimalCasita = (animal) => {
    const resultados = todosLosAnimales.filter((elemento) => elemento.id !== animal.id);
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
      if (!document.getElementById('contenedor-casita').contains(event.target)) {
        // Cerrar la casita si el clic no ocurrió dentro de la casita
        setCasitaAbierta(false);
      }
    };

    document.addEventListener('click', cerrarCasita);

    return () => {
      document.removeEventListener('click', cerrarCasita);
    };
  }, []);

  return (
    <div id="contenedor-casita" className="contenedor-casita-tarjeta">
      <div className={`contenedor-animales-casita ${activo ? '' : 'casita-oculta'}`}>
        {todosLosAnimales.length ? (
          <>
            <div className="listado-animales">
              {todosLosAnimales.map((animal) => (
                <div key={animal.id} className="casita-tarjeta">
                  <div className="contenedor-x-tarjeta">
                    <img
                      src="/assets/images/x_tarjeta.svg"
                      onClick={(event) => eliminarAnimalCasita(animal.id)}
                      className="x-tarjeta"
                      alt="descartar-animal"
                    />
                  </div>
                  <img className="casita-imagen" src={animal.imagen} alt={animal.nombre} />
                  <div className="casita-texto">
                    <h4>{animal.nombre}</h4>
                    <h5>
                      {animal.edad},{animal.ubicacion}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
            <button className="boton-borrar-todo" onClick={alVaciarCasita}>
              Vaciar Carrito
            </button>
          </>
        ) : (
          <p>La casita está vacía</p>
        )}
      </div>
      <NavLink to="/contacto">
        <button type="submit" className="casita-boton">
          Reservar cita
        </button>
      </NavLink>
    </div>
  );
};

export default Casita;
