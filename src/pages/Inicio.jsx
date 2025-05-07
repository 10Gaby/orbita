import ParticlesBackground from "../componentes/Particles";
import Carga from "../componentes/Carga";
import { useState, useEffect } from "react";

function Inicio() {
  const [carga, setCarga] = useState(true);
   // Efecto para cambiar el estado después de 2.5 segundos
   useEffect(() => {
    const timer = setTimeout(() => {
      setCarga(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`contenedor-general center`}>
    <Carga className={carga ? 'fixed' : 'hidden'} />

    <ParticlesBackground />
    <div className="brillo1 absolute" style={{top:"-15%", left:"-10%", "--ancho": "400px"}}></div>
    <div className="brillo1 absolute" style={{bottom:"30%", left:"50%", backgroundColor:"rgba(31, 139, 247, 0.25"}}></div>

      <section className={`inicio ${carga ? 'hidden' : 'relative'}`}>
        <div className="contenido-inicio relative">

          <div>
          <img src="/Pinguino.svg" alt="Pingüino" className="pinguino"/>
          <h1>ÓRBITA</h1>
          </div>
          <p>Bienvenid@ a la aventura.</p>

        </div>
      </section>

    </main>
  );
}

export default Inicio;