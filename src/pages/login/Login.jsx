import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/buttons/Button";
import Popup from "../../components/popups/Popups.jsx";
import axios from "axios"; // Ensure axios is imported
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
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
    // Validate input before sending request
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

      console.log("Response Data:", response.data);

      const { token, userId, name, role } = response.data;
      if (token && userId && name && role) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify({ userId, name, role }));

        alert(`Bienvenido ${name}`);
        navigate("/donar");
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
    <div className="flex-container">
      <section className="section-container">
        <h1 className="heading">Acceso de usuario</h1>
        <hr className="divider" />
        <form onSubmit={handleSubmit}>
          <Input
            title="E-mail "
            placeholder="Escribe tu email..."
            type="email"
            value={email}
            onChange={handleEmail}
          />
          {emailError && <p className="error-text">E-mail requerido</p>}

          <Input
            title="Contraseña "
            placeholder="Escribe tu contraseña..."
            type="password"
            value={password}
            onChange={handlePassword}
          />
          {passwordError && <p className="error-text">Contraseña requerida</p>}

          <div className="button-container">
            <Button
              className={`green-button ${loading ? "disabled-button" : ""}`}
              text={loading ? "Cargando..." : "Aceptar"}
              type="submit"
              disabled={loading}
            />
            <Button
              className="pink-button"
              text="Cancelar"
              type="button"
              onClick={() => navigate("/donar")}
            />
          </div>
        </form>
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

export default Login;
