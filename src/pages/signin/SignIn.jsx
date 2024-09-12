import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css"; // Archivo CSS para estilos
import Popup from "../../components/popups/Popups";

const SignIn = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const closePopup = () => setIsPopupOpen(false);

  const handleName = (e) => {
    setNombre(e.target.value);
    if (e.target.value) {
      setNameError(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !email || !password) {
      setNameError(!nombre);
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/auth/register", {
        email,
        password,
        name: nombre,
      });

      if (response.data) {
        setPopupMessage("Registro exitoso. Redirigiendo al login...");
        setIsPopupOpen(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setPopupMessage("Error en el servidor. Inténtalo nuevamente.");
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      setPopupMessage("Error en el servidor. Inténtalo nuevamente.");
      setIsPopupOpen(true);
    }
  };

  return (
    <div className="container--signin">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleName}
            placeholder="Ingresa tu nombre"
            required
          />
          {nameError && <p className="error-text">Nombre requerido</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
            placeholder="Ingresa tu correo electrónico"
            required
          />
          {emailError && <p className="error-text">Email requerido</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Ingresa tu contraseña"
            required
          />
          {passwordError && <p className="error-text">Contraseña requerida</p>}
        </div>
        <button type="submit" className="button-signin">
          Registrarse
        </button>
      </form>
      <div className="signin-footer">
        ¿Ya tienes cuenta? Accede{" "}
        <Link to="/login" className="link">
          aquí
        </Link>
      </div>
      {isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          closePopup={closePopup}
          message={popupMessage}
        />
      )}
    </div>
  );
};

export default SignIn;
