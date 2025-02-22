import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import {animalesGuardados} from "../../shelter/Shelter";

const ShelterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [onShelter, setOnShelter] = useState([]);

  useEffect(() => {
    JSON.parse(localStorage.getItem("animalesCasita")) || [];
    setOnShelter(animalesGuardados);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {onShelter.map((animal) => (
          <div key={animal.id}>
            <img src={animal.imagen} />
            <input
              type="checkbox"
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
    
      <input type="submit" />
    </form>
  );
};
export default ShelterForm;
