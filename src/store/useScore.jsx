import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { doc, setDoc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, auth } from '../api/firebase';

const useScore = create(
  persist(
    immer((set, get) => ({
      // Estado inicial
      puntajes: {
        Contractus: 0,
        Explotarius: 0,
        Propietas: 0,
      },
      userData: null, // {uid, email, username}
      modo: 'local', // 'local' | 'firebase'
      loading: false,
      error: null,

      // 🔄 Métodos de sincronización
      iniciarSincronizacion: async () => {
        try {
          set({ loading: true, error: null });
          const user = auth.currentUser;
          
          if (!user) throw new Error('No hay usuario autenticado');
          
          // Obtener datos adicionales del usuario desde Firestore
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          if (!userDoc.exists()) throw new Error('Usuario no encontrado en Firestore');
          
          const userData = {
            uid: user.uid,
            email: user.email,
            username: user.displayName || userDoc.data().username
          };

          // Obtener puntajes desde la subcolección
          const scoresRef = doc(db, "usuarios", user.uid, "puntajes", "current");
          const scoresSnap = await getDoc(scoresRef);

          // Configurar estado inicial
          set((state) => {
            state.userData = userData;
            state.modo = 'firebase';
            
            if (scoresSnap.exists()) {
              state.puntajes = {
                ...state.puntajes,
                ...scoresSnap.data()
              };
            }
          });

          // Escuchar cambios en tiempo real
          return onSnapshot(scoresRef, (doc) => {
            if (doc.exists()) {
              set((state) => {
                state.puntajes = {
                  ...state.puntajes,
                  ...doc.data()
                };
              });
            }
          });

        } catch (error) {
          set({ error: error.message, modo: 'local' });
          console.error("Error en sincronización:", error);
        } finally {
          set({ loading: false });
        }
      },

      cerrarSesion: () => {
        set({ userData: null, modo: 'local' });
      },

      // 🎯 Acciones principales
      actualizarPuntaje: async (tipo, cantidad) => {
        const { modo, userData, puntajes } = get();
        
        // Actualización local inmediata
        set((state) => {
          if (!(tipo in state.puntajes)) state.puntajes[tipo] = 0;
          state.puntajes[tipo] += cantidad;
        });

        // Sincronización con Firebase si está autenticado
        if (modo === 'firebase' && userData?.uid) {
          try {
            const scoresRef = doc(db, "usuarios", userData.uid, "puntajes", "current");
            await updateDoc(scoresRef, {
              [tipo]: get().puntajes[tipo]
            });
          } catch (error) {
            console.error("Error al actualizar Firebase:", error);
            set({ error: "Error al sincronizar con la nube" });
          }
        }
      },

      sumar: (tipo, puntos = 1) => {
        get().actualizarPuntaje(tipo, puntos);
      },

      restar: (tipo, puntos = 1) => {
        get().actualizarPuntaje(tipo, -puntos);
      },

      reset: async (tipo) => {
        const { modo, userData } = get();
        
        set((state) => {
          state.puntajes[tipo] = 0;
        });

        if (modo === 'firebase' && userData?.uid) {
          try {
            const scoresRef = doc(db, "usuarios", userData.uid, "puntajes", "current");
            await updateDoc(scoresRef, {
              [tipo]: 0
            });
          } catch (error) {
            console.error("Error al resetear en Firebase:", error);
            set({ error: error.message });
          }
        }
      },

      // Obtener puntaje total
      get total() {
        return Object.values(get().puntajes).reduce((sum, val) => sum + val, 0);
      }
    })),
    {
      name: 'score-storage',
      getStorage: () => sessionStorage,
      partialize: (state) => ({ 
        puntajes: state.puntajes,
        modo: 'local' // Siempre inicia en modo local al recargar
      }),
      migrate: (persistedState) => {
        // Migración de datos
        const defaultPuntajes = {
          Contractus: 0,
          Explotarius: 0,
          Propietas: 0,
        };
        
        return {
          ...persistedState,
          puntajes: {
            ...defaultPuntajes,
            ...(persistedState.puntajes || {})
          },
          userData: null,
          loading: false,
          error: null
        };
      },
    }
  )
);

export default useScore;