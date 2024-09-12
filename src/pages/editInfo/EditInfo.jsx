import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { actualizarAnimal, recibirAnimal } from "../../axios";
import Popup from "../../components/popups/Popups";

const EditInfo = () => {
  const { id } = useParams();
  const [animalGuardado, setAnimalGuardado] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarAnimal = async () => {
      const datosAnimal = await recibirAnimal(id);
      if (datosAnimal) {
        setAnimalGuardado(datosAnimal);
      } else {
        setPopupMessage("Error cargando los datos del animal.");
        setIsPopupOpen(true);
      }
    };
    cargarAnimal();
  }, [id]);

  const manejarEnvio = async (event) => {
    event.preventDefault();

    if (!animalGuardado || !animalGuardado.tipo || !animalGuardado.nombre) {
      setPopupMessage("Faltan datos por completar");
      setIsPopupOpen(true);
      return;
    }

    const resultado = await actualizarAnimal(id, animalGuardado);
    if (resultado) {
      setPopupMessage("Datos modificados correctamente");
      setIsPopupOpen(true);
      navigate("/adoptar");
    } else {
      setPopupMessage("Error actualizando el animal");
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="container--form">
      <form onSubmit={manejarEnvio} className="form">
        {/* Form fields */}
        <button type="submit" className="button-adopta">
          Actualizar datos
        </button>
      </form>
      <Popup
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        message={popupMessage}
      />
    </div>
  );
};

export default EditInfo;
