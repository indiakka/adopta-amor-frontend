import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


const EditarInfo = () =>
{
    const { id } = useParams();
    const [ animalGuardado, setAnimalGuardado ] = useState( {} )
    const navigate = useNavigate()
    useEffect( () =>
    {
        const animalEditar = async () =>
        {
            const response = await axios.get( `http://localhost:3000/results/${id}` );
            setAnimalGuardado( response.data );
        };
        animalEditar();
    }, [] );

    const handleSubmit = async ( event ) =>
    {
        event.preventDefault()
        const animalModificado = await axios.put( `http://localhost:3000/results/${id}`, animalGuardado )
        setAnimalGuardado( animalModificado.data )
        alert( 'Datos modificados correctamente' )
        navigate( '/adoptar' )
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit} className="form">
                <p><b>Seleccione el tipo de animal: </b></p>
                <div className="form--tipo">
                    <label>
                        <input value="Perro" checked={animalGuardado.tipo === "Perro"} type="radio" id="Perro" name="tipo" onChange={( event ) => setAnimalGuardado( { ...animalGuardado, tipo: event.target.value } )} />Perro
                    </label>
                    <label>
                        <input value="Gato" checked={animalGuardado.tipo === "Gato"} type="radio" id="Gato" name="tipo" onChange={( event ) => setAnimalGuardado( { ...animalGuardado, tipo: event.target.value } )} />Gato
                    </label>
                </div>
                <div className="form--inputs--container">
                    <div className="form--inputs--divs">
                        <div>
                            <input value={animalGuardado.nombre} type="text" placeholder='Nombre' onChange={( event ) => setAnimalGuardado( { ...animalGuardado, nombre: event.target.value } )} />
                        </div>
                        <div>
                            <input value={animalGuardado.raza} type="text" placeholder='Raza' onChange={( event ) => setAnimalGuardado( { ...animalGuardado, raza: event.target.value } )} />
                        </div>
                        <div>
                            <input value={animalGuardado.años} type="number" placeholder="Años" onChange={( event ) => setAnimalGuardado( { ...animalGuardado, años: event.target.value } )} />
                        </div>
                    </div>
                    <div className="form--inputs--divs">
                        <div>
                            <input value={animalGuardado.imagen} type="text" placeholder='Enlace de la foto' onChange={( event ) => setAnimalGuardado( { ...animalGuardado, imagen: event.target.value } )} />
                        </div>
                        <div>
                            <select value={animalGuardado.tamaño} name="tamaño" id="tamaño" onChange={( event ) => setAnimalGuardado( { ...animalGuardado, tamaño: event.target.value } )}>
                                <option value="grande" className="select--option">Grande</option>
                                <option value="mediano" className="select--option">Mediano</option>
                                <option value="pequeño" className="select--option">Pequeño</option>
                            </select>
                        </div>
                        <div>
                            <input value={animalGuardado.cuidadosEspeciales} type="text" placeholder='Cuidados del animal' onChange={( event ) => setAnimalGuardado( { ...animalGuardado, cuidadosEspeciales: event.target.value } )} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="button-adopta">Actualizar datos</button>
            </form>
        </div>
    );

}


export default EditarInfo;