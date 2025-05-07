import ParticlesBackground from "../componentes/Particles";
import Carga from "../componentes/Carga";
import { useState } from "react";

function Inicio() {
  const [carga, setCarga] = useState(true);

  return (
    <>
    <Carga className={carga ? 'fixed' : 'hidden'} />

    <main className={`contenedor center  inicio ${carga ? 'hidden' : 'relative'}`}>
      <ParticlesBackground />
      <div className="brillo1 absolute" style={{top:"-15%", left:"-10%", "--ancho": "400px"}}></div>
      <div className="brillo1 absolute" style={{bottom:"30%", left:"50%", backgroundColor:"rgba(31, 139, 247, 0.25"}}></div>


      <div className="contenido-inicio relative">

        <div>
        <img src="/Pinguino.svg" alt="Pingüino" className="pinguino"/>
        <h1>ÓRBITA</h1>
        </div>
        <p>Bienvenid@ a la aventura.</p>

      </div>
    </main>
    </>
  );
}