import React from "react";
import "./pagination.css";

const Pagination = ({
  totalItems,
  itemsPorPagina,
  paginaActual,
  alCambiarPagina,
}) => {
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);

  const manejoCambioPagina = (page) => {
    alCambiarPagina(page);
  };

  const renderizarBoteonesPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPaginas; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => manejoCambioPagina(i)}
          className={paginaActual === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination">
      <button
        className="anterior"
        onClick={() => manejoCambioPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      {renderizarBoteonesPagination()}
      <button
        className="siguiente"
        onClick={() => manejoCambioPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
