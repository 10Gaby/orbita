import { Link } from "react-router-dom";
import useScore from "../store/useScore";

function Planetas() {
    const score = useScore();
    const puntajeTotal = score.puntajeContractus + score.puntajeExplotarius + score.puntajePropietas;

  return (
    <main className="contenedor-general">
      <h1>Planetas</h1>
        <p>Puntaje: {puntajeTotal}</p>
      <p>Esta es la página de planetas.</p>
      <button onClick={score.sumarPuntajePropietas}>Aumentar Propietas</button>
      <Link to="/historia">regresar</Link>
    </main>
  );
}

export default Planetas;