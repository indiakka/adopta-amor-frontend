import "./form.css";
import React from "react";
import { guardarAnimal } from "../../axios";
import { useNavigate } from "react-router";
import { useState } from "react";

const Form = () => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [tamano, setTamano] = useState("");
  const [cuidadosEspeciales, setCuidadosEspeciales] = useState("");
  const [edad, setEdad] = useState(0);
  const [ubicacion, setUbicacion] = useState("");
  // const [imagen, setImagen] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validarFormulario = () => {
    const newErrors = {};

    if (!tipo) newErrors.tipo = "Por favor, selecciona el tipo de animal.";
    if (!nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!raza) newErrors.raza = "La raza es obligatoria.";
    if (edad < 0) newErrors.edad = "La edad no puede ser negativa.";
    if (!ubicacion) newErrors.ubicacion = "La ubicación es obligatoria.";
    if (!tamano) newErrors.tamano = "Por favor, selecciona el tamaño.";

    return newErrors;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validarFormulario();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("nombre", nombre);
    formData.append("raza", raza);
    formData.append("tamano", tamano);
    formData.append("cuidadosEspeciales", cuidadosEspeciales);
    formData.append("ubicacion", ubicacion);
    formData.append("edad", parseInt(edad));
    if (selectedFile) {
      formData.append("imagen", selectedFile);
    }
    try {
      await guardarAnimal(formData);
      alerta("Tu peludito se ha guardado correctamente");
      navigate("/adoptar");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alerta("Hubo un problema al guardar el animal.");
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
              <p className="error">{errors.nombre ? "Nombre requerido" : ""}</p>
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
              <p className="error">{errors.raza ? "Raza requerida" : ""}</p>
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
              <p className="error">{errors.edad ? "Edad requerida" : ""}</p>
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
              <p className="error">
                {errors.ubicacion ? "Ubicacion requerida" : ""}
              </p>
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
              <p className="error">{errors.tamano ? "Tamaño requerido" : ""}</p>
            </div>
            <div>
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
              {/* <label htmlFor="imagen">Enlace de la foto</label>
              <input
                id="imagen"
                value={imagen}
                type="text"
                placeholder="Enlace de la foto"
                onChange={(event) => setImagen(event.target.value)}
              />
              <p className="error">{errors.imagen ? "" : ""}</p>*/}
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
              <p className="error">{errors.cuidadosEspeciales ? "" : ""}</p>
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
