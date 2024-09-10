import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css"; // Archivo CSS para estilos
import Popup from "../../components/popups/Popups";

const SignIn = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const closePopup = () => setIsPopupOpen(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const datosRegistro = {
      nombre,
      email,
      password,
    };

    try {
      await axios.post("/api/registro", datosRegistro);

      setPopupMessage("Registro exitoso. Redirigiendo...");
      setIsPopupOpen(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setPopupMessage("Hubo un problema con el registro.");
      setIsPopupOpen(true);
    }
  };

  return (
    <div className="container--signin">
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit" className="button-signin">
          Registrarse
        </button>
      </form>
      <div className="signin-footer">
        <p>
          ¿Ya tienes cuenta? <a href="/login">Accede aquí</a>
        </p>
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
