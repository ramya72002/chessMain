import React from 'react';
import './PuzzleArena.scss';

const PuzzleArena = () => {
  return (
    <div className="puzzle-arena-container">
      <div className="header">
        <p>Hi Sumit</p>
        <p>Your Puzzle Arena Score is .....</p>
      </div>
      <div className="score-section">
        <div className="score-item">Opening Arena</div>
        <div className="score-item">Middlegame Arena</div>
        <div className="score-item">Endgame Arena</div>
        <div className="score-total">
          <p>Puzzle Arena Score</p>
          <p>276</p>
        </div>
      </div>
      <div className="theme-practice">
        <p>Live Arena</p>
        <div className="practice-item">
        <p>Upcoming Live Arena</p>
        <p>05-Aug-2024</p>
        <p>10:00 A.M</p>
        <button className="start-button">Join</button>
        </div>
      </div>
     
      <div className="theme-practice">
        <p>Theme Based Practice</p>
        <div className="practice-item">
          <p>Endgame: Advanced Checkmates</p>
          <p>Not Started</p>
          <p>0/10</p>
          <button className="start-button">Start</button>
        </div>
        <div className="practice-item">
          <p>Middlegame: Tactical Motifs</p>
          <p>Started</p>
          <p>2/10</p>
          <button className="return-button">Return</button>
        </div>
        <div className="practice-item">
          <p>Opening: Puzzles</p>
          <p>Completed</p>
          <p>8/10</p>
          <button className="completed-button">View</button>
        </div>
      </div>
    </div>
  );
};

export default PuzzleArena;
