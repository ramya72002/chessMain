'use client'
import React, { useState, useEffect } from 'react';
import './insidepuzzlearena.scss';

const PuzzlePage: React.FC = () => {
  const [timer, setTimer] = useState<number>(0); // Timer in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false); // Timer running status

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      if (interval) {
        window.clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isRunning, timer]);

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="puzzle-container">
      <h1>Endgame: Advanced Checkmates</h1>
      <div className="puzzle-content">
        <div className="chessboard">
          <img src="/images/chessboard.png" alt="Chessboard" />
          <div className="move-indicator">Black to Move</div>
        </div>
        <div className="puzzle-info">
          <h2>Puzzle - 1</h2>
          <button className="timer-btn" onClick={handleStartTimer}>
            <img src="/images/starttimer.png" alt="Start Timer" />
            Start Timer
            <div className="timer-display">
            <h3>: {formatTime(timer)}</h3>
          </div>
          </button>
          <button className="solution-btn">
            <img src="/images/solution.png" alt="Solution" />Solution
          </button>
          <button className="ask-sid-btn">
            <img src="/images/sid.png" alt="Ask SID" />
            Ask SID
          </button>
          
        </div>
      </div>
      <div className="response-buttons">
        <button className="correct-btn">Got it Right</button>
        <button className="incorrect-btn">Missed It</button>
      </div>
      <p className="explanation">
        * You ‘Got it Right’ because you were able to correctly identify the first two moves as mentioned in the ‘Solution’ tab above, else you would have marked as ‘Missed it’, correct?
      </p>
    </div>
  );
};

export default PuzzlePage;
