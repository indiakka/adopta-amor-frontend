import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Verificar autenticación desde el contexto

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
