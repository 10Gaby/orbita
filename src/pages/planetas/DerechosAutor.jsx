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

function DerechosAutor() {
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

        </motion.section>
    </main>
  );
}

export default DerechosAutor;