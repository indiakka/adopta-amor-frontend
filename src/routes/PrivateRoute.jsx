import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
