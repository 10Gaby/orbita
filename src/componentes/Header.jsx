import useScore from "../store/useScore";
import { Link } from "react-router-dom";
import useScoreSync from "../store/useScoreSync";

function Header({enlace, textoEnlace = "Regresar", style = {}}) {
    const score = useScore();
    useScoreSync();
    const puntajeTotal = score.puntaje.Contractus + score.puntaje.Explotarius + score.puntaje.Propietas;

    return(
        <header className="padding" style={style}>
            <div><Link to={enlace}>{textoEnlace}</Link></div>
            <div>
                <div className="pt">{puntajeTotal}</div> <h4>Puntaje</h4>
                
                <Link to="/menu"><img src="/Iconos/Menú.svg" alt="" /></Link>
                {/* <button onClick={() => score.reset('Contractus')} className="btn1">Resetear</button> */}
            </div>
        </header>
    )
}

export default Header;

/*
<button onClick={() => score.sumar('Propietas', 2)}>Aumentar Propietas</button>
*/