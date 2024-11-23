import Form from "../../components/form/Form";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Popup from "../../components/popups/Popups";
import "./donar.css";

const Donar = () => {
  const location = useLocation();
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    if (location.state?.popupMessage) {
      setPopupMessage(location.state.popupMessage);
    }
  }, [location.state]);
  return (
    <div className="donar-container">
      {/* Renderiza el popup si hay un mensaje */}
      {popupMessage && (
        <Popup
          isPopupOpen={!!popupMessage}
          closePopup={() => setPopupMessage(null)}
          message={popupMessage}
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
