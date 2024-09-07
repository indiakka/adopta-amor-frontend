import { useNavigate  } from 'react-router-dom';
import { PropTypes } from "prop-types";

const EditIcon = ({ id, name }) => {
    const navigate = useNavigate()
    const handleRedirect = () => {
		navigate(`/edit/${name}`, { state: { data: id} })
	}
  return (
    <button onClick={handleRedirect}><img src="/Assets/Edit-icon.svg" alt="Editar destino" /></button>
  )
}
EditIcon.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string
};

export default EditIcon
