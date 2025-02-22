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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {onShelter.map((animal) => (
          <div key={animal.id}>
            <img className="selectedImage" src={animal.imagen} />
            <input
              type="checkbox"
              className="imageCheckbox"
              defaultChecked={true}
              {...register(`checked.${animal.id}`, {
                required: "Algun animal debe estar seleccionado",
              })}
              aria-invalid={errors.checked?.[animal.id] ? "true" : "false"}
            />
            {errors.checked?.[animal.id] && (
              <p role="alert">{errors.checked?.[animal.id].message}</p>
            )}
          </div>
        ))}
      </div>
      <label htmlFor="respuesta">
        ¿Qué necesitas?
        <div>
          <select name="respuesta" id="respuesta">
            <option value="conocer">Quiero conocerlo</option>
            <option value="info">Quiero saber más información sobre él</option>
          </select>
        </div>
      </label>
      <label htmlFor="mensaje">
        Mensaje adicional
        <div>
          <input type="message" />
        </div>
      </label>
      <label className="label-contact" htmlFor="name">
        Nombre y Apellido{" "}
      </label>
      <div className="container--input--divs contact-form">
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Nombre completo"
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default ShelterForm;
