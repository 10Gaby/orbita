import { useState, useEffect } from 'react';
import useScore from '../store/useScore';
import '../css/preguntas.css';

import { Link } from 'react-router-dom';

const questions = [
  {
    question: "Pedro trabaja para una empresa y está afiliado a Colpensiones. Tiene 55 años y está planeando su futuro. ¿Cuántas semanas mínimas debe cotizar para tener derecho a la pensión de vejez?",
    options: [
      "1150 semanas",
      "1300 semanas",
      "900 semanas"
    ],
    correctAnswer: 1
  },
  {
    question: "Carlos trabaja en una panadería desde hace 5 meses y gana un salario mínimo. Su jefe le pregunta si tiene derecho a dotación de ropa y calzado. ¿Qué debería responder Carlos?",
    options: [
      "No, porque no ha cumplido 6 meses.",
      "No, porque la dotación solo aplica para trabajos industriales.",
      "Sí, porque gana hasta dos salarios mínimos y lleva más de 4 meses trabajando."
    ],
    correctAnswer: 2
  },
  {
    question: "Ana lleva un año trabajando. Está esperando el pago de la prima de servicios. ¿Cuándo debe recibirla?",
    options: [
      "Dos veces al año: en junio y diciembre.",
      "En julio y enero.",
      "Solo una vez al año, en diciembre."
    ],
    correctAnswer: 0
  }
];

const PreguntasExplotarius = () => {
  const score = useScore();
  // 🎯 Conectar con Zustand store
  // const { puntajes, sumar, restar } = useScore();

  // Estados locales del juego
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [aliens, setAliens] = useState([true, true, true]);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shooting, setShooting] = useState(false);
  const [hitAlien, setHitAlien] = useState(null);
  const [playerHit, setPlayerHit] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  useEffect(() => {
  const explotariusScore = score.puntaje.Explotarius;

  if (explotariusScore !== 0 && !gameStarted) {
    setGameStarted(true);
    setGameOver(true);
  }
}, []);


  // 🚀 Inicializar puntaje al comenzar el juego
  const startGame = () => {
    // Resetear el puntaje de Explotarius a 100 al iniciar
    const currentScore = score.puntaje.Explotarius;
    if (score.puntaje.Explotarius !== 0) return;
    if (currentScore !== 0) {
      // Si no es 100, ajustarlo
      const difference = currentScore - currentScore;
      if (difference > 0) {
        score.sumar('Explotarius', difference);
      } else {
        score.restar('Explotarius', Math.abs(difference));
      }
    }
    setGameStarted(true);
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      // ✅ Respuesta correcta: eliminar alien
      const alienIndex = aliens.findIndex(alien => alien);
      setHitAlien(alienIndex);
      setShooting(true);
      
      // Sumar puntos por respuesta correcta
      score.sumar('Explotarius', 10);
      
      setTimeout(() => {
        const newAliens = [...aliens];
        newAliens[alienIndex] = false;
        setAliens(newAliens);
        setShooting(false);
      }, 1000);
    } else {
      // ❌ Respuesta incorrecta: perder puntos
      setPlayerHit(true);
      score.restar('Explotarius', 20); // Restar 30 puntos
      setTimeout(() => setPlayerHit(false), 1000);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setHitAlien(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setAliens([true, true, true]);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShooting(false);
    setHitAlien(null);
    setPlayerHit(false);
    setGameStarted(false);

    score.reset('Explotarius');

  };

  // Verificar si todos los aliens fueron derrotados
  useEffect(() => {
    if (gameStarted && aliens.every(alien => !alien)) {
      setTimeout(() => setGameOver(true), 1000);
    }
  }, [aliens, gameStarted]);

  // 🎮 Pantalla de inicio
  if (!gameStarted) {
    return (
      <section className="game-container padding">
        <div className="game-start">
          <h2>Batalla por el Contrato Justo</h2>
          <p>Puntaje actual de Explotarius: <strong>{score.puntaje.Explotarius}</strong></p>
          <p>Al iniciar el juego, tu puntaje de este planeta se establecerá en 0 puntos.</p>
          <p>Responde correctamente para eliminar aliens y ganar puntos.</p>
          <p>Las respuestas incorrectas te harán perder 20 puntos.</p>
          <button onClick={startGame} className="start-button">
            Iniciar Juego
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="game-container padding">
      {!gameOver ? (
        <div className="battle-screen">
          <div>
            <h3> Misión: Justicia Laboral en Explotarius</h3>
            
            <div className="question-container">
              <div className="score">
                Puntos Explotarius: <strong>{score.puntaje.Explotarius}</strong>
              </div>
              <div className="question-number">
                Pregunta {currentQuestion + 1} de {questions.length}
              </div>
              <p>{questions[currentQuestion].question}</p>
              
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`
                      ${selectedAnswer === index ? (isCorrect ? 'correct' : 'incorrect') : ''}
                      ${selectedAnswer !== null && index === questions[currentQuestion].correctAnswer ? 'correct' : ''}
                    `}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {selectedAnswer !== null && (
                <div className="feedback">
                  <p>
                    {isCorrect 
                      ? '¡Correcto! El jugador lanza un rayo legal ⚡ y gana +10 puntos. Has eliminado un alien.' 
                      : 'Incorrecto. El enemigo contraataca con confusión contractual 😵 y pierdes -20 puntos.'
                    }
                  </p>
                  <button onClick={nextQuestion} className="next-button">
                    {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="aliens-container">
              {aliens.map((alive, index) => (
                <div 
                  key={index} 
                  className={`alien ${alive ? '' : 'dead'} ${hitAlien === index ? 'hit' : ''}`}
                >
                  {alive && <div className="alien-body">👽</div>}
                  {!alive && <div className="alien-dead">💀</div>}
                </div>
              ))}
            </div>
            
            <div className={`player ${playerHit ? 'hit' : ''}`}>
              <div className="player-body">🧑‍💼</div>
              {shooting && <div className="laser">🔫</div>}
            </div>
          </div>
        </div>
      ) : (
        <div className="game-over">
          <h3>Juego Terminado</h3>
          <p>Tu puntuación final: <strong>{score.puntaje.Explotarius}</strong></p>
          <p>
            {aliens.every(alien => !alien) 
              ? '¡Felicidades! Has derrotado a todos los aliens.' 
              : 'Inténtalo de nuevo para mejorar.'
            }
          </p>
          <div className="game-over-actions">
            <button onClick={resetGame} className="reset-button">
              Jugar de Nuevo
            </button>
            <Link to="/planeta-propietas" className='next-button-2'>Viajar al siguiente planeta</Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default PreguntasExplotarius;