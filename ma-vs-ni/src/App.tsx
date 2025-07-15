import { useState, useEffect } from 'react';
import './App.css';
import { GameState, Question } from './types';
import { questions } from './data/questions';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: {
      massachusetts: 0,
      niigata: 0
    },
    answeredQuestions: [],
    lastAnswer: null,
    gameOver: false
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    selectNewQuestion();
  }, []);

  const selectNewQuestion = () => {
    const unansweredQuestions = questions.filter(
      q => !gameState.answeredQuestions.includes(q.id)
    );
    
    if (unansweredQuestions.length === 0) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      return;
    }

    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
    setShowResult(false);
    setGameState(prev => ({ ...prev, lastAnswer: null }));
  };

  const handleAnswer = (answer: 'massachusetts' | 'niigata') => {
    if (!currentQuestion || showResult) return;

    const isCorrect = answer === currentQuestion.answer;
    const newScore = {
      ...gameState.score,
      [answer]: gameState.score[answer] + (isCorrect ? 1 : 0)
    };

    setGameState(prev => ({
      ...prev,
      score: newScore,
      answeredQuestions: [...prev.answeredQuestions, currentQuestion.id],
      lastAnswer: {
        correct: isCorrect,
        explanation: currentQuestion.explanation
      }
    }));

    setShowResult(true);

    setTimeout(() => {
      if (gameState.answeredQuestions.length + 1 >= 10) {
        setGameState(prev => ({ ...prev, gameOver: true }));
      } else {
        selectNewQuestion();
      }
    }, 3000);
  };

  const resetGame = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: {
        massachusetts: 0,
        niigata: 0
      },
      answeredQuestions: [],
      lastAnswer: null,
      gameOver: false
    });
    selectNewQuestion();
  };

  if (gameState.gameOver) {
    const winner = gameState.score.massachusetts > gameState.score.niigata 
      ? 'Massachusetts' 
      : gameState.score.niigata > gameState.score.massachusetts 
      ? 'Niigata' 
      : 'Tie';

    return (
      <div className="game-container">
        <h1>Game Over!</h1>
        <div className="game-over">
          <h2>
            {winner === 'Tie' ? "It's a tie!" : `${winner} Wins!`}
          </h2>
          <div className="final-scores">
            <div className="final-score-item">
              <h3>🇺🇸 Massachusetts</h3>
              <div className="final-score">{gameState.score.massachusetts}</div>
            </div>
            <div className="final-score-item">
              <h3>🇯🇵 Niigata</h3>
              <div className="final-score">{gameState.score.niigata}</div>
            </div>
          </div>
          <button className="play-again-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Massachusetts vs Niigata Prefecture</h1>
      
      <div className="score-board">
        <div className="score-item">
          <h2>🇺🇸 Massachusetts</h2>
          <div className="score">{gameState.score.massachusetts}</div>
        </div>
        <div className="score-item">
          <h2>🇯🇵 Niigata</h2>
          <div className="score">{gameState.score.niigata}</div>
        </div>
      </div>

      {currentQuestion && (
        <div className="question-card">
          <h3>Category: {currentQuestion.category}</h3>
          <p className="question-text">{currentQuestion.question}</p>
          
          <div className="answers">
            <button 
              className="answer-button massachusetts"
              onClick={() => handleAnswer('massachusetts')}
              disabled={showResult}
            >
              <span className="flag-icon">🇺🇸</span>
              Massachusetts
            </button>
            <button 
              className="answer-button niigata"
              onClick={() => handleAnswer('niigata')}
              disabled={showResult}
            >
              <span className="flag-icon">🇯🇵</span>
              Niigata
            </button>
          </div>

          {showResult && gameState.lastAnswer && (
            <div className={`result ${gameState.lastAnswer.correct ? 'correct' : 'incorrect'}`}>
              <p>{gameState.lastAnswer.correct ? '✓ Correct!' : '✗ Incorrect!'}</p>
              <p>{gameState.lastAnswer.explanation}</p>
              {currentQuestion.value && <p><em>{currentQuestion.value}</em></p>}
            </div>
          )}
        </div>
      )}

      <p>Question {gameState.answeredQuestions.length + 1} of 10</p>
    </div>
  );
}

export default App;