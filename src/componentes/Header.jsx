import useScore from "../store/useScore";
import { Link } from "react-router-dom";

function Header({enlace}){
    const score = useScore();
    const puntajeTotal = score.puntajeContractus + score.puntajeExplotarius + score.puntajePropietas;

    return(
        <header className="padding">
            <div><Link to={enlace}><img src="/Iconos/Regresar.svg" alt="" />Regresar</Link></div>
            <div>
                <div className="pt">{puntajeTotal}</div> <h4>Puntaje</h4>
                <img src="/Iconos/Menú.svg" alt="" />
            </div>
        </header>
    )
}

export default Header;