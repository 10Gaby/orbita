import React from 'react';
import '../css/boton.css'; // Asegúrate de que la ruta sea correcta

const Boton1 = ({ href, children, className = '', ...props }) => {
    return (
      <a href={href} className={`styled-link ${className}`} {...props}>
        {children || 'Clic Aquí'} {/* Valor por defecto si no hay children */}
        
        {/* Elementos decorativos */}
        <div className="clip">
          <div className="corner left-top"></div>
          <div className="corner right-bottom"></div>
          <div className="corner right-top"></div>
          <div className="corner left-bottom"></div>
        </div>
        <span className="arrow right-arrow"></span>
        <span className="arrow left-arrow"></span>
      </a>
    );
  };
  
  export default Boton1;