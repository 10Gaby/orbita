import ParticlesBackground from "../componentes/Particles";
import Carga from "../componentes/Carga";
import { useState, useEffect } from "react";
import Boton1 from "../componentes/Boton1";
import Boton2 from "../componentes/Boton2";
import { Link } from "react-router-dom";

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

    <div className="brillo1 absolute" style={{top:"-15%", left:"-10%", "--ancho": "400px"}}></div>
    <div className="brillo1 absolute" style={{bottom:"30%", left:"50%", backgroundColor:"rgba(31, 139, 247, 0.25"}}></div>

      <section className={`inicio ${carga ? 'hidden' : 'relative'}`}>
      <img src="/Ilustraciones/Planeta-1.svg" alt="" className="absolute ilus1"/>
      <img src="/Ilustraciones/Planeta-2.svg" alt="" className="absolute ilus2"/>

        <div className="contenido-inicio relative">

          <div>
          <img src="/Pinguino.svg" alt="Pingüino" className="pinguino"/>
          <h1>ÓRBITA</h1>
          </div>

          <Boton1 href="/login">Iniciar Sesión</Boton1> <br/>
          <Boton1 href="/registro">Registrarse</Boton1> <br/>

          <Link to="/historia">Continuar como invitado</Link>


        </div>
      </section>

    </main>
  );
}

export default Inicio;