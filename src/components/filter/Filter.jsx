import { useState } from "react";
import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrash } from "@fortawesome/free-solid-svg-icons";

const Filter = ( { onClick } ) =>
{
    const [ isAnimalListOpen, setAnimalListOpen ] = useState( false );
    const [ isTamanoListOpen, setTamanoListOpen ] = useState( false );
    const [ isEdadListOpen, setEdadListOpen ] = useState( false );

    // State for selected filters
    const [ selectedAnimal, setSelectedAnimal ] = useState( null );
    const [ selectedTamano, setSelectedTamano ] = useState( null );
    const [ selectedEdad, setSelectedEdad ] = useState( null );

    const toggleAnimal = () =>
    {
        setAnimalListOpen( !isAnimalListOpen );
        setTamanoListOpen( false );
        setEdadListOpen( false );
    };

    const toggleTamano = () =>
    {
        setTamanoListOpen( !isTamanoListOpen );
        setAnimalListOpen( false );
        setEdadListOpen( false );
    };

    const toggleEdad = () =>
    {
        setEdadListOpen( !isEdadListOpen );
        setAnimalListOpen( false );
        setTamanoListOpen( false );
    };

    const handleAnimalClick = ( tipo ) =>
    {
        console.log( "Selected Animal:", tipo );
        setSelectedAnimal( tipo );
        onClick( "tipo", tipo );
    };

    const handleTamanoClick = ( tamano ) =>
    {
        console.log( "Selected Tamano:", tamano );
        setSelectedTamano( tamano );
        onClick( "tamano", tamano );
    };

    const handleEdadClick = ( edad ) =>
    {
        console.log( "Selected Edad:", edad );
        setSelectedEdad( edad );
        onClick( "edad", edad );
    };

    const clearFilters = () =>
    {
        setSelectedAnimal( null );
        setSelectedTamano( null );
        setSelectedEdad( null );
        onClick( "" );
    };

    return (
        <div className="filter">
            {/* Animal filter */}
            <button className="filterField filterFieldRadiusLeft" onClick={toggleAnimal}>
                Animales {selectedAnimal && <span className="selected-option">{selectedAnimal}</span>} <FontAwesomeIcon icon={faCaretDown} />
                {isAnimalListOpen ? (
                    <ul className="filter-ul">
                        <li className={`filter-li ${selectedAnimal === "Perro" ? "selected" : ""}`} onClick={() => handleAnimalClick( "Perro" )}>
                            Perros
                        </li>
                        <li className={`filter-li ${selectedAnimal === "Gato" ? "selected" : ""}`} onClick={() => handleAnimalClick( "Gato" )}>
                            Gatos
                        </li>
                    </ul>
                ) : null}
            </button>

            {/* Tamaño filter */}
            <button className="filterField" onClick={toggleTamano}>
                Tamaño {selectedTamano && <span className="selected-option">{selectedTamano}</span>} <FontAwesomeIcon icon={faCaretDown} />
                {isTamanoListOpen ? (
                    <ul className="filter-ul">
                        <li className={`filter-li ${selectedTamano === "Pequeño" ? "selected" : ""}`} onClick={() => handleTamanoClick( "Pequeño" )}>
                            Pequeño
                        </li>
                        <li className={`filter-li ${selectedTamano === "Mediano" ? "selected" : ""}`} onClick={() => handleTamanoClick( "Mediano" )}>
                            Mediano
                        </li>
                        <li className={`filter-li ${selectedTamano === "Grande" ? "selected" : ""}`} onClick={() => handleTamanoClick( "Grande" )}>
                            Grande
                        </li>
                    </ul>
                ) : null}
            </button>

            {/* Edad filter */}
            <button className="filterField" onClick={toggleEdad}>
                Edad {selectedEdad && <span className="selected-option">{selectedEdad}</span>} <FontAwesomeIcon icon={faCaretDown} />
                {isEdadListOpen ? (
                    <ul className="filter-ul">
                        <li className={`filter-li ${selectedEdad === "Cachorrito" ? "selected" : ""}`} onClick={() => handleEdadClick( "Cachorrito" )}>
                            Cachorrito
                        </li>
                        <li className={`filter-li ${selectedEdad === "Adulto" ? "selected" : ""}`} onClick={() => handleEdadClick( "Adulto" )}>
                            Adulto
                        </li>
                    </ul>
                ) : null}
            </button>
            {/* Delete Filter */}
            <button className="filterField filterFieldRadiusRight" onClick={clearFilters}>
                Borrar filtros <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default Filter;