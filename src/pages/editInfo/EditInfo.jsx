import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { actualizarAnimal, recibirAnimal } from "../../axios";
import Alerta from "../../components/alerta/Alerta"
import "./editInfo.css";

const EditInfo = () => {
  const { id } = useParams();
  const [animalGuardado, setAnimalGuardado] = useState({
    tipo: "",
    nombre: "",
    raza: "",
    tamano: "",
    cuidadosEspeciales: "",
    edad: 0,
    ubicacion: "",
    imagen: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [alertConfig, setAlertConfig] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cargarAnimal = async () => {
      const datosAnimal = await recibirAnimal(id);
      if (datosAnimal) {
        setAnimalGuardado(datosAnimal);
      } else {
        setAlertConfig({
          isOpen: true,
          title: "Error",
          text: "Error cargando los datos del animal.",
          icon: "error",
        });
      }
    };
    cargarAnimal();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const validarFormulario = () => {
    const newErrors = {};
    if (!animalGuardado.tipo)
      newErrors.tipo = "Por favor, selecciona el tipo de animal.";
    if (!animalGuardado.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!animalGuardado.raza) newErrors.raza = "La raza es obligatoria.";
    if (!animalGuardado.tamano)
      newErrors.tamano = "Por favor, selecciona el tamaño.";
    if (!animalGuardado.ubicacion)
      newErrors.ubicacion = "La ubicación es obligatoria.";
    if (animalGuardado.edad < 0)
      newErrors.edad = "La edad no puede ser negativa.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();
    if (!validarFormulario()) {
      setAlertConfig({
        isOpen: true,
        title: "Error",
        text: "Faltan datos por completar o hay errores en el formulario.",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("tipo", animalGuardado.tipo);
    formData.append("nombre", animalGuardado.nombre);
    formData.append("raza", animalGuardado.raza);
    formData.append("tamano", animalGuardado.tamano);
    formData.append("cuidadosEspeciales", animalGuardado.cuidadosEspeciales);
    formData.append("ubicacion", animalGuardado.ubicacion);
    formData.append("edad", animalGuardado.edad);
    if (selectedFile) {
      formData.append("imagen", selectedFile);
    }

    const resultado = await actualizarAnimal(id, formData);
    if (resultado) {
      setAlertConfig({
        isOpen: true,
        title: "Éxito",
        text: "Datos modificados correctamente",
        icon: "success",
        onConfirm: () => navigate("/adoptar"),
      });
    } else {
      setAlertConfig({
        isOpen: true,
        title: "Error",
        text: "Error actualizando el animal",
        icon: "error",
      });
    }
  };

  return (
    <div className="container--form container--form--edit">
      <form onSubmit={manejarEnvio} className="form form-edit">
        <p>
          <b>Seleccione el tipo de animal: </b>
        </p>
        <div className="form--tipo">
          <label htmlFor="perro">
            <input
              value="Perro"
              checked={animalGuardado.tipo === "Perro"}
              type="radio"
              id="perro"
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
          <label htmlFor="gato">
            <input
              value="Gato"
              checked={animalGuardado.tipo === "Gato"}
              type="radio"
              id="gato"
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
          {errors.tipo && <p className="error">{errors.tipo}</p>}
        </div>

        <div className="container--input--form">
          <div className="container--input--divs">
            <div className="container--input--divs--edit">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
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
              {errors.nombre && <p className="error">{errors.nombre}</p>}
            </div>
            <div className="container--input--divs--edit">
              <label htmlFor="raza">Raza</label>
              <input
                id="raza"
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
              {errors.raza && <p className="error">{errors.raza}</p>}
            </div>
            <div className="container--input--divs--edit">
              <label htmlFor="edad">Edad</label>
              <input
                id="edad"
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
              {errors.edad && <p className="error">{errors.edad}</p>}
            </div>
          </div>

          <div className="container--input--divs">
            <div className="container--input--divs--edit">
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                id="ubicacion"
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
              {errors.ubicacion && <p className="error">{errors.ubicacion}</p>}
            </div>
            <div className="container--input--divs--edit">
              <label htmlFor="tamano">Tamaño</label>
              <select
                id="tamano"
                value={animalGuardado.tamano || ""}
                name="tamano"
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
                <option value="grande">Grande</option>
                <option value="mediano">Mediano</option>
                <option value="pequeño">Pequeño</option>
              </select>
              {errors.tamano && <p className="error">{errors.tamano}</p>}
            </div>
            <div className="container--input--divs--edit">
              <label htmlFor="imagen">Subir foto</label>
              <input
                id="imagen"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {selectedFile && (
                <img
                  className="form-image"
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                />
              )}
              {!selectedFile && animalGuardado.imagen && (
                <img
                  className="form-image"
                  src={animalGuardado.imagen}
                  alt="Imagen actual"
                />
              )}
            </div>
          </div>

          <div className="container--input--divs">
            <div className="container--input--divs--edit">
              <label htmlFor="cuidados">Cuidados especiales</label>
              <input
                id="cuidados"
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

        <button type="submit" className="button-adopta button--confirm--edit">
          Actualizar datos
        </button>
      </form>

      {alertConfig.isOpen && <Alerta {...alertConfig} />}
    </div>
  );
};

export default EditInfo;