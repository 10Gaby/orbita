import { useState, useEffect } from "react";
import video from "../../assets/Aterrizaje Explotarius.mp4";
import PopUp from "../../componentes/PopUp";
import Header from "../../componentes/Header";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import PreguntasExplotarius from "../../componentes/PreguntasExplotarius";


/* ICONOS */
import { IoCashSharp } from "react-icons/io5";
import { MdSavings } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { RiShirtFill } from "react-icons/ri";
import { GiGraveFlowers } from "react-icons/gi";

function PlanetaExplotarius() {
    const [carga, setCarga] = useState(true);
   // Efecto para cambiar el estado después de 2.5 segundos
   useEffect(() => {
    const timer = setTimeout(() => {
      setCarga(false);
    }, 5500);

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
    <main className="p-explotarius">
        <section className={carga ? 'fixed' : 'hidden'}>
            <video autoPlay loop muted style={{ width: '100vw', height: '100dvh', objectFit: 'cover' }}>
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>
        </section>

        <section className={carga ? 'hidden' : 'initial planeta-contractus center'}>
            <Header enlace="/planetas" textoEnlace="Ver Planetas"/>
            <div className="portada center">
                <h2>Planeta Explotarius</h2>
                <img src="/Planetas/Planeta Explotarius.svg" alt="" className="img-planeta" />
            </div>
            <section className="padding">
                <h2 className="text-center color-gradient">Prestaciones Sociales</h2>
                <div className="grid-2 center" style={{gap:"5%"}}>
                    <div className="center">
                        <img src="/Ilustraciones/Prestaciones Sociales.webp" alt="Contrato Escrito" className="image" />
                    </div>
                    <div>
                       <p>Son beneficios económicos que el empleador debe pagar al trabajador, además del salario, como parte de la relación laboral. Incluyen:</p>
                        <ul>
                            <li>Prima de servicios.</li>
                            <li>Cesantías.</li>
                            <li>Dotación.</li>
                            <li>Gastos de entierro.</li>
                        </ul>
                        <p>Se calculan sobre el salario (sueldo, comisiones, horas extras, recargos) y no sobre pagos que no sean salario, como algunas bonificaciones especiales.</p>
                    </div>
                </div>


                <VerticalTimeline lineColor='#DC33FC' className="vertical-timeline">
                    <VerticalTimelineElement className='vertical-timeline-element'
                        date='' 
                        iconStyle={{ background: 'linear-gradient(229deg, #1F8BF7 -7.25%, #DC33FC 100%)', color: '#fff', border:'none' }}
                        icon={<IoCashSharp />}
                        >
                        <div className='div2'>
                            <div>
                                <h3 className="color-gradient">Prima de servicios</h3>
                                <p>Es un pago obligatorio, independiente del salario, que se entrega en dos partes:</p>
                                <ul>
                                    <li>Junio (hasta el 30)</li>
                                    <li>Diciembre (hasta el 20)</li>
                                </ul>
                                <p>Corresponde a un mes de salario por año trabajado o proporcional si es menos. Fórmula: Salario × días trabajados ÷ 360</p>
                            </div>
                        </div>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement className='vertical-timeline-element'
                        date='' 
                        iconStyle={{ background: 'linear-gradient(229deg, #1F8BF7 -7.25%, #DC33FC 100%)', color: '#fff', border:'none' }}
                        icon={<MdSavings />}
                        >
                        <div className='div2'>
                            <div>
                                <h3 className="color-gradient">Cesantías</h3>
                                <p>Es un ahorro que te protege si quedas sin trabajo</p>
                                <ul>
                                    <li>Equivale a un mes de salario por año trabajado (o proporcional).</li>
                                    <li>Se calcula con el último salario (incluyendo auxilio de transporte).</li>
                                    <li>El empleador debe consignarlas en un fondo antes del 15 de febrero de cada año.</li>
                                    <li>Cada mes guarda el 8.33% del salario para este fin.</li>
                                    <li>Si no consigna a tiempo, se paga un día de salario por día de retraso.</li>
                                    <li>Puedes usarlas parcialmente para educación o vivienda.</li>
                                </ul>
                            </div>
                        </div>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement className='vertical-timeline-element'
                        date='' 
                        iconStyle={{ background: 'linear-gradient(229deg, #1F8BF7 -7.25%, #DC33FC 100%)', color: '#fff', border:'none' }}
                        icon={<SiCashapp />}
                        >
                        <div className='div2'>
                            <div>
                                <h3 className="color-gradient">Intereses sobre cesantías</h3>
                                <p>Es un dinero extra por tener tus cesantías guardadas.</p>
                                <ul>
                                    <li>El empleador debe pagarte un 12% anual sobre el valor de tus cesantías.</li>
                                    <li>Se paga directamente a ti, antes del 31 de enero.</li>
                                    <li>Si trabajaste menos de un año, se calcula proporcionalmente.</li>
                                </ul>
                            </div>
                        </div>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement className='vertical-timeline-element'
                        date='' 
                        iconStyle={{ background: 'linear-gradient(229deg, #1F8BF7 -7.25%, #DC33FC 100%)', color: '#fff', border:'none' }}
                        icon={<RiShirtFill />}
                        >
                        <div className='div2'>
                            <div>
                                <h3 className="color-gradient">Dotaciones</h3>
                                <p>Si el trabajador gana hasta dos salarios mínimos y lleva cuatro meses en la empresa, debe recibir ropa y zapatos de trabajo.
                                    <br/>Se entregan tres veces al año:
                                </p>
                                <ul>
                                    <li>30 de abril</li>
                                    <li>31 de agosto</li>
                                    <li>20 de diciembre</li>
                                </ul>
                                <p>No se puede reemplazar por dinero, aunque algunas empresas lo hacen si no hay uniforme.</p>
                            </div>
                        </div>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement className='vertical-timeline-element'
                        date='' 
                        iconStyle={{ background: 'linear-gradient(229deg, #1F8BF7 -7.25%, #DC33FC 100%)', color: '#fff', border:'none' }}
                        icon={<GiGraveFlowers />}
                        >
                        <div className='div2'>
                            <div>
                                <h3 className="color-gradient">Gastos de entierro</h3>
                                <p>Cuando un trabajador fallece, el fondo de pensiones (no el empleador) reembolsa los gastos del entierro.</p>
                                <ul>
                                    <li>Lo recibe quien pagó el servicio, presentando facturas y documentos.</li>
                                    <li>El monto es hasta cinco salarios mínimos.</li>
                                    <li>Es un pago único y solo requiere que el trabajador haya estado afiliado.</li>
                                </ul>
                            </div>
                        </div>
                    </VerticalTimelineElement>
                
                </VerticalTimeline>



                <h2 className="text-center color-gradient">Seguridad Social</h2>
                <div className="grid-2 center" style={{gap:"5%"}}>
                    <div className="center">
                        <img src="/Ilustraciones/Prestaciones Sociales.webp" alt="Contrato Escrito" className="image" />
                    </div>
                    <div>
                       <p>Es un conjunto de beneficios que busca proteger a las personas en temas de salud, pensión y riesgos laborales.</p>
                        <ul>
                            <li>Una EPS (salud)</li>
                            <li>Un fondo de pensión</li>
                            <li>Una ARL (riesgos laborales)</li>
                        </ul>
                        <p>Según la Ley 100 de 1993, busca mejorar la calidad de vida y apoyar en casos de enfermedad, accidentes o jubilación.</p>
                    </div>
                </div>



            <div className="tipos-contrato">
                    <div className="grid-3" style={{gap:"5%", maxWidth:"80%", margin:"0 auto"}}>
                    <button onClick={() => togglePopup('popup1')} className="btn-contrato" style={{"--rotate": "-6deg", "--translateY": "20px"}}>
                            <img src="/Ilustraciones/Contrato-fijo.webp"/>
                            <h4 className="desc">Salud</h4>
                        </button>

                        <button onClick={() => togglePopup('popup2')} className="btn-contrato">
                            <img src="/Ilustraciones/Contrato-indefinido.webp"/>
                            <h4 className="desc">Fondo de Pensiones</h4>
                        </button>

                        <button onClick={() => togglePopup('popup3')} className="btn-contrato" style={{"--rotate": "6deg", "--translateY": "20px"}}>
                            <img src="/Ilustraciones/Contrato-obra-labor.webp"/>
                            <h4 className="desc">Riesgos Laborales</h4>
                        </button>
                    </div>


                    <PopUp
                        isOpen={popups.popup1}
                        onClose={() => togglePopup('popup1')}
                        title="Salud"
                        image={"/Ilustraciones/Contrato-fijo.webp"}
                    >
                        <p>Toda persona tiene derecho a recibir atención médica. Esta puede ser gratuita (por ejemplo, a través del Sisbén) o pagada mediante aportes.
                            <br/>Una empresa <b>puede quedar exonerada de pagar aportes a salud</b> por sus trabajadores <b>si cumple con estas dos condiciones:</b>
                        </p><br/>
                        <ul>
                            <li>La empresa declara impuesto de renta.</li>
                            <li>El salario del empleado es menor a 10 salarios mínimos mensuales.</li>
                        </ul><br/>
                        <p>Ahora bien, si el trabajador gana 10 salarios mínimos o más, la empresa debe pagar el aporte a salud, sin importar si declara renta o no.</p>
                    </PopUp>

                    <PopUp
                        isOpen={popups.popup2}
                        onClose={() => togglePopup('popup2')}
                        title="Fondo de Pensiones"
                        image={"/Ilustraciones/Contrato-indefinido.webp"}
                    >
                        <b>Fondos Privados</b>
                        <p>Ahorras solo para ti.</p>
                            <ul>
                                <li>Te pensionas cuando reúnas el dinero.</li>
                                <li>Necesitas mucho ahorro (ej: $270 millones si ganas el mínimo).</li>
                                <li>Útil si ganas bien y quieres pensionarte antes.</li>
                            </ul>
                                <br/>
                            <b>Fondo Público (Colpensiones)</b>
                            <p>Todos aportan a un fondo común.</p>
                                <ul>
                                    <li>Pensión según salario y semanas cotizadas.</li>
                                    <li>Requiere 1.300 semanas y edad (57 mujeres / 62 hombres).</li>
                                    <li>Ideal si ganas poco o medio: garantiza pensión mínima.</li>
                                </ul>
                    </PopUp>

                    <PopUp
                        isOpen={popups.popup3}
                        onClose={() => togglePopup('popup3')}
                        title="Riesgos Laborales"
                        image={"/Ilustraciones/Contrato-ocasional.webp"}
                    >
                        <p>Los porcentajes de cotización dependen del nivel de riesgo asegurado, porcentajes que están dados en el artículo 2.2.4.3.5 del Decreto Único Reglamentario 1072 de 2015.</p>
                            <br/>
                            <ul>
                                <li>Riesgo I = 0.522%</li>
                                <li>Riesgo II = 1.044%</li>
                                <li>Riesgo III = 2.436%</li>
                                <li>Riesgo VI = 4.350%</li>
                                <li>Riesgo V = 6.960%</li>
                            </ul>
                    </PopUp>
                </div>
                
                

                <div className="excepciones grid-2 center">
                    <h3>Garantía de pensión mínima</h3>
                    <div>
                        <p>El estado garantiza una pensión mínima en cualquiera de los dos regímenes pensionales, en la medida en que se cumplan los requisitos de ley.</p>
                        <ul>
                            <li>Tener al menos 1.150 semanas cotizadas.</li>
                            <li>Haber cumplido 57 años en caso de las mujeres y 62 en los hombres.</li>
                        </ul>
                    </div>
                </div>         

            </section>

            <PreguntasExplotarius />

        </section>
    </main>
  );
}

export default PlanetaExplotarius;