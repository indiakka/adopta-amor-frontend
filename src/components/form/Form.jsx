import "./form.css";
import React, { useState } from "react";
import axios from "axios";
import { guardarAnimal } from "../../axios";
import { useNavigate } from "react-router";

const Form = () => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [tamano, setTamano] = useState("");
  const [cuidadosEspeciales, setCuidadosEspeciales] = useState("");
  const [edad, setEdad] = useState(0);
  const [ubicacion, setUbicacion] = useState("");
  const [imagen, setImagen] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validarFormulario = () => {
    const newErrors = {};

    if (!tipo) newErrors.tipo = "Por favor, selecciona el tipo de animal.";
    if (!nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!raza) newErrors.raza = "La raza es obligatoria.";
    if (edad < -1) newErrors.edad = "La edad debe ser mayor a -1.";
    if (!ubicacion) newErrors.ubicacion = "La ubicación es obligatoria.";
    if (!imagen) newErrors.imagen = "El enlace de la imagen es obligatorio.";
    if (!tamano) newErrors.tamano = "Por favor, selecciona el tamaño.";
    if (!cuidadosEspeciales)
      newErrors.cuidadosEspeciales = "Este campo es obligatorio.";

    return newErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validarFormulario();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const datos = {
      tipo,
      raza,
      nombre,
      tamano,
      cuidadosEspeciales,
      ubicacion,
      edad: parseInt(edad),
      imagen,
    };

    try {
      await guardarAnimal(datos);
      alert("Tu peludito se ha guardado correctamente");
      navigate("/adoptar");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Hubo un problema al guardar el animal.");
      }
    }
  };

  return (
    <div className="container--form">
      <form onSubmit={onSubmit} className="form">
        <p>
          <b>Seleccione el tipo de animal: </b>
        </p>
        <div className="form--tipo">
          <label htmlFor="perro">
            <input
              value="Perro"
              checked={tipo === "Perro"}
              type="radio"
              id="perro"
              name="tipo"
              onChange={(event) => setTipo(event.target.value)}
            />
            Perro
          </label>
          <label htmlFor="gato">
            <input
              value="Gato"
              checked={tipo === "Gato"}
              type="radio"
              id="gato"
              name="tipo"
              onChange={(event) => setTipo(event.target.value)}
            />
            Gato
          </label>
          {errors.tipo && <p className="error">{errors.tipo}</p>}
        </div>
        <div className="container--input--form">
          <div className="container--input--divs">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                value={nombre}
                type="text"
                placeholder="Nombre"
                onChange={(event) => setNombre(event.target.value)}
              />
              {errors.nombre && <p className="error">{errors.nombre}</p>}
            </div>
            <div>
              <label htmlFor="raza">Raza</label>
              <input
                id="raza"
                value={raza}
                type="text"
                placeholder="Raza"
                onChange={(event) => setRaza(event.target.value)}
              />
              {errors.raza && <p className="error">{errors.raza}</p>}
            </div>
            <div>
              <label htmlFor="edad">Edad</label>
              <input
                id="edad"
                value={edad}
                type="number"
                placeholder="Edad"
                onChange={(event) => setEdad(event.target.value)}
              />
              {errors.edad && <p className="error">{errors.edad}</p>}
            </div>
          </div>
          <div className="container--input--divs">
            <div>
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                id="ubicacion"
                value={ubicacion}
                type="text"
                placeholder="Ubicación"
                onChange={(event) => setUbicacion(event.target.value)}
              />
              {errors.ubicacion && <p className="error">{errors.ubicacion}</p>}
            </div>
            <div>
              <label htmlFor="imagen">Enlace de la foto</label>
              <input
                id="imagen"
                value={imagen}
                type="text"
                placeholder="Enlace de la foto"
                onChange={(event) => setImagen(event.target.value)}
              />
              {errors.imagen && <p className="error">{errors.imagen}</p>}
            </div>
            <div>
              <label htmlFor="tamano">Tamaño</label>
              <select
                id="tamano"
                value={tamano}
                name="tamano"
                onChange={(event) => setTamano(event.target.value)}
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
          </div>
          <div className="container--input--divs">
            <div>
              <label htmlFor="cuidados">Cuidados especiales</label>
              <input
                id="cuidados"
                value={cuidadosEspeciales}
                type="text"
                placeholder="Cuidados del animal"
                onChange={(event) => setCuidadosEspeciales(event.target.value)}
              />
              {errors.cuidadosEspeciales && (
                <p className="error">{errors.cuidadosEspeciales}</p>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="button-adopta">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Form;
