import axios from "axios";
import Swal from "sweetalert2";

const url = "/pets";

const mostrarAlerta = (mensaje, tipo = "error") => {
  Swal.fire({
    icon: tipo,
    title: tipo === "error" ? "Error" : "Éxito",
    text: mensaje,
  });
};

export const recibirAnimales = async () => {
  try {
    const respuesta = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return respuesta.data;
  } catch (error) {
    mostrarAlerta("Hubo un problema al cargar la lista de animales.");
    return null;
  }
};

export const recibirAnimal = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no encontrado");

    const respuesta = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return respuesta.data;
  } catch (error) {
    mostrarAlerta("Hubo un problema al cargar la información del animal.");
    return null;
  }
};

export const guardarAnimal = async (datos) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no encontrado");

    const respuesta = await axios.post(url, datos, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    mostrarAlerta("Animal guardado correctamente.", "success");
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

export const actualizarAnimal = async (id, formData) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no encontrado");

    const respuesta = await axios.put(`${url}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true; 
  } catch (error) {
    console.error("Error al actualizar el animal:", error);
    return false; 
  }
};

export const eliminarAnimal = async (id) => {
  const conf = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(131, 62, 172)",
    cancelButtonColor: "rgba(142, 133, 133, 1)",
    confirmButtonText: "Sí, eliminar!",
  });

  if (!conf.isConfirmed) {
    mostrarAlerta("El animal NO ha sido borrado");
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no encontrado");

    await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    mostrarAlerta("Este animal ha sido borrado correctamente", "success");
  } catch (error) {
    mostrarAlerta("Hubo un problema al borrar el animal.");
  }
};
