import { useEffect, useRef } from "react";
import { auth, db } from "../api/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import useScore from "./useScore";

function useScoreSync() {
  const score = useScore();
  const currentUserRef = useRef(null);
  const prevScoreRef = useRef(score.puntaje);
  const saltarUnaSync = useRef(false); // 👈 NUEVO: bandera para ignorar una sync

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      currentUserRef.current = user || null;
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = currentUserRef.current;
      const currentScore = score.puntaje;

      if (saltarUnaSync.current) {
        saltarUnaSync.current = false;
        prevScoreRef.current = { ...currentScore }; // Evitar sync con datos viejos
        return;
      }

      const prevScore = prevScoreRef.current;
      const hayCambios = Object.keys(currentScore).some(
        (key) => currentScore[key] !== prevScore[key]
      );

      if (user && hayCambios) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          await updateDoc(docRef, { puntaje: currentScore });
          prevScoreRef.current = { ...currentScore };
        } catch (err) {
          console.error("Error actualizando Firestore:", err);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [score.puntaje]);

  // Permitir que otro módulo active la bandera para evitar sobrescritura
  useScoreSync.saltarUnaSync = () => {
    saltarUnaSync.current = true;
  };
}

export default useScoreSync;


export function iniciarSincronizacion() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const datos = docSnap.data();
        const puntajeRemoto = datos.puntaje || {
          Contractus: 0,
          Explotarius: 0,
          Propietas: 0,
          Extrellas: 0,
        };

        useScore.setState({ puntaje: puntajeRemoto });
        useScoreSync.saltarUnaSync(); // 👈 Evita que se sobrescriba
      }
    }
  });
}