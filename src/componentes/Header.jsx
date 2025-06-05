import useScore from "../store/useScore";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function Header({enlace, textoEnlace = "Regresar", style = {}}) {
    const score = useScore();

    const puntajeTotal = score.puntaje.Contractus + score.puntaje.Explotarius + score.puntaje.Propietas;

    const formatNumber = (num) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num;
        };


    return(
        <header className="padding" style={style}>
            <div><Link to={enlace}>{textoEnlace}</Link></div>
            <div>
                <div className="pt">{puntajeTotal}</div> <h4>Puntaje</h4> <h4><FaStar /> {formatNumber(score.puntaje.Estrellas)}</h4>
                
                <Link to="/menu"><img src="/Iconos/Menú.svg" alt="" /></Link>
                {/* <button
                onClick={() => {
                    score.reset('Explotarius');
                    score.reset('Contractus');
                    score.reset('Propietas');
                }}
                className="btn1"
                >
                Resetear
                </button> */}


            </div>
        </header>
    )
}

export default Header;

/*
<button onClick={() => score.sumar('Propietas', 2)}>Aumentar Propietas</button>
*/