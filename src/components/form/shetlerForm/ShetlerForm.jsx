import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import "./shelterForm.css";
import Swal from "sweetalert2";

const ShelterForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [animalesSeleccionados, setAnimalesSeleccionados] = useState([]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [onShelter, setOnShelter] = useState([]);

  useEffect(() => {
    const animalesGuardados =
      JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setOnShelter(animalesGuardados);

    setAnimalesSeleccionados(animalesGuardados.map((animal) => animal.id));
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleCheckboxChange = (animalId) => {
    setAnimalesSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(animalId)
        ? prevSeleccionados.filter((id) => id !== animalId)
        : [...prevSeleccionados, animalId]
    );
  };

  const onSubmit = (data) => {
    const listaAnimales = onShelter.filter((animal) =>
      animalesSeleccionados.includes(animal.id)
    );

    if (listaAnimales.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Algun animal debe estar seleccionado",
        icon: "error",
        confirmButtonColor: "rgb(131, 62, 172)",
      });
      return;
    }

    fetch("/api/guardar-animales", {
      method: "POST",
      body: JSON.stringify(listaAnimales),
      headers: { "Content-Type": "application/json" },
    });

    Swal.fire({
      title: "Éxito",
      text: "Solicitud enviada correctamente",
      icon: "success",
      confirmButtonColor: "rgb(131, 62, 172)",
    });
  };

  return (
    <div className="container--form">
      <form onSubmit={handleSubmit(onSubmit)} className="form contact-form">
        <div className="contact--animals">
          {onShelter.map((animal) => (
            <div key={animal.id} className="animal-detail">
              <div className="contact--animal--info">
                <img
                  className="selectedImage"
                  src={animal.imagen}
                  alt={animal.nombre}
                />
                <div>
                  <input
                    type="checkbox"
                    className="imageCheckbox"
                    onChange={() => handleCheckboxChange(animal.id)}
                    checked={animalesSeleccionados.includes(animal.id)}
                  />
                  {animal.nombre}
                </div>
              </div>
              {errors.checked?.[animal.id] && (
                <p role="alert">{errors.checked?.[animal.id].message}</p>
              )}
            </div>
          ))}
        </div>

        <div className="contact--form--details">
          <div className="contact--form--info">
            <label className="label-contact" htmlFor="name">
              Nombre y Apellido
            </label>
            <div className="container--input--divs contact--form--div">
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Nombre completo"
              />
            </div>

            <label className="label-contact" htmlFor="email">
              Email
            </label>
            <div className="container--input--divs contact--form--div">
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
            </div>

            <label className="label-contact" htmlFor="number">
              Número de teléfono
            </label>
            <div className="container--input--divs contact--form--div">
              <input
                type="number"
                id="number"
                name="number"
                value={values.number}
                onChange={handleChange}
                placeholder="Número de contacto"
              />
            </div>
          </div>

          <div className="contact--input--form">
            <label className="label-contact" htmlFor="respuesta">
              ¿Qué quieres hacer?
              <div className="container--input--divs contact--form--div">
                <select name="respuesta" id="respuesta">
                  <option value="conocer">Quiero conocerlo</option>
                  <option value="info">Necesito más información.</option>
                </select>
              </div>
            </label>

            <label className="label-contact" htmlFor="mensaje">
              Mensaje adicional
              <div className="container--input--divs contact--form--div">
                <input
                  className="contact--message"
                  type="text"
                  name="message"
                />
              </div>
            </label>
          </div>
        </div>

        <input type="submit" className="button-adopta contact-button" />
      </form>
    </div>
  );
};

export default ShelterForm;
