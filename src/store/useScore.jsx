import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useScore= create(
  persist(  // Envuelve tu store con persist
    (set) => ({
      puntajeContractus: 0,
        sumarPuntajeContractus: () => set((state) => ({ puntajeContractus: state.puntajeContractus + 1 })),
        restarPuntajeContractus: () => set((state) => ({ puntajeContractus: state.puntajeContractus - 1 })),
        resetPuntajeContractus: () => set({ puntajeContractus: 0 }),

    puntajeExplotarius: 0,
        sumarPuntajeExplotarius: () => set((state) => ({ puntajeExplotarius: state.puntajeExplotarius + 1 })),
        restarPuntajeExplotarius: () => set((state) => ({ puntajeExplotarius: state.puntajeExplotarius - 1 })),
        resetPuntajeExplotarius: () => set({ puntajeExplotarius: 0 }),
    
    puntajePropietas: 0,
        sumarPuntajePropietas: () => set((state) => ({ puntajePropietas: state.puntajePropietas + 1 })),
        restarPuntajePropietas: () => set((state) => ({ puntajePropietas: state.puntajePropietas - 1 })),
        resetPuntajePropietas: () => set({ puntajePropietas: 0 }),
    
    }),
    {
      name: 'score-storage',  // Clave única para localStorage
      getStorage: () => sessionStorage,  // También puedes usar localStorage o sessionStorage
    }
  )
);

export default useScore;