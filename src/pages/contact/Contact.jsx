import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import Popup from "../../components/popups/Popups";

const Contact = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const form = useRef();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setMostrarNotificacion(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      .then(
        (result) => {
          setMostrarNotificacion( true );
            setValues({
              name: "",
              email: "",
              number: "",
              message: "",
            });
          form.current.reset()
        },
        (error) => {
          console.log(error.text);
        }

      );
  };
  return (
    <div className="formContainerContacto">
      <form ref={form} className="form contact-form" onSubmit={handleSubmit}>
        <h1>Formulario de Contacto</h1>
        <p>
          <b>Rellene los siguientes campos </b>
        </p>
        <div className="container--input--divs">
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Nombre completo*"
          />
        </div>
        <div className="container--input--divs">
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Correo electrónico*"
          />
        </div>
        <div className="container--input--divs">
          <input
            type="number"
            id="number"
            name="number"
            value={values.number}
            onChange={handleChange}
            placeholder="Número de contacto*"
          />
        </div>
        <div className="container--input--divs email-message">
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={values.message}
            placeholder="Mensaje*"
          />
        </div>
        <div
          className={`ocultarNotificacion ${
            mostrarNotificacion ? "mostrarNotificacion" : ""
          }`}
        >
          <article>¡Gracias!¡Nos pondremos en contacto muy pronto!</article>
        </div>
        <button className="button-adopta button--conoceme" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
