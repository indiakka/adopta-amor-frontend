import { useEffect } from "react";
import React from "react";
import "./popups.css";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import ReactDOM from "react-dom";

const Popup = ({
  isPopupOpen,
  closePopup,
  message,
  onConfirm,
  showCancel = true,
}) => {
  useEffect(() => {
    if (isPopupOpen) {
    
      document.body.style.overflow = "hidden";
    } else {
    
      document.body.style.overflow = "";
    }  return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  if (!isPopupOpen) return null;

  const popupContent = (
    <div className="popup-overlay">
      <div className="ventana-Popup">
        <div className="popup-content">
          <p className="popup-message">{message}</p>
          <div className="popup-buttons">
            <Button
              text="Aceptar"
              type="button"
              className="popup-button-accept"
              onClick={(e) => {
                if (onConfirm) onConfirm(e);
                closePopup();
              }}
            />
            {showCancel && (
              <Button
                text="Cancelar"
                className="popup-button-cancel"
                onClick={closePopup}
                type="button"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(popupContent, document.body);
};

Popup.propTypes = {
  isPopupOpen: PropTypes.bool,
  closePopup: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string,
  showCancel: PropTypes.bool,
};

export default Popup;
