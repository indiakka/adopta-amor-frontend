import React, { useState, useEffect } from "react";
import "./authForm.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import OpenEyeIcon from "/assets/images/icons/open.png";
import CloseEyeIcon from "/assets/images/icons/close.png";
import Logo from "../../navbar/logo/Logo";

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isSignPanelActive, setIsSignPanelActive] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "", 
    dni: "", 
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); 

  useEffect(() => {
    if (location.state?.isSignPanelActive) {
      setIsSignPanelActive(true);
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/reverso-social/femsenior", {
          state: { showWelcomeAlert: true },
        });
      }, 100);
    }
  }, [isAuthenticated, navigate]);

  const resetForm = () => {
    setForm({
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      dni: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePanel = () => {
    resetForm();
    setError(null);
    setIsSignPanelActive(!isSignPanelActive);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <div
      className={`signContainer ${isSignPanelActive ? "signPanelActive" : ""}`}
      id="container"
    >
      <div
        className="formContainer signUpContainer"
        style={{ display: isSignPanelActive ? "block" : "none" }}
      >
        <form>
          <h2 className="registerTitle">Crea una cuenta</h2>
          <input
            className="inputLogin"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
            name="name"
            value={form.name}
          />
          <input
            className="inputLogin"
            type="text"
            placeholder="Apellido"
            onChange={handleChange}
            name="lastname"
            value={form.lastname}
          />
          <input
            className="inputLogin"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={form.email}
          />
          <input
            className="inputLogin"
            type="text"
            placeholder="DNI"
            onChange={handleChange}
            name="dni"
            value={form.dni}
          />
          <div className="passwordContainer">
            <input
              className="inputLogin"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Contraseña"
              onChange={handleChange}
              name="password"
              value={form.password}
            />
            <img
              src={isPasswordVisible ? CloseEyeIcon : OpenEyeIcon}
              alt="Toggle Password"
              className="eyeIcon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="passwordContainer">
            <input
              className="inputLogin"
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              onChange={handleChange}
              name="confirmPassword"
              value={form.confirmPassword}
            />
            <img
              src={isConfirmPasswordVisible ? CloseEyeIcon : OpenEyeIcon}
              alt="Toggle Confirm Password"
              className="eyeIcon"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          <button className="loginButton" type="submit">
            Registrar
          </button>
          <p>
            ¿Ya tienes cuenta?{" "}
            <span className="link" onClick={handlePanel}>
              Accede aquí
            </span>
          </p>
        </form>
      </div>

      <div
        className="formContainer signInContainer"
        style={{ display: !isSignPanelActive ? "block" : "none" }}
      >
        <form>
          <h2 className="logInTitle">Accede a tu cuenta</h2>
          <input
            className="inputLogin"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={form.email}
          />
          <div className="passwordContainer">
            <input
              className="inputLogin"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Contraseña"
              onChange={handleChange}
              name="password"
              value={form.password}
            />
            <img
              src={isPasswordVisible ? CloseEyeIcon : OpenEyeIcon}
              alt="Toggle Password"
              className="eyeIcon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button className="loginButton" type="submit">
            Ingresar
          </button>
          <p>
            ¿No tienes cuenta?{" "}
            <span className="link" onClick={handlePanel}>
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>

      <div className="loginContainer">
        <div className="loginPanel loginLeft">
          <h3>Bienvenido a</h3>
          <div className="loginLogo">
            <Logo />
          </div>
        </div>
        <div className="loginPanel loginRight">
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
