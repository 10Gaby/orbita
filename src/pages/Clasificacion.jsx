import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";
import { useState, useEffect } from 'react';
import Header from "../componentes/Header";
import '../css/Clasificacion.css';

async function obtenerTablaClasificacion() {
  try {
    // 1. Obtener todos los usuarios
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("puntaje", "!=", null));
    const querySnapshot = await getDocs(q);

    // 2. Procesar los datos
    const usuariosConPuntaje = [];
    
    querySnapshot.forEach((doc) => {
      const usuario = doc.data();
      const puntaje = usuario.puntaje || {};
      
      // Calcular la suma total de los puntajes
      const sumaPuntaje = 
        (puntaje.Contractus || 0) +
        (puntaje.Explotarius || 0) +
        (puntaje.Propietas || 0) +
        (puntaje.Estrellas || 0);
      
      // Solo incluir usuarios con puntaje mayor a 0
      if (sumaPuntaje > 0) {
        usuariosConPuntaje.push({
          id: doc.id,
          username: usuario.username,
          puntajeTotal: sumaPuntaje,
          detallesPuntaje: puntaje
        });
      }
    });

    // 3. Ordenar de mayor a menor puntaje
    usuariosConPuntaje.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    return usuariosConPuntaje;
  } catch (error) {
    console.error("Error al obtener la tabla de clasificación:", error);
    return [];
  }
}

// Uso de la función
obtenerTablaClasificacion().then(clasificacion => {
//   console.log("Tabla de clasificación:", clasificacion);
});


function Clasificacion() {
  const [clasificacion, setClasificacion] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClasificacion = async () => {
      setCargando(true);
      const data = await obtenerTablaClasificacion();
      setClasificacion(data);
      setCargando(false);
    };

    obtenerClasificacion();
  }, []);

  if (cargando) return <div>Cargando tabla de clasificación...</div>;

  return (
    <div className="tabla-clasificacion">
        <Header enlace="/menu" textoEnlace="Regresar" />
      <h2>Tabla de Clasificación</h2>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Usuario</th>
            <th>Puntaje Total</th>
          </tr>
        </thead>
        <tbody>
          {clasificacion.map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{index + 1}</td>
              <td>{usuario.username}</td>
              <td>{usuario.puntajeTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {clasificacion.length === 0 && <p>No hay usuarios con puntaje aún.</p>}
    </div>
  );
}

export default Clasificacion;

