import axios from "axios";

const url = "/pets";

export const recibirAnimales = async () => {
  try {

    const respuesta = await axios.get(url, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return respuesta.data;
  } catch (error) {
    alert("Hubo un problema al cargar la lista de animales.");
    return null; 
  }
};

export const recibirAnimal = async (id) => {
  try {
    const token = localStorage.getItem("authToken"); 
    if (!token) {
      throw new Error("Token no encontrado");
    }

    const respuesta = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    return respuesta.data;
  } catch (error) {
    alert("Hubo un problema al cargar la información del animal.");
    return null;
  }
};


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
    alert("Hubo un problema al actualizar el animal.");
    return null;
  }
};


export const eliminarAnimal = async (id) => {
  const conf = window.confirm(`¿Quieres realmente borrar este animal (${id})?`);
  if (!conf) {
    return alert("El animal NO ha sido borrado");
  }

  try {
    const token = localStorage.getItem("authToken"); 
    await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    alert("Este animal ha sido borrado correctamente");
  } catch (error) {
    alert("Hubo un problema al borrar el animal.");
  }
};
