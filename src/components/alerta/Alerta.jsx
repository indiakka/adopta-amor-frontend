import Swal from "sweetalert2";
import { useEffect } from "react";
import "./alerta.css"

const Alerta = ({
  isOpen,
  onClose,
  title,
  text,
  icon = "info",
  showCancelButton = false,
  confirmButtonText = "Aceptar",
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
        confirmButtonColor: "rgb(131, 62, 172);", // Color del botón de confirmación
        cancelButtonColor: "rgba(142, 133, 133, 1)", // Color del botón de cancelación
        background: "#f0f0f0", // Color de fondo del modal
        color: "#333",
      }).then((result) => {
        if (result.isConfirmed && onConfirm) { 
          onConfirm(); // Ejecuta la función de confirmación si se proporciona
        }
        if (onClose) {
          onClose(); // Cierra el modal
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

  return null; // No renderiza nada en el DOM
};

export default Alerta;
