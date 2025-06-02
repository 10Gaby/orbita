import { useState, useEffect } from 'react';
import useScore from '../store/useScore';
import { Link } from 'react-router-dom';
import Boton2 from './Boton2';
import '../css/preguntas.css';

const questions = [
  {
    question: "Un trabajador empieza a laborar sin firmar nada. El empleador le promete un salario pero no cumple. ¿Qué tipo de contrato tiene y cuál es el mayor riesgo?",
    options: [
      "Contrato verbal: no hay prueba escrita en caso de conflicto",
      "Contrato escrito: puede demandar con el documento",
      "Contrato transitorio: debe terminar en 3 meses"
    ],
    correctAnswer: 0
  },
  {
    question: "Durante el periodo de prueba, el trabajador ha estado trabajando sin sueldo, su empleador dice que legalmente no tiene porque pagarle en el periodo de prueba. Su afirmación es:",
    options: [
      "Correcta, en el periodo de prueba el trabajador no puede reclamar los derechos laborales.",
      "Incorrecta, en el periodo de prueba el trabajador sigue teniendo todos sus derechos laborales, a excepción de la indemnización."
    ],
    correctAnswer: 1
  },
  {
    question: "El empleador quiere despedir a una trabajadora embarazada. ¿Puede hacerlo si le paga indemnización?",
    options: [
      "Sí, si paga la indemnización correspondiente",
      "No, necesita permiso de un juez",
      "Sí, si ya terminó el período de prueba"
    ],
    correctAnswer: 1
  }
];

const PreguntasContractus = () => {
  const score = useScore();
  // 🎯 Conectar con Zustand store
  // const { puntajes, sumar, restar } = useScore();
  // const contractusScore = score.puntajes.Contractus;

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
  const contractusScore = score.puntaje.Contractus;

  if (contractusScore !== 0 && !gameStarted) {
    setGameStarted(true);
    setGameOver(true);
  }
}, []);


  // 🚀 Inicializar puntaje al comenzar el juego
  const startGame = () => {
    // Resetear el puntaje de Contractus a 100 al iniciar
    const currentScore = score.puntaje.Contractus;
    if (score.puntaje.Contractus !== 0) return;
    if (currentScore !== 0) {
      // Si no es 100, ajustarlo
      const difference = currentScore - currentScore;
      if (difference > 0) {
        score.sumar('Contractus', difference);
      } else {
        score.restar('Contractus', Math.abs(difference));
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
      score.sumar('Contractus', 10);
      
      setTimeout(() => {
        const newAliens = [...aliens];
        newAliens[alienIndex] = false;
        setAliens(newAliens);
        setShooting(false);
      }, 1000);
    } else {
      // ❌ Respuesta incorrecta: perder puntos
      setPlayerHit(true);
      score.restar('Contractus', 20); // Restar 30 puntos
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

    score.reset('Contractus');

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
          <p>Puntaje actual de Contractus: <strong>{score.puntaje.Contractus}</strong></p>
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
            <h3>Batalla por el Contrato Justo</h3>
            
            <div className="question-container">
              <div className="score">
                Puntos Contractus: <strong>{score.puntaje.Contractus}</strong>
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
          <p>Tu puntuación final: <strong>{score.puntaje.Contractus}</strong></p>
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

            <Link to="/planeta-explotarius" className='next-button-2'>Viajar al siguiente planeta</Link>
            
          </div>
        </div>
      )}
    </section>
  );
};

export default PreguntasContractus;