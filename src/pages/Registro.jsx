import { useState, useEffect } from "react";
import { auth, db } from '../api/firebase';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Boton2 from "../componentes/Boton2";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, redirigir al dashboard
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
      // 1. Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Actualizar el perfil con el nombre de usuario
      await updateProfile(user, {
        displayName: username
      });
      
      // 3. Crear documento en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        email: email,
        username: username,
        createdAt: serverTimestamp(),
        uid: user.uid,
        puntaje: {
          Contractus: 0,
          Explotarius: 0,
          Propietas: 0
        }
      });
      
      // Redirigir después del registro exitoso
      navigate("/historia");
      await iniciarSincronizacion();
    } catch (error) {
      // Manejo de errores
      let errorMessage = "Ocurrió un error durante el registro.";
      
      switch(error.code) {
        case "auth/email-already-in-use":
          errorMessage = "El correo electrónico ya está en uso.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña debe tener al menos 6 caracteres.";
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section className="registro">
      <a href="/"><img src="/Iconos/Flecha_De_Color-7.webp" alt="" className="absolute flecha" style={{transform:"scale(-1)", top:"0px", left:"10px"}}/></a>
      <img src="/Registro.png" alt="" />
      
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Regístrate</h3><br/>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <br/><br/>
        {/* <button type="submit" disabled={loading} className="btn1">
          {loading ? "Registrando..." : "Registrarse"}
        </button> */}
        <Boton2 type="submit">Registrarse</Boton2>

        <br/>
        <a href="/login" className="text-center">¿Ya tienes una cuenta? Inicia Sesión</a>
      </form>
    </section>
  );
}

export default Registro;