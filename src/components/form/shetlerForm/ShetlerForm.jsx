import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit( onSubmit )}>
      <div>{
 onShelter.map( ( animal ) =>
  {
    <img src={animal.imagen} />,
        animal.id,
        defaultChecked ={true}
      
  })}
      </div>
      <input
        {...register("firstName", { required: true })}
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      {errors.firstName?.type === "required" && (
        <p role="alert">First name is required</p>
      )}

      <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}

      <input type="submit" />
    </form>
  );
};
export default ShelterForm;
