import './casita.css';
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";


const Casita = () => {

  const [casita, setCasita] = useState([]);

  useEffect(() => {
    const dataCasita = JSON.parse(localStorage.getItem('animalesCasita')) || [];
    setCasita(dataCasita);
  }, []);

  const eliminarAnimal = (animalId) => {
    const animalesAlmacenados = JSON.parse(localStorage.getItem('animalesCasita')) || [];
    const nuevosAnimales = animalesAlmacenados.filter(animal => animal.id !== animalId);
    localStorage.setItem('animalesCasita', JSON.stringify(nuevosAnimales));
    const dataCasita = JSON.parse(localStorage.getItem('animalesCasita')) || [];
    setCasita(dataCasita);
  };


  return (
    <div className='contenedor-casita-card'>
      {casita.map((a) => (
        <div key={a.id} className='casita-card'>
          <div className='contenedor-x-card'>
            <img src='src/assets/images/x_card.svg' onClick={e => eliminarAnimal(a.id)} className='x-card' alt='descartar-animal' />
          </div>
            <img className='casita-imagen'
              src={a.imagen}
              alt={a.nombre}
            />
          <div className='casita-texto'>
            <h4>{a.nombre}</h4>
            <h5>{a.años},{a.ubicacion}</h5>
          </div>
        </div>
      ))}
      <NavLink to='/contacto'><button type='submit' className='casita-boton'>Reservar cita</button></NavLink>
    </div>
  )
}

export default Casita