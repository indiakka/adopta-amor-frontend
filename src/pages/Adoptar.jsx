import React, { useEffect, useState } from "react";
import axios from "axios";
import Filtro from "../components/filtro/Filtro";
import AnimalCard from "../components/card/AnimalCard";
import Pagination from "../components/pagination/Pagination";
import { recibirAnimales } from "../axios";

const Adoptar = () => {
  const [animals, setAnimals] = useState([]); // Inicializar como array vacío
  const [animalesFiltradosYMezclados, setAnimalesFiltradosYMezclados] =
    useState([]);
  const [criteriosFiltro, setCriteriosFiltro] = useState({
    tipo: [],
    tamano: [],
    edad: [],
  });
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 6;

  // Obtener datos de animales
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const animals = await recibirAnimales();
        if (Array.isArray(animals)) {
          setAnimals(animals);
        } else {
          console.error("La respuesta no es un array:", animals);
          setAnimals([]); // Asignar un array vacío si la respuesta no es válida
        }
      } catch (error) {
        console.error("Error al obtener datos: ", error);
        setAnimals([]); // En caso de error, asignar un array vacío
      }
    };

    obtenerDatos();
  }, []);

  // Manejar los cambios en los filtros
  const manejarCambioFiltro = (filtroSeleccionado, valor) => {
    setCriteriosFiltro((filtroActual) => ({
      ...filtroActual,
      [filtroSeleccionado]: valor,
    }));
  };

  // Aplicar los filtros a los animales
  useEffect(() => {
    let animalesFiltrados = animals.filter((animal) => {
      if (
        criteriosFiltro.tipo.length > 0 &&
        !criteriosFiltro.tipo.includes(animal.tipo)
      ) {
        return false;
      }
      if (
        criteriosFiltro.tamano.length > 0 &&
        !criteriosFiltro.tamano.includes(animal.tamano)
      ) {
        return false;
      }
      if (criteriosFiltro.edad.length > 0) {
        const edad = parseInt(animal.edad, 10); // Convertir la edad a número
        if (isNaN(edad)) {
          return false; // Si la edad no es un número, excluir al animal
        }
        if (criteriosFiltro.edad.includes("Cachorrito")) {
          if (!(edad >= 0 && edad <= 1)) {
            return false;
          }
        }
        if (criteriosFiltro.edad.includes("Adulto")) {
          if (!(edad > 1 && edad < 5)) {
            return false;
          }
        }
      }
      return true;
    });

    animalesFiltrados = mezclarAnimales(animalesFiltrados);

    setAnimalesFiltradosYMezclados(animalesFiltrados);
  }, [animals, criteriosFiltro]);

  // Función para mezclar animales filtrados
  const mezclarAnimales = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []; // Devolver un array vacío si no hay elementos
    }

    let indiceActual = array.length;
    let valorTemporal, indiceAleatorio;

    while (indiceActual !== 0) {
      indiceAleatorio = Math.floor(Math.random() * indiceActual);
      indiceActual -= 1;

      valorTemporal = array[indiceActual];
      array[indiceActual] = array[indiceAleatorio];
      array[indiceAleatorio] = valorTemporal;
    }

    return array;
  };

  // Función para manejar el cambio de página
  const manejarCambioPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // Función para borrar los filtros
  const borrarFiltros = () => {
    setCriteriosFiltro({ tipo: [], tamano: [], edad: [] });
  };

  // Calcular los elementos de la página actual
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const elementosActuales =
    Array.isArray(animalesFiltradosYMezclados) &&
    animalesFiltradosYMezclados.length > 0
      ? animalesFiltradosYMezclados.slice(
          indicePrimerElemento,
          indiceUltimoElemento
        )
      : [];

  return (
    <>
      <Filtro onClick={manejarCambioFiltro} onClearFilters={borrarFiltros} />
      <div className="cards">
        {elementosActuales.length > 0 ? (
          elementosActuales.map((animal) => (
            <AnimalCard
              alEliminar={async () => setAnimals(await recibirAnimales())}
              key={animal.id}
              animal={animal}
            />
          ))
        ) : (
          <p>No hay animales disponibles</p>
        )}
      </div>
      {animalesFiltradosYMezclados.length > 0 && (
        <div className="pagination">
          <Pagination
            totalItems={animalesFiltradosYMezclados.length}
            itemsPorPagina={elementosPorPagina}
            paginaActual={paginaActual}
            alCambiarPagina={manejarCambioPagina}
          />
        </div>
      )}
    </>
  );
};

export default Adoptar;
