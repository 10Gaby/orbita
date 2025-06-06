import useScore from "../store/useScore";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import '../css/Header.css';

function Header({enlace, textoEnlace = "Regresar", style = {}}) {
    const score = useScore();
    const [menuOpen, setMenuOpen] = useState(false);
    const puntajeTotal = score.puntaje.Contractus + score.puntaje.Explotarius + score.puntaje.Propietas;

    const formatNumber = (num) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num;
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return(
        <header className="padding" style={style}>
            <div className="header-main-content">
                <div className="back-button"><Link to={enlace}>{textoEnlace}</Link></div>
                
                {/* Menú Hamburguesa para móviles */}
                <button className="menu-toggle" onClick={toggleMenu}>
                    {menuOpen ? <FiX /> : <FiMenu  />}
                </button>
                
                {/* Contenido del menú (se muestra diferente en móvil/desktop) */}
                <div className={`menu-content ${menuOpen ? 'mobile-menu-open' : ''}`}>
                    <div className="score-display flex">
                        <div className="flex gap-5">
                            <div className="pt">{puntajeTotal}</div> 
                            <h4>Puntaje</h4> 
                        </div>
                        <h4><FaStar /> {formatNumber(score.puntaje.Estrellas)}</h4>
                    </div>
                    <Link to="/menu" className="menu-icon">
                        <img src="/Iconos/Menú.svg" alt="Menú principal" />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;

/*
<button onClick={() => score.sumar('Propietas', 2)}>Aumentar Propietas</button>

            <button
                onClick={() => {
                    score.reset('Explotarius');
                    score.reset('Contractus');
                    score.reset('Propietas');
                }}
                className="btn1"
                >
                Resetear
            </button>
*/