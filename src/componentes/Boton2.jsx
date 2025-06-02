import '../css/boton2.css';
import { useNavigate } from 'react-router-dom';

function Boton2({ href, type, children }) {

  const navigate = useNavigate();
  
  return (
        <button className="uiverse" type={type || "button"} navigate={href}>
        <div className="wrapper">
            <span>{children || 'Clic Aquí'}</span>
            <div className="circle circle-12"></div>
            <div className="circle circle-11"></div>
            <div className="circle circle-10"></div>
            <div className="circle circle-9"></div>
            <div className="circle circle-8"></div>
            <div className="circle circle-7"></div>
            <div className="circle circle-6"></div>
            <div className="circle circle-5"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-1"></div>
        </div>
        </button>

  );
}

export default Boton2;