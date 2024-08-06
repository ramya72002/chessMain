import React from 'react';
import './insidepuzzlearena.scss';

const PuzzlePage: React.FC = () => {
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
          <button className="timer-btn">Start Timer</button>
          <button className="solution-btn">Solution</button>
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
