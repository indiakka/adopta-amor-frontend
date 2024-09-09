import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./animalInfo.css";

const AnimalInfo = () => {
  const [animal, setAnimal] = useState({});
  const { id } = useParams();
  const [animalesCasita, setAnimalesCasita] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const animalInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/pets/${id}`);
        setAnimal(response.data);
      } catch (error) {
        console.error("Error al obtener la información del animal:", error);
        alert(
          "No se pudo cargar la información del animal. Inténtalo más tarde."
        );
      }
    };
    animalInfo();
  }, [id]);

  const anadirAnimal = () => {
    const listadoAnimales = [...animalesCasita, { ...animal, id: animal.id }];
    setAnimalesCasita(listadoAnimales);
    alert("Animal añadido a tu casita");
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

  // Manejar la eliminación del animal
  const handleSubmit = async (id) => {
    const conf = window.confirm("¿Quieres realmente borrar este animal?");
    if (conf) {
      try {
        await axios.delete(`http://localhost:4001/pets/${id}`);
        alert("Este animal ha sido borrado correctamente");
        navigate("/adoptar");
      } catch (error) {
        console.error("Error al borrar el animal:", error);
        alert("No se pudo borrar el animal. Inténtalo más tarde.");
      }
    }
  };

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
        <p>Tamaño: {animal.tamano}</p>
        <p>Cuidados Especiales: {animal.cuidadosEspeciales}</p>
        <p>Ubicación: {animal.ubicacion}</p>
        <p>Años: {animal.edad}</p>
        <p>Gastos de Gestión: {animal.gastosDeGestion}</p>
        <div className="container--button">
          <button
            onClick={anadirAnimal}
            className="button-adopta button--conoceme"
          >
            <FontAwesomeIcon icon={faPaw} />
            Conóceme
          </button>
        </div>
      </div>
      <div className="container--buttons--edit">
        <NavLink to={`/editInfo/${animal.id}`}>
          <button className="buttons--edit">
            <img src="..assets/images/Edit.png" alt="editar" />
          </button>
        </NavLink>
        <button
          onClick={() => handleSubmit(animal.id)}
          className="buttons--edit"
        >
          <img src="..assets/images/Delete.png" alt="borrar" />
        </button>
      </div>
    </div>
  );
};

export default AnimalInfo;
