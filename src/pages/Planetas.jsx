import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useScore from "../store/useScore";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Header from "../componentes/Header";

function Planetas() {
    const score = useScore();
    const puntajeTotal = score.puntajeContractus + score.puntajeExplotarius + score.puntajePropietas;

    const planetasRef = useRef(null);
    const { scrollYProgress: scrollYProgressPlanetas } = useScroll({ target: planetasRef });

    const left = useTransform(scrollYProgressPlanetas, [0, 0.17, 0.4, 0.6, 0.9], ['22%', '22%', '65%', '65%', '22%']);

    useMotionValueEvent(scrollYProgressPlanetas, 'change', (last) => {
      console.log('Scroll', last);
      if (last >= 0.1 && last <= 0.15) {
        // Aquí puedes agregar la lógica que desees cuando el scroll esté en ese rango
        console.log('Scroll en rango 0.1 a 0.15');
      }
      if (last >= 0.5 && last <= 0.55) {
        // Aquí puedes agregar la lógica que desees cuando el scroll esté en ese rango
        console.log('Scroll en rango 0.5 a 0.55');
      }
    });

  return (
    <main className="center">

      {/* Brillos de fondo */}
      <div className="brillo1 absolute" style={{top:"0px", left:"-10%", "--ancho": "400px"}}></div>
      <div className="brillo1 absolute" style={{top:"15%", right:"20%", backgroundColor:"rgba(31, 139, 247, 0.25", "--ancho": "600px"}}></div>

      <div className="brillo1 absolute" style={{top:"45%", right:"0%", backgroundColor:"rgba(31, 139, 247, 0.25"}}></div>
      <div className="brillo1 absolute" style={{top:"40%", left:"0%", "--ancho": "600px"}}></div>

      <div className="brillo1 absolute" style={{top:"65%", right:"10%", "--ancho": "400px"}}></div>
      <div className="brillo1 absolute" style={{top:"75%", left:"0%", backgroundColor:"rgba(31, 139, 247, 0.25", "--ancho": "500px"}}></div>

      <section className="planetas" ref={planetasRef}>
        <Header enlace="/historia"/>
        <motion.img
        src="/Pinguino.svg"
        alt="Pingüino"
        className="pinguino fixed"
        style={{
          top:"15%",
          left: left,
        }}
        />
        <div className={score.puntaje.Contractus > 0 ? "planeta" : "planeta bloqueado"}>
          <Link to="/planeta-contractus"><h2>Planeta Contractus</h2></Link>
          <Link to="/planeta-contractus"><img src="/Planetas/Planeta Contractus.svg" alt=""/></Link>
        </div>

        <div className={score.puntaje.Explotarius > 0 ? "planeta" : "planeta bloqueado"}>
          <Link to="/planeta-explotarius"><img src="/Planetas/Planeta Explotarius.svg" alt=""/></Link>
          <Link to="/planeta-explotarius"><h2>Planeta Explotarius</h2></Link>
        </div>

        <div className={score.puntaje.Propietas > 0 ? "planeta" : "planeta bloqueado"}>
          <Link to="/planeta-propietas"><h2>Planeta Propietas</h2></Link>
          <Link to="/planeta-propietas"><img src="/Planetas/Planeta Propietas.svg" alt=""/></Link>
        </div>
      </section>

    </main>
  );
}

export default Planetas;


/*
<h1>Planetas</h1>
        <p>Puntaje: {puntajeTotal}</p>
      <p>Esta es la página de planetas.</p>
      <button onClick={score.sumarPuntajePropietas}>Aumentar Propietas</button>
      <Link to="/historia">regresar</Link>

*/