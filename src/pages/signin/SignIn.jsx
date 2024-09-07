import { useState } from "react";
import React from "react";
import Button from "../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Popup from "../../components/popups/Popups";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUpFunction, setPopUpFunction] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate(); // Hook de redirección de React Router

  const closePopup = () => setIsPopupOpen(false);

  function handleName(e) {
    setName(e.target.value);
    if (e.target.value) {
      setNameError(false);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError(false);
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4001/auth/register", {
        email,
        password,
        name,
      });

      if (response.data) {
        const message = await response.data; // Manejar como texto
        console.log("Response Data:", message);
        setPopUpMessage("Registro exitoso. Redirigiendo al login...");
        setIsPopupOpen(true);
        setTimeout(() => navigate("/login"), 2000); // Redirigir después de 2 segundos
      } else {
        setPopUpMessage("Error en el servidor. Inténtalo nuevamente.");
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      setPopUpMessage("Error en el servidor. Inténtalo nuevamente.");
      setIsPopupOpen(true);
    }
  };


  const navigateLogin = () => {
    if (isPopupOpen) setIsPopupOpen(false);
    console.log("Redirigiendo al login...");
    navigate("/login"); // Redirección al login
  };

  const reloadPage = () => {
    if (isPopupOpen) setIsPopupOpen(false);
    window.location.reload();
  };

  return (
    <div className="form-container">
      <section className="form-section">
        <h1 className="form-title">Registro de usuario</h1>
        <hr className="form-separator" />
        <form onSubmit={handleSubmit}>
          <Input
            title="Nombre"
            placeholder="Escribe tu nombre..."
            type="text"
            value={name}
            onChange={handleName}
          />
          {nameError && <p className="form-error">Nombre requerido</p>}
          <Input
            title="E-mail"
            placeholder="Escribe tu email..."
            type="email"
            value={email}
            onChange={handleEmail}
          />
          {emailError && <p className="form-error">Email requerido</p>}
          <Input
            title="Contraseña"
            placeholder="Escribe tu contraseña..."
            type="password"
            value={password}
            onChange={handlePassword}
          />
          {passwordError && <p className="form-error">Contraseña requerida</p>}
          <div className="form-buttons">
            <Button className="button-accept" text="Aceptar" type="submit" />
            <Button
              className="button-cancel"
              text="Cancelar"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </form>
        <h2 className="form-link">
          ¿Ya tienes cuenta? Accede <Link to="/login">aquí</Link>
        </h2>
      </section>
      <Popup
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        onConfirm={popUpFunction}
        message={popUpMessage}
        showCancel={false}
      />
    </div>
  );
};

export default SignIn;
