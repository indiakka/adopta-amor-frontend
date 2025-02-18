import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import OpenEyeIcon from "/assets/images/icons/open.png";
import CloseEyeIcon from "/assets/images/icons/close.png";
import Logo from "../../navbar/logo/Logo";
import axios from "axios";
import Alerta from "../../alerta/Alerta";
import "./authForm.css";

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isSignPanelActive, setIsSignPanelActive] = useState(false);
  const [isAlertaOpen, setIsAlertaOpen] = useState(false);
  const [alertaMessage, setAlertaMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
  });

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleToggle = () => setIsSignPanelActive(!isSignPanelActive);

  useEffect(() => {
    if (location.state?.isSignPanelActive) {
      setIsSignPanelActive(true);
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/donar");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const validateForm = () => {
    const newErrors = {};

    if (isSignPanelActive) {
      if (!form.name) newErrors.name = "El nombre es obligatorio";
      if (!form.lastname) newErrors.lastname = "El apellido es obligatorio";
      if (!form.dni) newErrors.dni = "El DNI es obligatorio";
      if (!form.email) newErrors.email = "El correo electrónico es obligatorio";
      if (!form.password) newErrors.password = "La contraseña es obligatoria";
      if (!form.confirmPassword)
        newErrors.confirmPassword = "Debes confirmar la contraseña";
      if (
        form.password &&
        form.confirmPassword &&
        form.password !== form.confirmPassword
      ) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    } else {
      if (!form.email) newErrors.email = "El correo electrónico es obligatorio";
      if (!form.password) newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isSignPanelActive) {
        // Registro
        const response = await axios.post(`${baseURL}/auth/register`, {
          email: form.email,
          password: form.password,
          name: form.name,
          lastname: form.lastname,
          dni: form.dni,
        });

        if (response.data) {
          setAlertaMessage(
            "Te has registrado correctamente. Haz clic en aceptar para iniciar sesión."
          );
          setIsAlertaOpen(true);
        }
      } else {
        // Inicio de sesión
        const response = await axios.post(`${baseURL}/auth/login`, {
          email: form.email,
          password: form.password,
        });

        const { token, userId, name, role } = response.data;
        login(token);
        localStorage.setItem("user", JSON.stringify({ userId, name, role }));
        navigate("/donar", { state: { alertaMessage: ` ${name}` } });
      }
    } catch (error) {
      console.error("Error en el servidor:", error.response || error.message);
      setAlertaMessage(
        error.response?.data?.message ||
          "El email o usuario no son correctos. Por favor, inténtalo de nuevo."
      );
      setIsAlertaOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertaClose = () => {
    setIsAlertaOpen(false);
    if (isSignPanelActive) {
      setIsSignPanelActive(false);
    }
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
        <form onSubmit={handleSubmit}>
          <h2 className="registerTitle">Crea una cuenta</h2>
          <input
            className="inputLogin"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
            name="name"
            value={form.name}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
          <input
            className="inputLogin"
            type="text"
            placeholder="Apellido"
            onChange={handleChange}
            name="lastname"
            value={form.lastname}
          />
          {errors.lastname && <p className="error-text">{errors.lastname}</p>}
          <input
            className="inputLogin"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={form.email}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input
            className="inputLogin"
            type="text"
            placeholder="DNI"
            onChange={handleChange}
            name="dni"
            value={form.dni}
          />
          {errors.dni && <p className="error-text">{errors.dni}</p>}
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
          {errors.password && <p className="error-text">{errors.password}</p>}
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
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
          <button className="loginButton" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Registrar"}
          </button>
          <p className="linkside">
            ¿Ya tienes cuenta?{" "}
            <span className="link" onClick={handleToggle}>
              Accede aquí
            </span>
          </p>
        </form>
      </div>

      <div
        className="formContainer signInContainer"
        style={{ display: !isSignPanelActive ? "block" : "none" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="logInTitle">Accede a tu cuenta</h2>
          <input
            className="inputLogin"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={form.email}
            autoComplete={isSignPanelActive ? "email" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <div className="passwordContainer">
            <input
              className="inputLogin"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Contraseña"
              onChange={handleChange}
              name="password"
              value={form.password}
              autoComplete={
                isSignPanelActive ? "new-password" : "current-password"
              }
            />
            <img
              src={isPasswordVisible ? CloseEyeIcon : OpenEyeIcon}
              alt="Toggle Password"
              className="eyeIcon"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
          <button className="loginButton" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Ingresar"}
          </button>
          <p className="linkside">
            ¿No tienes cuenta?{" "}
            <span className="link" onClick={handleToggle}>
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>

      {/* Alert */}
      {isAlertaOpen &&  (
        <Alerta
        isOpen={isAlertaOpen}
        onClose={handleAlertaClose}
        title={isSignPanelActive ? "Registro exitoso" : "Error"}
        text={alertaMessage}
        icon={isSignPanelActive ? "success" : "error"}
        onConfirm={handleAlertaClose}
      />
      )}
      <div className="loginContainer">
        <div className="loginPanel loginLeft">
          <h3>Bienvenido a</h3>
          <div className="loginLogo">
            <Logo />
          </div>
        </div>
        <div className="loginPanel loginRight"></div>
      </div>
    </div>
  );
};

export default AuthForm;
