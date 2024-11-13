import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/popups/Popups";
import "./signin.css"; 

const SignIn = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const baseURL = import.meta.env.API_BASE_URL;

  const closePopup = () => setIsPopupOpen(false);

  const handleName = (e) => {
    setNombre(e.target.value);
    setNameError(!e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(!e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(!e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !email || !password) {
      setNameError(!nombre);
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/auth/register`, {
        email,
        password,
        name: nombre,
      });

      if (response.data) {
        setPopupMessage("Registro exitoso. Redirigiendo al login...");
        setIsPopupOpen(true);
        setTimeout(() => {
          closePopup();
          navigate("/login");
        }, 2000);
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      setPopupMessage(
        error.response?.data?.message ||
          "Error en el servidor. Inténtalo nuevamente."
      );
      setIsPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container--signin">
      <form onSubmit={handleSubmit} className="form">
        <h1>Registro de usuario</h1>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleName}
            placeholder="Ingresa tu nombre"
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
          />
          {passwordError && <p className="error-text">Contraseña requerida</p>}
        </div>
        <button type="submit" className="button-signin" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
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
