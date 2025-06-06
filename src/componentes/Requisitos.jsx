import '../css/requisitos.css';
import { useState } from 'react';

function Requisitos({ título, descripción, img1, img2, invertir = false, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="requisitos m-b-10" onClick={() => setIsOpen(!isOpen)}>
      {/* Vista cerrada */}
      <div className={`vista ${!isOpen ? 'activa' : 'inactiva'} ${invertir ? 'inversa' : ''}`}>
        <div className="contenido-imagen">
          <img src={img1} alt={título} />
        </div>
        <div className="contenido-texto">
          <h4 className="color-gradient">{título}</h4>
        </div>
      </div>

      {/* Vista abierta */}
      <div className={`vista ${isOpen ? 'activa' : 'inactiva'} ${invertir ? 'inversa' : ''}`}>
        <div className="contenido-imagen">
          <img src={img2} alt={título} />
        </div>
        <div className="contenido-texto">
          <h4 className="color-gradient">{título}</h4>
          <p>{children}</p>
        </div>
      </div>
    </section>
  );
}

export default Requisitos;
