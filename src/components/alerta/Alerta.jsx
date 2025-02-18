import Swal from "sweetalert2";
import { useEffect } from "react";
import "./alerta.css";

const Alerta = ({
  isOpen,
  title = "Aviso",
  text = "",
  icon = "info",
  onClose,
  confirmButtonText = "Aceptar", 
  showCancelButton = false,
  cancelButtonText = "Cancelar",
  onConfirm,
}) => {
  useEffect(() => {
    if (isOpen) {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonColor: "rgb(131, 62, 172)",
        cancelButtonColor: "rgba(142, 133, 133, 1)",
        background: "#f0f0f0",
        color: "#333",
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm();
        }
        if (onClose) {
          onClose();
        }
      });
    }
  }, [
    isOpen,
    onClose,
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
  ]);

  return null;
};

export default Alerta;
