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

import PreguntasContractus from "../../componentes/PreguntasContractus";

function PlanetaPropietas() {
    const [carga, setCarga] = useState(true);

    const planeta = useRef(null);
   // Efecto para cambiar el estado después de 2.5 segundos
   useEffect(() => {
    const timer = setTimeout(() => {
      setCarga(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const [popups, setPopups] = useState({
    popup1: false,
    popup2: false,
    popup3: false,
    popup4: false,
  });

  const togglePopup = (popupName) => {
    setPopups(prev => ({ ...prev, [popupName]: !prev[popupName] }));
  };


  // Efecto animar con el scroll
  const { scrollYProgress: scrollYProgressPlaneta } = useScroll({ target: planeta });

  return (
    <main>
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

                <div className="tipos-contrato">
                    <h3 className="text-center color-gradient">Tipos de contrato</h3>
                    <br/><br/>

                    <div className="grid-4" style={{gap:"5%"}}>
                    <button onClick={() => togglePopup('popup1')} className="btn-contrato" style={{"--rotate": "-6deg", "--translateY": "20px"}}>
                            <img src="/Ilustraciones/Contrato-fijo.webp"/>
                            <h4 className="desc">Contrato a término fijo</h4>
                        </button>

                        <button onClick={() => togglePopup('popup2')} className="btn-contrato">
                            <img src="/Ilustraciones/Contrato-indefinido.webp"/>
                            <h4 className="desc">Contrato a término indefinido</h4>
                        </button>

                        <button onClick={() => togglePopup('popup3')} className="btn-contrato">
                            <img src="/Ilustraciones/Contrato-ocasional.webp"/>
                            <h4 className="desc">Contrato ocasional, accidental o transitorio</h4>
                        </button>

                        <button onClick={() => togglePopup('popup4')} className="btn-contrato" style={{"--rotate": "6deg", "--translateY": "20px"}}>
                            <img src="/Ilustraciones/Contrato-obra-labor.webp"/>
                            <h4 className="desc">Contrato de obra o labor</h4>
                        </button>
                    </div>


                    <PopUp
                        isOpen={popups.popup1}
                        onClose={() => togglePopup('popup1')}
                        title="Contrato a término fijo"
                        image={"/Ilustraciones/Contrato-fijo.webp"}
                    >
                        <p>Es un acuerdo que tiene una <b>fecha de finalización ya establecida</b> desde el inicio.<br/></p>
                        <ul>
                            <li>Debe hacerse por escrito.</li>
                            <li>Puede durar hasta 3 años, pero se puede renovar las veces que sea necesario.</li>
                            <li>Puede renovarse automáticamente si se cumplen ciertas condiciones legales.</li>
                        </ul>
                    </PopUp>

                    <PopUp
                        isOpen={popups.popup2}
                        onClose={() => togglePopup('popup2')}
                        title="Contrato a término indefinido"
                        image={"/Ilustraciones/Contrato-indefinido.webp"}
                    >
                        <p>Este acuerdo no tiene una fecha de finalización establecida.</p>
                            <ul>
                                <li>No se renueva, porque dura hasta que <b>una de las partes decida terminarlo.</b></li>
                                <li>Puede continuar por <b>tiempo indefinido,</b> siempre que ambas partes estén de acuerdo.</li>
                            </ul>
                    </PopUp>

                    <PopUp
                        isOpen={popups.popup3}
                        onClose={() => togglePopup('popup3')}
                        title="Contrato ocasional, accidental o transitorio"
                        image={"/Ilustraciones/Contrato-ocasional.webp"}
                    >
                        <p>Este es un contrato a <b>término fijo,</b> pero se usa para cubrir una <b>necesidad temporal o puntual</b> en la empresa.
                            Por ejemplo:</p>
                            <ul>
                                <li>Reemplazar a alguien por un período de tiempo.</li>
                                <li>Apoyar tareas específicas.</li>
                            </ul>
                            <p>Es ideal para trabajos <b>transitorios o accidentales,</b> que tienen una duración limitada.</p>
                    </PopUp>

                    <PopUp
                        isOpen={popups.popup4}
                        onClose={() => togglePopup('popup4')}
                        title="Contrato de obra o labor"
                        image={"/Ilustraciones/Contrato-obra-labor.webp"}
                    >
                        <p>Este contrato <b>dura hasta que se termine una tarea específica.</b></p>
                            <ul>
                                <li>No tiene una fecha exacta de finalización, porque depende del tiempo que tome completar la obra o labor contratada.</li>
                                <li>Por ejemplo, puede ser hasta que se termine una construcción o un proyecto puntual.</li>
                            </ul>
                    </PopUp>
                </div>

            </section>

            <motion.div>

            </motion.div>

            <PreguntasContractus />

        </motion.section>
    </main>
  );
}

export default PlanetaPropietas;