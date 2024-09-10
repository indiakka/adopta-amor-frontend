import axios from "axios";

const url = "/pets";

// Obtener todos los animales
export const recibirAnimales = async () => {
  try {

    const respuesta = await axios.get(url, {
      headers: {
        "Content-Type": "application/json", // Especificar que estamos enviando/recibiendo JSON
      },
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al recibir animales:", error);
    alert("Hubo un problema al cargar la lista de animales.");
    return null; // Retorna null o lanza el error si es necesario
  }
};

// Obtener un animal por ID
export const recibirAnimal = async (id) => {
  try {
    const token = localStorage.getItem("authToken"); // Obtener el token desde localStorage
    if (!token) {
      throw new Error("Token no encontrado");
    }

    const respuesta = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token de autorización en la solicitud
        "Content-Type": "application/json",
      },
    });
    return respuesta.data;
  } catch (error) {
    console.error(`Error al recibir el animal con ID ${id}:`, error);
    alert("Hubo un problema al cargar la información del animal.");
    return null;
  }
};


// Guardar un nuevo animal
export const guardarAnimal = async (datos) => {
  try {
    const token = localStorage.getItem("authToken");

    await axios.post(url, datos, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    alert("Animal guardado correctamente.");
  } catch (error) {
    alert("Hubo un problema al guardar el animal.");
  }
};




export const actualizarAnimal = async (id, animalGuardado) => {
  try {
    const token = localStorage.getItem("authToken"); 

    if (!animalGuardado || !animalGuardado.nombre || !animalGuardado.tipo) {
      alert("Faltan datos por completar");
      return null;
    }

    const respuesta = await axios.put(`${url}/${id}`, animalGuardado, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    
    alert("Animal actualizado correctamente.");
    return respuesta.data;
  } catch (error) {
    console.error(`Error al actualizar el animal con ID ${id}:`, error);
    alert("Hubo un problema al actualizar el animal.");
    return null;
  }
};


// Eliminar un animal por ID
export const eliminarAnimal = async (id) => {
  const conf = window.confirm(`¿Quieres realmente borrar este animal (${id})?`);
  if (!conf) {
    return alert("El animal NO ha sido borrado");
  }

  try {
    const token = localStorage.getItem("authToken"); // Obtener el token actualizado
    await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token de autorización
        "Content-Type": "application/json",
      },
    });
    alert("Este animal ha sido borrado correctamente");
  } catch (error) {
    console.error(`Error al borrar el animal con ID ${id}:`, error);
    alert("Hubo un problema al borrar el animal.");
  }
};
