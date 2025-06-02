import { useEffect, useRef } from "react";
import { auth, db } from "../api/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import useScore from "./useScore";

function useScoreSync() {
  const score = useScore();
  const currentUserRef = useRef(null);
  const prevScoreRef = useRef(score.puntaje);

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

      // Comparar con el anterior para evitar actualizaciones innecesarias
      const prevScore = prevScoreRef.current;
      const hayCambios = Object.keys(currentScore).some(
        (key) => currentScore[key] !== prevScore[key]
      );

      if (user && hayCambios) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          await updateDoc(docRef, { puntaje: currentScore });
          prevScoreRef.current = { ...currentScore }; // actualizar referencia
        } catch (err) {
          console.error("Error actualizando Firestore:", err);
        }
      }
    }, 2000); // Cada 2 segundos revisa

    return () => clearInterval(interval);
  }, [score.puntaje]);
}

export default useScoreSync;
