import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../components/filter/Filter";
import AnimalCard from "../components/card/AnimalCard";
import Pagination from "../components/pagination/Pagination";
import { recibirAnimales } from "../axios";

const Adoptar = () => {
  const [animals, setAnimals] = useState([]); 
  const [animalesFiltradosYMezclados, setAnimalesFiltradosYMezclados] =
    useState([]);
  const [criteriosFilter, setCriteriosFilter] = useState({
    tipo: [],
    tamano: [],
    edad: [],
  });
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 6;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const animals = await recibirAnimales();
        if (Array.isArray(animals)) {
          setAnimals(animals);
        } else {
          setAnimals([]); 
        }
      } catch (error) {
        setAnimals([]); 
      }
    };

    obtenerDatos();
  }, []);

  const manejarCambioFilter = (filterSeleccionado, valor) => {
    setCriteriosFilter((filterActual) => ({
      ...filterActual,
      [filterSeleccionado]: valor,
    }));
  };

  useEffect(() => {
    let animalesFiltrados = animals.filter((animal) => {
      if (
        criteriosFilter.tipo.length > 0 &&
        !criteriosFilter.tipo.includes(animal.tipo)
      ) {
        return false;
      }
      if (
        criteriosFilter.tamano.length > 0 &&
        !criteriosFilter.tamano.includes(animal.tamano)
      ) {
        return false;
      }
      if (criteriosFilter.edad.length > 0) {
        const edad = parseInt(animal.edad, 10); 
        if (isNaN(edad)) {
          return false;
        }
        if (criteriosFilter.edad.includes("Cachorrito")) {
          if (!(edad >= 0 && edad <= 1)) {
            return false;
          }
        }
        if (criteriosFilter.edad.includes("Adulto")) {
          if (!(edad > 1 && edad < 5)) {
            return false;
          }
        }
      }
      return true;
    });

    animalesFiltrados = mezclarAnimales(animalesFiltrados);

    setAnimalesFiltradosYMezclados(animalesFiltrados);
  }, [animals, criteriosFilter]);

  const mezclarAnimales = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []; 
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

  const manejarCambioPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const borrarFilters = () => {
    setCriteriosFilter({ tipo: [], tamano: [], edad: [] });
  };

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
      <Filter onClick={manejarCambioFilter} onClearFilters={borrarFilters} />
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
