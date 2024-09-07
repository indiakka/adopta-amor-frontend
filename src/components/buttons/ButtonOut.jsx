import { useAuth } from "../hooks/useAuth";

const ButtonSalir = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Cerrar Sesión</button>;
};

export default ButtonSalir;
