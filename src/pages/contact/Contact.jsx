import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMostrarNotificacion(true);
  };
  return (
    <div className="formContainerContacto">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Formulario de Contacto</h1>
        <p>
          <b>Rellene los siguientes campos: </b>
        </p>
        <div className="container--input--divs">
          <input type="text" placeholder="Nombre completo*" />
        </div>
        <div className="container--input--divs">
          <input type="text" placeholder="Correo electrónico*" />
        </div>
        <div className="container--input--divs">
          <input type="text" placeholder="Número de contacto*" />
        </div>
        <div
          className={`ocultarNotificacion ${
            mostrarNotificacion ? "mostrarNotificacion" : ""
          }`}
        >
          <article>¡Gracias!¡Nos pondremos en contact muy pronto!</article>
        </div>
        <button className="button-adopta button--conoceme" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
