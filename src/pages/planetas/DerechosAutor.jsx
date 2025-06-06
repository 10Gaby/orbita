import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
  } from 'framer-motion';

import PopUp from "../../componentes/PopUp";
import Header from "../../componentes/Header";
import { Link, useNavigate } from "react-router-dom";
import Boton1 from '../../componentes/Boton1';

import '../../css/DerechosAutor.css';

import Requisitos from '../../componentes/Requisitos';

function DerechosAutor() {

  const [popups, setPopups] = useState({
    popup1: false,
    popup2: false,
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
    <main className='derechos-autor'>

      <Header enlace="/planeta-propietas" textoEnlace="Regresar"/>

      <div className="portada center">
                <h2>Derechos de Autor</h2>
        </div>

        <section className="padding">
                <div className="grid-2 center m-b-10" style={{gap:"5%"}}>
                    <div>
                      <h4 className="color-gradient">¿Qué protege los derechos de autor?</h4>
                      <p>Según la Decisión Andina 351 de 1991, los derechos de autor protegen obras como:</p>
                    </div>
                    <div className='center'>
                      <img src="/Ilustraciones/Protección Creaciones.svg" alt="" />
                    </div>
                </div>

                <div className="grid-2 center m-b-10" style={{gap:"5%"}}>
                    <div className='center'>
                      <img src="/Ilustraciones/Aplicación Protección.svg" alt="" />
                    </div>
                    <div>
                      <h4 className="color-gradient">¿Quién está protegido?</h4>
                      <p><b>El autor es el titular original de los derechos morales y patrimoniales reconocidos por la ley.</b>
                      <br/><br/>- Solo las personas naturales pueden ser consideradas autores, ya que deben haber concebido y expresado la obra de forma intelectual y creativa.
                      <br/><br/>- También se reconoce como coautores a quienes hayan participado directamente en ese proceso creativo. No se considera autor a quien solo haya aportado ideas generales o contribuido de forma mecánica o sin creatividad.
                      </p>
                    </div>
                </div>

                <h3 className="text-center color-gradient">Requisitos clave para que tu obra esté protegida</h3>
                <p className='text-center m-b-10'>Clic en las ilustraciones para ver más información</p>

                <Requisitos
                  título={" Protección a la forma, no a las ideas"}
                  img1={"/Ilustraciones/Ideas 1.svg"}
                  img2={"/Ilustraciones/Ideas 2.svg"}
                >
                  <p>Los derechos de autor protegen la forma en que expresas tus ideas, no las ideas en sí. Por ejemplo: un concepto de campaña no se protege, pero sí el afiche, ilustración o animación que lo materializa.</p>
                </Requisitos>

                <Requisitos
                  título={"Originalidad"}
                  img1={"/Ilustraciones/Originalidad 1.svg"}
                  img2={"/Ilustraciones/Originalidad 2.svg"}
                  invertir={true}
                >
                  <p>Una obra debe ser original, lo cual implica dos cosas:</p>
                  <ul>
                    <li>Originalidad objetiva: no puede ser una copia directa.</li>
                    <li>Originalidad subjetiva: debe reflejar tu estilo personal, tu sello como autor. Cada creador tiene una forma única de expresarse, y eso es lo que se protege.</li>
                    <li></li>
                  </ul>
                </Requisitos>

                <Requisitos
                  título={"Independencia del mérito"}
                  img1={"/Ilustraciones/Mérito 1.svg"}
                  img2={"/Ilustraciones/Mérito 2.svg"}
                >
                  <p>Tu obra está protegida sin importar si es famosa, sencilla, polémica o de “bajo valor cultural”. La ley protege la expresión original, no su éxito, calidad o intención.</p>
                </Requisitos>


                <Requisitos
                  título={"Soporte material"}
                  img1={"/Ilustraciones/Soporte 1.svg"}
                  img2={"/Ilustraciones/Soporte 2.svg"}
                  invertir={true}
                >
                  <p>La obra debe existir en algún medio tangible o perceptible: papel, digital, video, audio, etc. Aunque hay excepciones (como discursos hablados), se recomienda dejar registro físico o digital.
                      <br/><br/><b>Importante:</b> no se protege el objeto (como un pendrive o impreso), sino el contenido expresado en él.
                  </p>
                </Requisitos>


                <Requisitos
                  título={"Ausencia de formalidades"}
                  img1={"/Ilustraciones/Formalidades 1.svg"}
                  img2={"/Ilustraciones/Formalidades 2.svg"}
                >
                  <p>No necesitas registrar tu obra para que esté protegida. La protección nace desde el momento en que la creas. Sin embargo, registrarla te da respaldo legal y facilita defender tus derechos ante una copia o uso indebido.</p>
                </Requisitos>


                <h3 className="text-center color-gradient m-b-10">Tipos de derechos que tienes como autor</h3>

                <div className='grid-2 gap-5 m-b-10'>
                  <button className="btn b3" onClick={() => togglePopup('popup1')}>
                        <img src="/Ilustraciones/Derechos Morales.svg" alt="" />
                        <h4 className='text-center color-gradient'>Derechos morales</h4>
                  </button>

                  <PopUp
                        isOpen={popups.popup1}
                        onClose={() => togglePopup('popup1')}
                        title="Derechos morales"
                        image={"/Ilustraciones/Derechos Morales.webp"}
                    >
                        <p>Son intransferibles e irrenunciables. Incluyen:</p>
                        <ul>
                          <li>Exigir que se reconozca tu autoría.</li>
                          <li>Modificar tu obra.</li>
                          <li>Retirarla del mercado.</li>
                          <li>Oponerte a que la deformen o la usen mal.</li>
                        </ul>
                        <br/>
                        <p>Como diseñadores, esto nos permite decir: "Esa obra es mía y no quiero que se use de forma que dañe mi reputación o estilo".</p>
                    </PopUp>


                  <button className="btn b3" onClick={() => togglePopup('popup2')}>
                        <img src="/Ilustraciones/Derechos Patrimoniales.svg" alt="" />
                        <h4 className='text-center color-gradient'>Derechos patrimoniales</h4>
                  </button>

                  <PopUp
                        isOpen={popups.popup2}
                        onClose={() => togglePopup('popup2')}
                        title="Derechos patrimoniales"
                        image={"/Ilustraciones/Derechos Patrimoniales.webp"}
                    >
                        <p>Te dan el control económico de tu obra. Puedes:</p>
                        <ul>
                          <li>Autorizar o prohibir su uso.</li>
                          <li>Reproducirla.</li>
                          <li>Comunicarla o distribuirla públicamente.</li>
                          <li>Transformarla (adaptaciones, rediseños, traducciones).</li>
                          <li>Importarla o exportarla.</li>
                        </ul>
                        <br/>
                        <p>Puedes ceder estos derechos a un cliente o empresa mediante contrato, pero siempre conservas los derechos morales.</p>
                    </PopUp>
                </div>


            </section>
    </main>
  );
}

export default DerechosAutor;