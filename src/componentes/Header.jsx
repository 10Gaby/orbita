import useScore from "../store/useScore";
import { Link } from "react-router-dom";

function Header({enlace, textoEnlace = "Regresar", style = {}}) {
    const score = useScore();
    const { Contractus = 0, Explotarius = 0, Propietas = 0 } = score.puntaje || {};
    const puntajeTotal = Contractus + Explotarius + Propietas;

    return(
        <header className="padding" style={style}>
            <div><Link to={enlace}>{textoEnlace}</Link></div>
            <div>
                <div className="pt">{puntajeTotal}</div> <h4>Puntaje</h4>
                
                <Link to="/menu"><img src="/Iconos/Menú.svg" alt="" /></Link>
            </div>
        </header>
    )
}

export default Header;

/*
<button onClick={() => score.sumar('Propietas', 2)}>Aumentar Propietas</button>
*/