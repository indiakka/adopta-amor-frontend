import { useEffect, useState } from "react";
import React from "react"; 

import { useNavigate, useParams } from "react-router";
import { actualizarAnimal, recibirAnimal } from "../../axios";

const EditInfo = () => {
  const { id } = useParams();
  const [animalGuardado, setAnimalGuardado] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const animalEditar = async () => {
      setAnimalGuardado(await recibirAnimal(id));
    };
    animalEditar();
  }, [id]);

  const manejarEnvio = async (event) => {
    event.preventDefault();
    await actualizarAnimal(id, animalGuardado);
    alert("Datos modificados correctamente");
    navigate("/adoptar");
  };

  return (
    <div className="container--form">
      <form onSubmit={manejarEnvio} className="form">
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
        <div className="container--entradas--form">
          <div className="container--entradas--divs">
            <div>
              <input
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
          <div className="container--entradas--divs">
            <div>
              <input
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
            <div>
              <input
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
          </div>
        </div>
        <button type="submit" className="button-adopta">
          Actualizar datos
        </button>
      </form>
    </div>
  );
};

export default EditInfo;
