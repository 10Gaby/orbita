import { useRef, useEffect, useCallback, useState } from "react";
import useScore from "../store/useScore";

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);     
  const startTimeRef = useRef(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;

    const draw = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp; 
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    sparkColor,
    sparkSize,
    sparkRadius,
    sparkCount,
    duration,
    easeFunc,
    extraScale,
  ]);


  const [puedeGanar, setPuedeGanar] = useState(true);
  const timeoutRef = useRef(null);
  const score = useScore();
  const [floatingTexts, setFloatingTexts] = useState([]);


  // Limpiar timeout si el componente se desmonta
  useCallback(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    if (!puedeGanar) return;

    const puntosGanados = Math.floor(Math.random() * 3) + 1; // 1 a 3
    score.sumar("Estrellas", puntosGanados);

    const nuevoTexto = {
      id: Date.now(),
      x,
      y,
      puntos: `+${puntosGanados} ⭐`
    };

    setFloatingTexts((prev) => [...prev, nuevoTexto]);

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== nuevoTexto.id));
    }, 1000); // Duración visible del texto (en ms)


    setPuedeGanar(false);
    // console.log(`Puntos ganados: ${puntosGanados}`);

    // Permitir nuevamente después de 1 minuto (60000 ms)
    timeoutRef.current = setTimeout(() => {
      setPuedeGanar(true);
    }, 20000);

    sparksRef.current.push(...newSparks);
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none"
        }}
      />
      {floatingTexts.map((text) => (
      <div
        key={text.id}
        style={{
          position: 'absolute',
          left: text.x,
          top: text.y,
          transform: 'translate(-50%, -50%)',
          color: 'gold',
          fontSize: '24px',
          fontWeight: 'bold',
          pointerEvents: 'none',
          animation: 'floatFade 1s ease-out forwards',
          zIndex: 10
        }}
      >
        {text.puntos}
      </div>
    ))}

      {children}
    </div>
  );
};

export default ClickSpark;