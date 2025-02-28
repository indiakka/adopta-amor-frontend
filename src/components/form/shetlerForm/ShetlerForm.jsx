import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import "./shelterForm.css";

const ShelterForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    onShelter.filter((animal) => data.checked?.[animal.id]);
  };

  const [onShelter, setOnShelter] = useState([]);

  useEffect(() => {
    const animalesGuardados =
      JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setOnShelter(animalesGuardados);
  }, []);

  return (
    <div className="container--form">
      <form onSubmit={handleSubmit(onSubmit)} className="form contact-form">
        <div className="contact--animals">
          {onShelter.map((animal) => (
            <div key={animal.id} className="animal-detail">
              <div className="contact--animal--info">
                <img className="selectedImage" src={animal.imagen} />
                <div>
                  <input
                    type="checkbox"
                    className="imageCheckbox"
                    defaultChecked={true}
                    {...register(`checked.${animal.id}`, {
                      required: "Algun animal debe estar seleccionado",
                    })}
                    aria-invalid={
                      errors.checked?.[animal.id] ? "true" : "false"
                    }
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
              Número de teléfono{" "}
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
              ¿Qué necesitas?
              <div className="container--input--divs contact--form--div">
                <select name="respuesta" id="respuesta">
                  <option value="conocer">Quiero conocerlo</option>
                  <option value="info">
                    Quiero saber más información sobre él
                  </option>
                </select>
              </div>
            </label>

            <label className="label-contact" htmlFor="mensaje">
              Mensaje adicional
              <div className="container--input--divs  contact--form--div">
                <input className="contact--message" type="message" />
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
