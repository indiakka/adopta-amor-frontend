import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const url = "/user{id}/";


const mostrarAlerta = (mensaje, tipo = "error") => {
  Swal.fire({
    icon: tipo,
    title: tipo === "error" ? "Error" : "Éxito",
    text: mensaje,
  });
};


export const savedUserAnimals = async (datos) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no encontrado");

    const respuesta = await axios.post(url, datos, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    mostrarAlerta("Animal guardado correctamente en tu perfil.", "success");
    return respuesta.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error al guardar el animal."
      );
    } else if (error.request) {
      throw new Error(
        "No se pudo conectar con el servidor. Verifica tu conexión."
      );
    } else {
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};
