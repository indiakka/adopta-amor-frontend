import { useState } from "react";
import React from "react";
import "./filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrash } from "@fortawesome/free-solid-svg-icons";

const Filter = ({ onClick, onClearFilters }) => {
  const [estaListaAnimalesAbierta, setEstaListaAnimalesAbierta] =
    useState(false);
  const [estaListaTamanosAbierta, setEstaListaTamanosAbierta] = useState(false);
  const [estaListaEdadesAbierta, setEstaListaEdadesAbierta] = useState(false);

  const [especieSeleccionada, setEspeciesSeleccionadas] = useState([]);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState([]);
  const [edadSeleccionada, setEdadSeleccionada] = useState([]);

  const alternarListaAnimales = () => {
    setEstaListaAnimalesAbierta(!estaListaAnimalesAbierta);
    setEstaListaTamanosAbierta(false);
    setEstaListaEdadesAbierta(false);
  };

  const alternarListaTamanos = () => {
    setEstaListaTamanosAbierta(!estaListaTamanosAbierta);
    setEstaListaAnimalesAbierta(false);
    setEstaListaEdadesAbierta(false);
  };

  const alternarListaEdades = () => {
    setEstaListaEdadesAbierta(!estaListaEdadesAbierta);
    setEstaListaAnimalesAbierta(false);
    setEstaListaTamanosAbierta(false);
  };

  const manejarClicAnimal = (tipo) => {
    setEspeciesSeleccionadas(tipo);
    onClick("tipo", [tipo]);
  };

  const manejarClicTamano = (tamano) => {
    setTamanoSeleccionado(tamano);
    onClick("tamano", [tamano]);
  };

  const manejarClicEdad = (edad) => {
    setEdadSeleccionada(edad);
    onClick("edad", [edad]);
  };

  const borrarFilters = () => {
    setEspeciesSeleccionadas([]);
    setTamanoSeleccionado([]);
    setEdadSeleccionada([]);
    if (typeof onClearFilters === "function") {
      onClearFilters();
    }
  };

  return (
    <div className="filter">
      <button
        className="campoFilter campoFilterRadioIzquierda"
        onClick={alternarListaAnimales}
      >
        Especies{" "}
        {especieSeleccionada && (
          <span className="opcionSeleccionada">{especieSeleccionada}</span>
        )}{" "}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaAnimalesAbierta ? (
          <ul className="listaFilter">
            <li
              className={`elementoListaFilter ${
                especieSeleccionada.includes("Perro") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicAnimal("Perro")}
            >
              Perros
            </li>
            <li
              className={`elementoListaFilter ${
                especieSeleccionada.includes("Gato") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicAnimal("Gato")}
            >
              Gatos
            </li>
          </ul>
        ) : null}
      </button>

      <button className="campoFilter" onClick={alternarListaTamanos}>
        Tamaño{" "}
        {tamanoSeleccionado && (
          <span className="opcionSeleccionada">{tamanoSeleccionado}</span>
        )}{" "}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaTamanosAbierta ? (
          <ul className="listaFilter">
            <li
              className={`elementoListaFilter ${
                tamanoSeleccionado.includes("Pequeño") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicTamano("Pequeño")}
            >
              Pequeño
            </li>
            <li
              className={`elementoListaFilter ${
                tamanoSeleccionado.includes("Mediano") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicTamano("Mediano")}
            >
              Mediano
            </li>
            <li
              className={`elementoListaFilter ${
                tamanoSeleccionado.includes("Grande") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicTamano("Grande")}
            >
              Grande
            </li>
          </ul>
        ) : null}
      </button>

      <button className="campoFilter" onClick={alternarListaEdades}>
        Edad{" "}
        {edadSeleccionada && (
          <span className="opcionSeleccionada">{edadSeleccionada}</span>
        )}{" "}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaEdadesAbierta ? (
          <ul className="listaFilter">
            <li
              className={`elementoListaFilter ${
                edadSeleccionada.includes("Cachorrito") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicEdad("Cachorrito")}
            >
              Cachorrito
            </li>
            <li
              className={`elementoListaFilter ${
                edadSeleccionada.includes("Adulto") ? "seleccionado" : ""
              }`}
              onClick={() => manejarClicEdad("Adulto")}
            >
              Adulto
            </li>
          </ul>
        ) : null}
      </button>
      <button
        className="campoFilter campoFilterRadioDerecha"
        onClick={borrarFilters}
      >
        Borrar filtros
        <FontAwesomeIcon className="iconsPapelera" icon={faTrash} />
      </button>
    </div>
  );
};

export default Filter;
