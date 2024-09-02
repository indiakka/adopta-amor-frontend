import { useState } from 'react';
import './Filtro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons';

const Filtro = ({ onClick, onClearFilters }) => {
  const [estaListaAnimalesAbierta, setEstaListaAnimalesAbierta] = useState(false);
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
    console.log('Especie seleccionada:', tipo);
    setEspeciesSeleccionadas(tipo);
    onClick('tipo', [tipo]);
  };

  const manejarClicTamano = (tamano) => {
    console.log('Tamaño seleccionado:', tamano);
    setTamanoSeleccionado(tamano);
    onClick('tamano', [tamano]);
  };

  const manejarClicEdad = (edad) => {
    console.log('Edad seleccionada:', edad);
    setEdadSeleccionada(edad);
    onClick('edad', [edad]);
  };

  const borrarFiltros = () => {
    setEspeciesSeleccionadas([]);
    setTamanoSeleccionado([]);
    setEdadSeleccionada([]);
    if (typeof onClearFilters === 'function') {
      onClearFilters();
    }
  };

  return (
    <div className="filtro">
      {/* Filtro de animales */}
      <button className="campoFiltro campoFiltroRadioIzquierda" onClick={alternarListaAnimales}>
        Especies {especieSeleccionada && <span className="opcionSeleccionada">{especieSeleccionada}</span>}{' '}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaAnimalesAbierta ? (
          <ul className="listaFiltro">
            <li
              className={`elementoListaFiltro ${especieSeleccionada.includes('Perro') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicAnimal('Perro')}
            >
              Perros
            </li>
            <li
              className={`elementoListaFiltro ${especieSeleccionada.includes('Gato') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicAnimal('Gato')}
            >
              Gatos
            </li>
          </ul>
        ) : null}
      </button>

      {/* Filtro de tamaño */}
      <button className="campoFiltro" onClick={alternarListaTamanos}>
        Tamaño {tamanoSeleccionado && <span className="opcionSeleccionada">{tamanoSeleccionado}</span>}{' '}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaTamanosAbierta ? (
          <ul className="listaFiltro">
            <li
              className={`elementoListaFiltro ${tamanoSeleccionado.includes('Pequeño') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicTamano('Pequeño')}
            >
              Pequeño
            </li>
            <li
              className={`elementoListaFiltro ${tamanoSeleccionado.includes('Mediano') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicTamano('Mediano')}
            >
              Mediano
            </li>
            <li
              className={`elementoListaFiltro ${tamanoSeleccionado.includes('Grande') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicTamano('Grande')}
            >
              Grande
            </li>
          </ul>
        ) : null}
      </button>

      {/* Filtro de edad */}
      <button className="campoFiltro" onClick={alternarListaEdades}>
        Edad {edadSeleccionada && <span className="opcionSeleccionada">{edadSeleccionada}</span>}{' '}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaEdadesAbierta ? (
          <ul className="listaFiltro">
            <li
              className={`elementoListaFiltro ${edadSeleccionada.includes('Cachorrito') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicEdad('Cachorrito')}
            >
              Cachorrito
            </li>
            <li
              className={`elementoListaFiltro ${edadSeleccionada.includes('Adulto') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicEdad('Adulto')}
            >
              Adulto
            </li>
          </ul>
        ) : null}
      </button>
      {/* Borrar filtros */}
      <button className="campoFiltro campoFiltroRadioDerecha" onClick={borrarFiltros}>
        Borrar filtros <FontAwesomeIcon className="iconoPapelera" icon={faTrash} />
      </button>
    </div>
  );
};

export default Filtro;
