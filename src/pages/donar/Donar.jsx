import Form from "../../components/form/Form";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Alerta from "../../components/alerta/Alerta";
import "./donar.css";

const Donar = () => {
  const location = useLocation();
  const [alertaMessage, setAlertaMessage] = useState(null);

  useEffect(() => {
    if (location.state?.alertaMessage) {
      setAlertaMessage(location.state.alertaMessage);
    }
  }, [location.state]);

  const handleCloseAlerta = () => {
    setAlertaMessage(null); 
  };

  return (
    <div className="donar-container">
      {alertaMessage && (
        <Alerta
          isOpen={true} 
          onClose={handleCloseAlerta} 
          title="Bienvenido"
          text={alertaMessage}
          icon="success"
        />
      )}
      <div>
        <div className="container-donar">
          <h1>Dona un animal</h1>
          <p>¿Conoces un animal que necesite un nuevo hogar?</p>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Donar;
