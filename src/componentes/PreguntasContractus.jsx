import { useState, useEffect } from 'react';
import '../css/preguntas.css'; // Asegúrate de tener este archivo CSS para estilos

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
    question: "¿Cuántas horas constituyen la jornada laboral máxima en México?",
    options: [
      "40 horas por semana",
      "48 horas por semana",
      "45 horas por semana"
    ],
    correctAnswer: 1
  },
  {
    question: "¿Qué derecho tiene un trabajador después de un año de servicio?",
    options: [
      "15 días de vacaciones pagadas",
      "6 días de vacaciones pagadas",
      "20 días de vacaciones pagadas"
    ],
    correctAnswer: 0
  }
];

const PreguntasContractus = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(100);
  const [aliens, setAliens] = useState([true, true, true]);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shooting, setShooting] = useState(false);
  const [hitAlien, setHitAlien] = useState(null);
  const [playerHit, setPlayerHit] = useState(false);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      // Find first alive alien to shoot
      const alienIndex = aliens.findIndex(alien => alien);
      setHitAlien(alienIndex);
      setShooting(true);
      setTimeout(() => {
        const newAliens = [...aliens];
        newAliens[alienIndex] = false;
        setAliens(newAliens);
        setShooting(false);
      }, 1000);
    } else {
      setPlayerHit(true);
      setScore(prev => Math.max(0, prev - 30));
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
    setScore(100);
    setAliens([true, true, true]);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShooting(false);
    setHitAlien(null);
    setPlayerHit(false);
  };

  // Check if all aliens are defeated
  useEffect(() => {
    if (aliens.every(alien => !alien)) {
      setTimeout(() => setGameOver(true), 1000);
    }
  }, [aliens]);

  return (
    <section className="game-container padding">
      
      {!gameOver ? (
        <div className="battle-screen">
        

            <div>
                <h3>Batalla por el Contrato Justo</h3>
            
                <div className="question-container">
                    <div className="score">Puntos: {score}</div>
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
                        <p>{isCorrect ? '¡Correcto! Has eliminado un alien.' : 'Incorrecto. Has perdido puntos.'}</p>
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
          <h2>Juego Terminado</h2>
          <p>Tu puntuación final: {score}</p>
          <p>{aliens.every(alien => !alien) ? '¡Felicidades! Has derrotado a todos los aliens.' : 'Inténtalo de nuevo para mejorar.'}</p>
          <button onClick={resetGame} className="reset-button">Jugar de Nuevo</button>
        </div>
      )}
    </section>
  );
};

export default PreguntasContractus;