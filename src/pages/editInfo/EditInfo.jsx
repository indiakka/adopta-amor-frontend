import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { actualizarAnimal, recibirAnimal } from "../../axios";
import "./editInfo.css"

const EditInfo = () => {
  const { id } = useParams();
  const [animalGuardado, setAnimalGuardado] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cargarAnimal = async () => {
      const datosAnimal = await recibirAnimal(id);
      if (datosAnimal) {
        setAnimalGuardado(datosAnimal);
      } else {
        alert("Error cargando los datos del animal.");
      }
    };
    cargarAnimal();
  }, [id]);

  const manejarEnvio = async (event) => {
    event.preventDefault();

    if (!animalGuardado || !animalGuardado.tipo || !animalGuardado.nombre) {
      alert("Faltan datos por completar");
      return;
    }

    const resultado = await actualizarAnimal(id, animalGuardado);
    if (resultado) {
      alert("Datos modificados correctamente");
      navigate("/adoptar");
    } else {
      alert("Error actualizando el animal");
    }
  };

  return (
    <div className="container--form">
      <form onSubmit={manejarEnvio} className="form">
        <div className="form--tipo-container">
          <p>
            <b>Seleccione el tipo de animal: </b>
          </p>
          <div className="form--tipo">
            <label>
              <input
                value="Perro"
                checked={animalGuardado.tipo === "Perro"}
                type="radio"
                id="Perro"
                name="tipo"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    tipo: event.target.value,
                  })
                }
              />
              Perro
            </label>
            <label>
              <input
                value="Gato"
                checked={animalGuardado.tipo === "Gato"}
                type="radio"
                id="Gato"
                name="tipo"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    tipo: event.target.value,
                  })
                }
              />
              Gato
            </label>
          </div>
        </div>

        <div className="form--column-container">
          <div className="form--column">
            <div>
              <input
                className="input--text"
                value={animalGuardado.nombre || ""}
                type="text"
                placeholder="Nombre"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    nombre: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                className="input--text"
                value={animalGuardado.raza || ""}
                type="text"
                placeholder="Raza"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    raza: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                className="input--text"
                value={animalGuardado.edad || ""}
                type="number"
                placeholder="Edad"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    edad: Number(event.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="form--column">
            <div>
              <input
                className="input--text"
                value={animalGuardado.ubicacion || ""}
                type="text"
                placeholder="Ubicación"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    ubicacion: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                className="input--text"
                value={animalGuardado.imagen || ""}
                type="text"
                placeholder="Enlace de la foto"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    imagen: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <select
                className="input--select"
                value={animalGuardado.tamano || ""}
                name="tamano"
                id="tamano"
                onChange={(event) =>
                  setAnimalGuardado({
                    ...animalGuardado,
                    tamano: event.target.value,
                  })
                }
              >
                <option hidden value="">
                  Selecciona el tamaño
                </option>
                <option value="grande" className="select--option">
                  Grande
                </option>
                <option value="mediano" className="select--option">
                  Mediano
                </option>
                <option value="pequeño" className="select--option">
                  Pequeño
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="form--cuidados">
          <input
            className="input--text"
            value={animalGuardado.cuidadosEspeciales || ""}
            type="text"
            placeholder="Cuidados del animal"
            onChange={(event) =>
              setAnimalGuardado({
                ...animalGuardado,
                cuidadosEspeciales: event.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="button-adopta">
          Actualizar datos
        </button>
      </form>
    </div>
  );
};


export default EditInfo;
