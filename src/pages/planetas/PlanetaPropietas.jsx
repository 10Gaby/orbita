import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
  } from 'framer-motion';
import video from "../../assets/Aterrizaje Propietas.mp4";
import PopUp from "../../componentes/PopUp";
import Header from "../../componentes/Header";
import { Link, useNavigate } from "react-router-dom";
import Boton1 from '../../componentes/Boton1';

import PreguntasContractus from "../../componentes/PreguntasContractus";

function PlanetaPropietas() {
    const [carga, setCarga] = useState(true);

   // Efecto para cambiar el estado después de 2.5 segundos
   useEffect(() => {
    const timer = setTimeout(() => {
      setCarga(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const [popups, setPopups] = useState({
    popup1: false,
    popup3: false,
  });

  const togglePopup = (popupName) => {
    setPopups(prev => ({ ...prev, [popupName]: !prev[popupName] }));
  };


    const planeta = useRef(null);
    const sección1 = useRef(null);
    const [isFixedPinguino, setIsFixedPinguino] = useState(false);

  // Efecto animar con el scroll
  const { scrollYProgress: scrollYProgressPlaneta } = useScroll({ target: planeta });
    const { scrollYProgress: scrollYProgressSeccion } = useScroll({ target: sección1 });

    const opacidadPenguin1 = useTransform(scrollYProgressSeccion, [0, 0.2, 0.3, 0.4], ['0', '1', '1', '0']);
    const opacidadPenguin2 = useTransform(scrollYProgressSeccion, [0.3, 0.4], ['0', '1']);
    const opacidadOpciones = useTransform(scrollYProgressSeccion, [0.5, 0.6], ['0', '1']);

    useMotionValueEvent(scrollYProgressSeccion, 'change', (last) => {
      console.log('Scroll', last);

      if (last >= 0.5 && last <= 0.55) {
        // Aquí puedes agregar la lógica que desees cuando el scroll esté en ese rango
        console.log('Scroll en rango 0.5 a 0.55');
      }

      if (last > 0 && last < 1) {
                setIsFixedPinguino(true);
        } else {
            setIsFixedPinguino(false);
        }
    });

  return (
    <main className='planeta-propietas'>
        <section className={carga ? 'fixed' : 'hidden'}>
            <video autoPlay loop muted style={{ width: '100vw', height: '100dvh', objectFit: 'cover' }}>
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>
        </section>

        <motion.section className={carga ? 'hidden' : 'initial planeta-contractus center'} ref={planeta}>
            <Header enlace="/planetas" textoEnlace="Ver Planetas"/>
            <div className="portada center">
                <h2>Planeta Propietas</h2>
                <img src="/Planetas/Planeta Propietas.svg" alt="" className="img-planeta" />
            </div>

            <section className="padding">

                <h2 className="text-center color-gradient">Propiedad Intelectual</h2>
                <div className="grid-2 center" style={{gap:"5%"}}>
                    <div className="center">
                        <img src="/Ilustraciones/Propiedad Intelectual.svg" alt="Contrato Escrito" className="image" />
                    </div>
                    <div>
                       <p>De acuerdo a la Organización Mundial de Propiedad Intelectual (OMPI), la propiedad intelectual (IP):</p>
                       <br/>
                       <p><b>"Se relaciona con las creaciones de la mente, como las invenciones, las obras literarias y artísticas, y los símbolos, nombres e imágenes utilizados en el comercio".</b></p>
                    </div>
                </div>


            </section>

            <motion.div ref={sección1} className="seccion1 relative">
                <motion.img src="/Ilustraciones/Pinguino Propietas.svg" alt="" 
                className='ilustracion'
                style={{
                    opacity: opacidadPenguin1,
                    position: isFixedPinguino ? 'fixed' : 'absolute',
                }}
                />
                <motion.img src="/Ilustraciones/Pinguino Propietas 2.svg" alt="" 
                className='ilustracion'
                style={{
                    opacity: opacidadPenguin2,
                    position: isFixedPinguino ? 'fixed' : 'absolute',
                }}
                />

                <motion.div className='opciones'
                style={{
                    opacity: opacidadOpciones,
                    position: isFixedPinguino ? 'fixed' : 'absolute',
                }}
                >
                    {/* Botón 1 */}
                    <motion.button className="btn b1" onClick={() => togglePopup('popup1')}>
                        <img src="/Iconos/Propiedad Industrial.svg" alt="" />
                    </motion.button>

                    <PopUp
                        isOpen={popups.popup1}
                        onClose={() => togglePopup('popup1')}
                        title="Propiedad Industrial"
                        image={"/Ilustraciones/Propiedad Industrial.webp"}
                    >
                        <p>La propiedad industrial protege:</p>
                        <ul>
                            <li>Patentes (invenciones, como una nueva máquina)</li>
                            <li>Marcas: logos y nombres comerciales.</li>
                            <li>Diseños industriales (aspecto visual de un producto)</li>
                            <li>Secretos industriales (recetas, fórmulas, etc.)</li>
                        </ul>
                        <p>En Colombia, la Superintendencia de Industria y Comercio (SIC) es la entidad que registra y administra estos derechos.</p>
                        <br/><b>Si diseñas un logo o una imagen de marca para un cliente, ese logo puede registrarse como marca para evitar copias o plagio.</b>
                    </PopUp>


                    {/* Botón 2 */}

                    <motion.button className="btn b2">
                        <img src="/Iconos/Derechos De Autor.svg" alt="" />
                    </motion.button>


                    {/* Botón 3 */}
                    
                    <motion.button className="btn b3" onClick={() => togglePopup('popup3')}>
                        <img src="/Iconos/Registro de obras.svg" alt="" />
                    </motion.button>

                    <PopUp
                        isOpen={popups.popup3}
                        onClose={() => togglePopup('popup3')}
                        title="Registro de obras"
                        image={"/Ilustraciones/Registro Obras.webp"}
                    >
                        <p>Puedes registrar cualquier obra original como:</p>
                        <ul>
                            <li>Obras literarias.</li>
                            <li>Obras artísticas.</li>
                            <li>Obras musicales.</li>
                            <li>Obras audiovisuales.</li>
                            <li>Software.</li>
                            <li>Actos y contratos.</li>
                            <li>Fonogramas.</li>
                        </ul>
                        <p>Puedes hacer el registro en línea a tráves del siguiente link: https://registroenlinea.gov.co/portal.aspx</p>
                        <Boton1 href="https://registroenlinea.gov.co/portal.aspx" target="_blank">Registrar Obra</Boton1>
                    </PopUp>
                    
                </motion.div>
            </motion.div>

            <PreguntasContractus />

        </motion.section>
    </main>
  );
}

export default PlanetaPropietas;