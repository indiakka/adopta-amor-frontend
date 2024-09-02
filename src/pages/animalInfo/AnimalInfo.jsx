import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import "./animalInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

const AnimalInfo = () => {
  const [animal, setAnimal] = useState([]);
  const { id } = useParams();
  const [animalesCasita, setAnimalesCasita] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const animalInfo = async () => {
      const response = await axios.get(`http://localhost:3000/results/${id}`);
      setAnimal(response.data);
    };
    animalInfo();
  }, [id]);

  const anadirAnimal = () => {
    const listadoAnimales = [...animalesCasita, { ...animal, id: animal.id }];
    setAnimalesCasita(listadoAnimales);
    alert("Animal añadido a tu casita")
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

  const handleSubmit = async ( id ) =>
  {
    const conf = window.confirm( '¿Quieres realmente borrar este animal?' )
    if ( conf )
    {
      await axios.delete( `http://localhost:3000/results/${id}` )
      alert( 'Este animal ha sido borrado correctamente' )
      navigate( '/adoptar' )
    }
  }


  return (
    <div className="animalInfocontainer">
      <div className="animalInfoImg--container">
        <img
          src={animal.imagen}
          alt={animal.nombre}
          className="animalInfo--img"
        />
      </div>
      <div className="animalInfoTxt--container">
        <h2>Información sobre {animal.nombre}</h2>
        <p>Tipo: {animal.tipo}</p>
        <p>Raza: {animal.raza}</p>
        <p>Tamaño: {animal.tamaño}</p>
        <p>Cuidados Especiales: {animal.cuidadosEspeciales}</p>
        <p>Ubicación: {animal.ubicacion}</p>
        <p>Años: {animal.años}</p>
        <p>Gastos de Gestión: {animal.gastosDeGestion}</p>
        <div className="container--button">
          <div className="container--button">
            <button onClick={anadirAnimal} className="button-adopta btn--conoceme">
              <FontAwesomeIcon icon={faPaw} />Conóceme</button>
          </div>
        </div>
      </div>
      <div className="contenedor--botones--editar">
        <NavLink to={`/editarInfo/${animal.id}`}>
          <button className="botones--editar">
            <img src="../src/assets/images/Edit.png" alt="editar" /></button>
        </NavLink>
        <button onClick={e => handleSubmit( animal.id )} className="botones--editar">
          <img src="../src/assets/images/Delete.png" alt="borrar" /></button>
      </div>
    </div>
  );
};

export default AnimalInfo
