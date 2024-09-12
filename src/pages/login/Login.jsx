import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/buttons/Button";
import Popup from "../../components/popups/Popups.jsx";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";  
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(!e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(!e.target.value);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const popUpFunction = () => {
    closePopup();
    navigate("/donar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4001/auth/login", {
        email,
        password,
      });

      const { token, userId, name, role } = response.data;

      if (token && userId && name && role) {
        login(token);
        localStorage.setItem("user", JSON.stringify({ userId, name, role }));

        setPopUpMessage(`Bienvenido ${name}`);
        setIsPopupOpen(true);
      } else {
        throw new Error("Token o datos de usuario faltantes");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setPopUpMessage(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
      setIsPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container--form">
      <section className="form">
        <h1>Acceso de usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="container--input--form">
            <div className="container--input--divs">
              <Input
                title="E-mail"
                placeholder="Escribe tu email..."
                type="email"
                value={email}
                onChange={handleEmail}
              />
              {emailError && <p className="error-text">E-mail requerido</p>}
            </div>

            <div className="container--input--divs">
              <Input
                title="Contraseña"
                placeholder="Escribe tu contraseña..."
                type="password"
                value={password}
                onChange={handlePassword}
              />
              {passwordError && (
                <p className="error-text">Contraseña requerida</p>
              )}
            </div>

            <div className="button-container">
              <button type="submit" className="button-signin">
                Aceptar
              </button>
              <button
                className="button-signin"
                text="Cancelar"
                type="button"
                onClick={() => navigate("/donar")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </section>

      <Popup
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        message={popUpMessage}
        onConfirm={popUpFunction} 
        showCancel={false} 
      />
    </div>
  );
};

export default Login;
