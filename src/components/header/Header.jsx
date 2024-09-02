import './header.css';
import BotonAdopta from "./botonAdopta/BotonAdopta.jsx"
import BotonDona from "./botonDona/BotonDona.jsx"


const Header = () => {
  return (
    <>

    <div className='container-header'>
      <div className='botones-header'>
      <BotonAdopta />
      <BotonDona />
      </div>
    </div>

    </>

  )
}

export default Header