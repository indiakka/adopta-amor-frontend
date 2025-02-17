import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import Alerta from "../../components/alerta/Alerta";
import { useNavigate } from "react-router";

const Contact = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = useState({
    isOpen: false,
    title: "",
    icon: "",
  });
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const navigate = useNavigate();

  const form = useRef();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    if (!values.name || !values.email || !values.message) {
      setMostrarNotificacion({
        isOpen: true,
        title: "Error",
        text: "Por favor, completa todos los campos requeridos",
        icon: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setMostrarNotificacion({
        isOpen: true,
        title: "Error",
        text: "Por favor, introduce un email válido.",
        icon: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      .then(
        (result) => {
          setValues({
            name: "",
            email: "",
            number: "",
            message: "",
          });
          setMostrarNotificacion({
            isOpen: true,
            title:
              result.text === "OK"
                ? "¡Gracias!¡Nos pondremos en contacto muy pronto!"
                : "Mensaje no envíado, comprueba que los campos no estén vacíos",
            icon: result.text === "OK" ? "success" : "error",
            onConfirm: () => {
              form.current.reset();
              navigate("/adoptar");
            },
          });
        },
        (error) => {
          setMostrarNotificacion({
            isOpen: true,
            title: "Error",
            text: error.text || error.message || "Ocurrió un error inesperado",
            icon: "error",
          });
        }
      );
  };
  return (
    <div className="formContainerContacto">
      <form ref={form} className="form contact-form " onSubmit={handleSubmit}>
        <h1>Formulario de Contacto</h1>
          <b>Rellene los siguientes campos </b>
          <p>(Los campos con * son obligatorios)</p>
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
        </div>{" "}
        <label className="label-contact" htmlFor="email">
          Email{" "}
        </label>
        <div className="container--input--divs contact-form">
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
        </div>
        <label htmlFor="number">Número de teléfono </label>
        <div className="container--input--divs contact-form">
          <input
            type="number"
            id="number"
            name="number"
            value={values.number}
            onChange={handleChange}
            placeholder="Número de contacto"
          />
        </div>
        <label className="label-contact" htmlFor="message">
          Mensaje{" "}
        </label>
        <div className="container--input--divs  contact-form email-message">
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={values.message}
            placeholder="Mensaje"
          />
        </div>
        <div
          className={`ocultarNotificacion ${
            mostrarNotificacion.isOpen ? "mostrarNotificacion" : ""
          }`}
        >
          {mostrarNotificacion.isOpen && <Alerta {...mostrarNotificacion} />}
        </div>
        <button className="button-adopta button--conoceme" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
