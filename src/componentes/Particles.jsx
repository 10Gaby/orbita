import { useCallback, useState, useRef, useEffect } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { tsParticles } from "tsparticles-engine"; // if you are going to use `loadSlim`, install the "tsparticles-engine" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import useScore from "../store/useScore";
import { button } from "motion/react-client";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
      await loadSlim(engine);
    }, []);
    
    return (
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        options={{
            background: {
              color: {
                value: "#090110", // Color de fondo (puede ser un color sólido o un degradado)
              }},
            particles: {
              number: {
                value: 25, // Cantidad de partículas
                density: {
                  enable: true,
                  area: 700, // Área donde se distribuyen
                },
                links: {
                    enable: true,
                },
              },
              color: {
                value: "#ffffff", // Color de las partículas (puede ser un array para múltiples colores)
              },
              shape: {
                type: "star", // "circle", "triangle", "star", etc.
              },
              opacity: {
                value: 0.8, // Opacidad
              },
              size: {
                value: { min: 2, max: 5 }, // Tamaño aleatorio entre 1 y 3
              },
              move: {
                enable: true,
                speed: 2, // Velocidad
                direction: "none", // "none", "top", "bottom", etc.
                random: true,
                straight: false,
                outModes: {
                  default: "out", // Comportamiento al salir del canvas
                },
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab", // "grab", "bubble", "repulse", etc.
                },
                onClick: {
                  enable: true,
                  mode: "repulse", // Añade partículas al hacer clic
                },
              },
            },
          }}
      />
    );
  };
  
  export default ParticlesBackground;