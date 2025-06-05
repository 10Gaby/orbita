import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useScore = create(
  persist(
    immer((set, get) => ({
      puntaje: {
        Contractus: 0,
        Explotarius: 0,
        Propietas: 0,
        Estrellas: 0,
      },
      sumar: (tipo, puntos = 1) =>
        set((state) => {
          if (!(tipo in state.puntaje)) state.puntaje[tipo] = 0;
          const actual = state.puntaje[tipo];
          state.puntaje[tipo] = typeof actual === 'number' ? actual + puntos : puntos;
        }),
      restar: (tipo, puntos = 1) =>
        set((state) => {
          if (!(tipo in state.puntaje)) state.puntaje[tipo] = 0;
          const actual = state.puntaje[tipo];
          state.puntaje[tipo] = typeof actual === 'number' ? actual - puntos : 0;
        }),
      reset: (tipo) =>
        set((state) => {
          state.puntaje[tipo] = 0;
        }),
    })),
    {
      name: 'score-storage',
      getStorage: () => sessionStorage,
      migrate: (persistedState, version) => {
        // Reparar datos dañados
        const defaultPuntaje = {
          Contractus: 0,
          Explotarius: 0,
          Propietas: 0,
          Estrellas: 0,
        };
        if (!persistedState?.puntaje || typeof persistedState.puntaje !== 'object') {
          return { ...persistedState, puntaje: defaultPuntaje };
        }

        // Reparar campos no numéricos
        for (const key of Object.keys(defaultPuntaje)) {
          if (typeof persistedState.puntaje[key] !== 'number') {
            persistedState.puntaje[key] = 0;
          }
        }

        return persistedState;
      },
    }
  )
);

export default useScore;