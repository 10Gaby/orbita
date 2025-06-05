import { useState, useEffect } from "react";
import { auth } from '../api/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Boton2 from "../componentes/Boton2";
import '../css/login.css';
import { iniciarSincronizacion } from "../store/useScoreSync";

import Header from "../componentes/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/historia');
        }
      });
  
      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      iniciarSincronizacion();
      navigate("/historia");
    } catch (error) {
      let errorMessage = "Ocurrió un error durante el inicio de sesión.";
      
      switch(error.code) {
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido.";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada.";
          break;
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico.";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta.";
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section className="registro relative">

      <Header enlace="/" />

      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Inicia Sesión</h3><br/>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br/>
        {/* <button type="submit" disabled={loading} className="btn1">
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button> */}

        <Boton2 type="submit">Iniciar Sesión</Boton2>

        <br/>
        <a href="/registro" className="text-center">¿Aún no tienes una cuenta? Regístrate</a>
      </form>
    </section>
  );
}

export default Login;