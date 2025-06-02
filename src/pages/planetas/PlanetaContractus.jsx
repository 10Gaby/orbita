import { useState, useEffect } from "react";
import video from "../../assets/Aterrizaje Contractus.mp4";
import PopUp from "../../componentes/PopUp";
import Header from "../../componentes/Header";

import PreguntasContractus from "../../componentes/PreguntasContractus";

function PlanetaContractus() {
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
    popup2: false,
    popup3: false,
    popup4: false,
  });

  const togglePopup = (popupName) => {
    setPopups(prev => ({ ...prev, [popupName]: !prev[popupName] }));
  };

  return (
    <main>
        <section className={carga ? 'fixed' : 'hidden'}>
            <video autoPlay loop muted style={{ width: '100vw', height: '100dvh', objectFit: 'cover' }}>
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>
        </section>

        <section className={carga ? 'hidden' : 'initial planeta-contractus center'}>
            <Header enlace="/planetas" textoEnlace="Ver Planetas"/>
            <div className="portada center">
                <h2>Planeta Contractus</h2>
                <img src="/Planetas/Planeta Contractus.svg" alt="" className="img-planeta" />
            </div>
            <section className="padding">
                <p className="text-center" style={{margin:"100px 0"}}>Las formas del contrato de trabajo son la manera en que se
                formaliza la vinculación, según el artículo 37 del Código Sustantivo del
                Trabajo existen dos formas: verbal y escrita, y los hay de varios tipos según su
                duración, como a término fijo, indefinido, transitorio y de obra o labor.
                </p>
                <h3 className="text-center color-gradient">Formas de contratos</h3>
                <div className="grid-2 text-center">
                    <div className="center">
                        <img src="/Iconos/Contrato escrito.svg" alt="Contrato Escrito" />
                        <h4>Contrato escrito</h4>
                        <p>El contrato escrito debe quedar en un documento firmado por ambas partes. No requiere más formalidades y sirve como prueba por sí mismo.</p>
                    </div>
                    <div className="center">
                        <img src="/Iconos/Contrato verbal.svg" alt="Contrato Verbal" />
                        <h4>Contrato verbal</h4>
                        <p>Son acuerdos verbales sin documento de respaldo, lo que dificulta probar compromisos en caso de conflictos.</p>
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

                
                <div className="grid-2 center periodo-prueba">
                    <h3 className="color-gradient">Período de prueba</h3>
                    <div>
                        <p>
                            Es la etapa inicial del contrato donde el trabajador o el empleador pueden terminar la relación laboral sin pagar indemnización.
                        </p>
                            <ul>
                                <li>Debe acordarse por escrito.</li>
                                <li>Dura máximo 2 meses.</li>
                                <li>Si el contrato dura menos de un año, el período de prueba no puede pasar del 20% del tiempo total.</li>
                                <li>El trabajador sigue teniendo todos los derechos laborales: salario, prestaciones, afiliación a la seguridad social, pago de horas extra, etc, a excepción de la indemnización si es despedido en ese tiempo.</li>
                            </ul>
                    </div>
                </div>


                <div className="terminacion-contrato">
                    <h3 className="text-center color-gradient">Terminación del contrato de trabajo</h3>
                    <p className="text-center">Un contrato de trabajo puede terminarse por decisión de una o ambas partes, pero hay reglas según el motivo:</p>
                    <br/><br/>

                    <div className="grid-2 center">
                        <div className="center">
                            <img src="/Iconos/Check.svg" alt="" />
                            <h4 className="color-gradient">Con justa causa</h4>
                            <p>
                                Ocurre cuando una de las partes incumple sus deberes o comete una falta grave.
                                En este caso:
                                No hay indemnización.
                                Las razones están listadas en el artículo 62 del Código Sustantivo del Trabajo.
                                Ejemplos: incumplimiento del contrato, mala conducta, etc.
                            </p>
                        </div>

                        <div className="center">
                            <img src="/Iconos/Error.svg" alt="" />
                            <h4 className="color-gradient">Sin justa causa</h4>
                            <p>
                                Cualquiera puede terminar el contrato sin necesidad de explicar por qué, pero:
                                El empleador debe pagar una indemnización, según el artículo 64 del mismo código.
                                Esto se aplica si no hay una razón válida, solo la voluntad de finalizar el contrato.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="excepciones grid-2 center">
                    <h3>Excepciones</h3>
                    <p>Si el trabajador tiene estabilidad laboral reforzada (por ejemplo, por embarazo o enfermedad), no puede ser despedido sin autorización de un juez, aunque se pague indemnización.</p>
                </div>         

            </section>

            <PreguntasContractus />

        </section>
    </main>
  );
}

export default PlanetaContractus;