import React, { useState } from "react";
import "./contacto.css";

const Contacto = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMostrarNotificacion(true);
  };
    return (
      <div className="formContainerContacto">
        <form className="form" onSubmit={handleSubmit}>
        <h1>Formulario de Contacto</h1>
            <p><b>Rellene los siguientes campos: </b></p>  
                <div className="form--inputs--divs">
                    <input type="text" placeholder='Nombre completo*' />
                </div>
                <div className="form--inputs--divs">
                    <input type="text" placeholder='Correo electrónico*' />
                </div>
                <div className="form--inputs--divs">
                    <input type="text" placeholder='Número de contacto*' />
                </div>
                <div className={`ocultarNotificacion ${mostrarNotificacion ? "mostrarNotificacion" : ""}`}>
                  <article>¡Gracias!¡Nos pondremos en contacto muy pronto!</article>
                </div>
                <button className="button-adopta btn--conoceme" type="submit">Enviar</button>
        </form>

      </div>
    )
  }
  
  export default Contacto