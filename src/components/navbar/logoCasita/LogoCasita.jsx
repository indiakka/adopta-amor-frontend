import { useState } from 'react';
import './logoCasita.css';

const LogoCasita = () => {
  const [activo, setActivo] = useState(false);
  const [contadorAnimales, setContadorAnimales] = useState(0);

  return (
    <>
      <div className="contenedor-logo">
        <div className="contenedor-logo-casita" onClick={() => setActivo(!activo)}>
          <svg className="casita" width="95" height="96" fill="none" viewBox="0 0 95 96">
            <path
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M65.8 69.6l-.1-.5-.4-.9-.2-.6-.6-1.1-.8-1.1-1.1-1-1.3-1.1-1.1-1-1-1.1-.8-1.2-.8-1.1-.8-1.6-.5-1-.6-1.2-.8-1.3-.9-1.2-.6-.6-.6-.5-.9-.6-1-.5-1.3-.4-1.2-.2H47l-1.2.2-1.9.6-1.8 1.3L41 53l-.7 1.2-.8 1.2-.9 2-.9 1.7-1 1.3-1.2 1.6-3.6 3.3-.4.3-.8 1.2-.7 1.3-.4 1.7-.2 1.5v1.6l.1 1.2.5 1.5.7 1.5.8 1 1 1 1.4.9 1.5.7 1.2.3h1.8l1.7-.4 1-.5.5-.3 1-.6.9-.5.9-.5.9-.4.7-.3.8-.3h.9l1.1.1.7.2 1.3.6 1.6.8 1.3.8 1.1.7 1.2.5 1.1.2.9.1.8-.1 1.2-.3 1.6-.7 1.1-.8 1.2-1.2.8-1.1.7-1.5.5-1.4.2-1.3v-1.2l-.1-.8-.2-1.2zM61.424 40.312c.5-4.723-1.767-8.835-5.063-9.184-3.295-.348-6.372 3.198-6.871 7.922-.5 4.723 1.767 8.835 5.062 9.184 3.295.348 6.372-3.198 6.872-7.922zM40.903 48.153c3.295-.349 5.562-4.46 5.062-9.184-.5-4.724-3.576-8.27-6.872-7.922-3.295.35-5.562 4.46-5.062 9.184.5 4.724 3.576 8.27 6.872 7.922zM72.39 54.18c1.02-4.583-.774-8.882-4.008-9.602-3.235-.72-6.684 2.41-7.705 6.992-1.02 4.583.774 8.881 4.009 9.602 3.234.72 6.684-2.41 7.704-6.993zM30.644 61.21c3.234-.721 5.029-5.02 4.008-9.602-1.02-4.582-4.47-7.713-7.704-6.992-3.235.72-5.03 5.019-4.009 9.6 1.02 4.583 4.47 7.714 7.705 6.993z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M2 47.7L47.7 2l45.7 45.7H82.2v46.2H12.9V47.7H2z"
            ></path>
          </svg>
          <div className="contador">
            <span className="contador-animales">{contadorAnimales}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoCasita;
