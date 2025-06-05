import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // o usa un <a> si no estás usando React Router
import Header from "../componentes/Header";

function Historia() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      content: (
        <img src="/Cinemáticas/1.webp" alt="Cinemática 1" />
      )
    },
    {
      id: 2,
      content: (
        <img src="/Cinemáticas/2.webp" alt="Cinemática 2" style={{objectPosition:"bottom"}}/>
      )
    },
    {
      id: 3,
      content: (
        <img src="/Cinemáticas/3.webp" alt="Cinemática 2"/>
      )
    },
    {
      id: 4,
      content: (
        <img src="/Cinemáticas/4.webp" alt="Cinemática 2"/>
      )
    },
    {
      id: 5,
      content: (
        <div className="slide-content universo">
          <h4>Unvierso</h4>
          <p>Pequeño ser creativo, tu talento merece respeto. Existen derechos, caminos justos y redes de apoyo. No estás solo.
            <br/>Te daré la oportunidad de transformar tu realidad mediante el conocimiento.
            <br/><br/>Recorre este universo de planetas que te enseñarán lo que necesitas saber para enfrentarte al mundo laboral sin morir en el intento.
            <br/><br/>Usa esta oportunidad sabiamente para cambiar tu destino.
            </p>
        </div>
      )
    }
  ];

  const isLastSlide = currentSlide === slides.length - 1;
  const isFirstSlide = currentSlide === 0;

  const nextSlide = () => {
    if (isLastSlide) return; // La redirección se manejará en el onClick del botón
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isFirstSlide) return; 
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="contenedor-general historia">
      <Header enlace="/" style={{backgroundColor: "#f5f5f5", marginTop:"0px", background:"linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.00) 100%)"}}/>
      <div className="flechas">
        {isFirstSlide ? (
            <button onClick={prevSlide} className="flecha hidden">
            <FaArrowCircleLeft />
            </button>
        ) : (
          <button onClick={prevSlide} className="flecha">
          <FaArrowCircleLeft />
        </button>
        )}
        
        {isLastSlide ? (
          <Link to="/planetas" className="flecha"> {/* Cambia "/destino" por tu ruta */}
            <FaArrowCircleRight />
          </Link>
        ) : (
          <button onClick={nextSlide} className="flecha">
            <FaArrowCircleRight />
          </button>
        )}
      </div>
      
      <div className="cinematicas">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.4 }}
            className="slide"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Historia;