import Formulario from "../../components/formulario/Formulario"
import "./donar.css";

const Donar = () => {

  return (
    <div>
      <div className="donarContainer">
      <h1>Dona un animal</h1>
      <p>¿Conoces un animal que necesita un nuevo hogar?</p>
      </div>
      <Formulario />
    </div>
  )
}

export default Donar