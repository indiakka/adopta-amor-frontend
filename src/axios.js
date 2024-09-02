import axios from 'axios';

const url = 'http://localhost:3000/animales';

export const recibirAnimales = async () => {
  const respuesta = await axios.get(url);
  return respuesta.data;
};

export const recibirAnimal = async (id) => {
  const respuesta = await axios.get(`${url}/${id}`);
  return respuesta.data;
};

export const guardarAnimal = async (event, datos) => {
  await axios.post(url, datos);
  return;
};

export const actualizarAnimal = async (event, id, animalGuardado) => {
  const animalModificado = await axios.put(`${url}/${id}`, animalGuardado);
  return animalModificado.data;
};

export const eliminarAnimal = async (id) => {
  const conf = window.confirm(`¿Quieres realmente borrar este animal (${id})?`);
  if (!conf) {
    return alert('El animal NO ha sido borrado');
  }
  await axios.delete(`${url}/${id}`);
  alert('Este animal ha sido borrado correctamente');
};
