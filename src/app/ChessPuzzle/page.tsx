"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import './ChessPuzzle.scss';

const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false });

// Define types for lastMovedPiece
interface LastMovedPiece {
  piece: string;
  target: string;
}


const ChessPuzzle = () => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // State to track correctness of move
  const [selectedPuzzle, setSelectedPuzzle] =useState<string | null>(null);
  const [lastMovedPiece, setLastMovedPiece] = useState<LastMovedPiece | null>(null);

  const updatePuzzleScore = async () => {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

    if (!userDetails || !userDetails.email) {
      console.error('User details not found in localStorage');
      return;
    }

    try {
      const response = await fetch('https://backend-chess-tau.vercel.app/updatepuzzlescore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userDetails.email,
          addscoretopuzzle: 1,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Puzzle score updated successfully');
      } else {
        console.error('Failed to update puzzle score:', result.message);
      }
    } catch (error) {
      console.error('Error updating puzzle score:', error);
    }
  };

  // Function to handle move verification based on selected puzzle
  const handleMove = (sourceSquare: any, targetSquare: any) => {
    let isCorrectMove = false;

    // Replace with puzzle-specific logic based on selectedPuzzle
    switch (selectedPuzzle) {
      case 'king':
        isCorrectMove = isKingMoveValid(sourceSquare, targetSquare);
        break;
      case 'queen':
        isCorrectMove = isQueenMoveValid(sourceSquare, targetSquare);
        break;
      case 'rook':
        isCorrectMove = isRookMoveValid(sourceSquare, targetSquare);
        break;
      case 'bishop':
        isCorrectMove = isBishopMoveValid(sourceSquare, targetSquare);
        break;
      case 'knight':
        isCorrectMove = isKnightMoveValid(sourceSquare, targetSquare);
        break;
      case 'pawn':
        isCorrectMove = isPawnMoveValid(sourceSquare, targetSquare);
        break;
      default:
        break;
    }

    setIsCorrect(isCorrectMove);
    setLastMovedPiece({ piece: sourceSquare, target: targetSquare });

    if (isCorrectMove) {
      updatePuzzleScore();
    }
  };

  useEffect(() => {
    if (lastMovedPiece) {
      const timer = setTimeout(() => {
        setLastMovedPiece(null);
      }, 2000); // Clear highlight after 2 seconds

      return () => clearTimeout(timer); // Clean up the timer on component unmount or when lastMovedPiece changes
    }
  }, [lastMovedPiece]);

  // Function to check if the King move is valid
  const isKingMoveValid = (sourceSquare: any, targetSquare: string) => {
    // Define valid target positions for the King puzzle
    const validPositions = ['e6', 'e4', 'd5', 'f5', 'd4', 'd6', 'f4', 'f6'];

    // Check if the target square is in the list of valid positions
    return validPositions.includes(targetSquare);
  };

  // Function to check if the Queen move is valid
  const isQueenMoveValid = (sourceSquare: any, targetSquare: string) => {
    // Define valid target positions for the Queen puzzle
    const validPositions = [
      'a1', 'b1', 'c1', 'e1', 'f1', 'g1', 'h1', // Horizontal moves
      'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', // Vertical moves
      'a4', 'b3', 'c2', 'e2', 'f3', 'g4', 'h5'  // Diagonal moves
    ];
    return validPositions.includes(targetSquare);
  };

  // Function to check if the Rook move is valid
  const isRookMoveValid = (sourceSquare: any, targetSquare: string) => {
    const validPositions = [
      'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', // Horizontal moves
      'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8'  // Vertical moves
    ];
    return validPositions.includes(targetSquare);
  };

  // Function to check if the Bishop move is valid
  const isBishopMoveValid = (sourceSquare: any, targetSquare: string) => {
    const validPositions = [
      'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', // Diagonal moves towards bottom-right (northeast)
      'a7', 'b6', 'c5', 'e3', 'f2', 'g1'        // Diagonal moves towards top-left (southwest)
    ];
    return validPositions.includes(targetSquare);
  };

  // Function to check if the Knight move is valid
  const isKnightMoveValid = (sourceSquare: any, targetSquare: string) => {
    const validPositions = [
      'c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6' // L-shaped moves
    ];
    return validPositions.includes(targetSquare);
  };

  // Function to check if the Pawn move is valid
  const isPawnMoveValid = (sourceSquare: any, targetSquare: string) => {
    // Example valid moves for a pawn puzzle
    const validPositions = ['d3', 'd4'];
    return validPositions.includes(targetSquare);
  };

  // Function to handle puzzle selection
  const selectPuzzle = (puzzle: React.SetStateAction<string | null>) => {
    setSelectedPuzzle(puzzle);
    setIsCorrect(null); // Reset correctness state when changing puzzles
  };

  // Function to handle going back to the puzzle selection screen
  const goBack = () => {
    setSelectedPuzzle(null);
    setIsCorrect(null);
  };

  // Function to handle moving to the next puzzle
  const nextPuzzle = () => {
    const puzzleOrder = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
  
    setSelectedPuzzle(prevPuzzle => {
      if (prevPuzzle === null) {
        // Default to the first puzzle if the previous puzzle is null
        return puzzleOrder[0];
      }
  
      const currentIndex = puzzleOrder.indexOf(prevPuzzle);
      if (currentIndex === -1) {
        // If the previous puzzle is not found in the order, default to the first puzzle
        return puzzleOrder[0];
      }
  
      const nextIndex = (currentIndex + 1) % puzzleOrder.length;
      return puzzleOrder[nextIndex];
    });
  
    setIsCorrect(null);
  };
  

  // Render different puzzles based on selectedPuzzle
  let puzzleComponent;
  switch (selectedPuzzle) {
    case 'king':
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="puzzle-title">Chess Puzzle: King Puzzle</h2>
          <p className="puzzle-instructions">Drag the King to the right position to solve the puzzle:</p>
          <div className="chessboard-container">
            <Chessboard
              position={{ e5: 'wK' }} // Only the White King on e5
              width={300}
              draggable={true}
              dropOffBoard="trash" // Allow dragging off the board to reset
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove(sourceSquare, targetSquare)
              }
              squareStyles={
                lastMovedPiece
                  ? { [lastMovedPiece.target]: { backgroundColor: 'yellow' } }
                  : {}
              }
            />
          </div>
          {isCorrect === true && <p className="correct-feedback">Move is correct!</p>}
          {isCorrect === false && <p className="incorrect-feedback">Move is incorrect.</p>}
          <div className="button-container">
            <button className="go-back-button" onClick={goBack}>Go Back</button>
            <button className="next-puzzle-button" onClick={nextPuzzle}>Next Puzzle</button>
          </div>
        </div>
      );
      break;
    case 'queen':
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="puzzle-title">Chess Puzzle: Queen Puzzle</h2>
          <p className="puzzle-instructions">Drag the Queen to the right position to solve the puzzle:</p>
          <div className="chessboard-container">
            <Chessboard
              position={{ d1: 'wQ' }} // Only the White Queen on d1
              width={300}
              draggable={true}
              dropOffBoard="trash" // Allow dragging off the board to reset
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove(sourceSquare, targetSquare)
              }
              squareStyles={
                lastMovedPiece
                  ? { [lastMovedPiece.target]: { backgroundColor: 'yellow' } }
                  : {}
              }
            />
          </div>
          {isCorrect === true && <p className="correct-feedback">Move is correct!</p>}
          {isCorrect === false && <p className="incorrect-feedback">Move is incorrect.</p>}
          <div className="button-container">
            <button className="go-back-button" onClick={goBack}>Go Back</button>
            <button className="next-puzzle-button" onClick={nextPuzzle}>Next Puzzle</button>
          </div>
        </div>
      );
      break;
    case 'rook':
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="puzzle-title">Chess Puzzle: Rook Puzzle</h2>
          <p className="puzzle-instructions">Drag the Rook to the right position to solve the puzzle:</p>
          <div className="chessboard-container">
            <Chessboard
              position={{ d4: 'wR' }} // Only the White Rook on d4
              width={300}
              draggable={true}
              dropOffBoard="trash" // Allow dragging off the board to reset
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove(sourceSquare, targetSquare)
              }
              squareStyles={
                lastMovedPiece
                  ? { [lastMovedPiece.target]: { backgroundColor: 'yellow' } }
                  : {}
              }
            />
          </div>
          {isCorrect === true && <p className="correct-feedback">Move is correct!</p>}
          {isCorrect === false && <p className="incorrect-feedback">Move is incorrect.</p>}
          <div className="button-container">
            <button className="go-back-button" onClick={goBack}>Go Back</button>
            <button className="next-puzzle-button" onClick={nextPuzzle}>Next Puzzle</button>
          </div>
        </div>
      );
      break;
    case 'bishop':
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="puzzle-title">Chess Puzzle: Bishop Puzzle</h2>
          <p className="puzzle-instructions">Drag the Bishop to the right position to solve the puzzle:</p>
          <div className="chessboard-container">
            <Chessboard
              position={{ d4: 'wB' }} // Only the White Bishop on d4
              width={300}
              draggable={true}
              dropOffBoard="trash" // Allow dragging off the board to reset
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove(sourceSquare, targetSquare)
              }
              squareStyles={
                lastMovedPiece
                  ? { [lastMovedPiece.target]: { backgroundColor: 'yellow' } }
                  : {}
              }
            />
          </div>
          {isCorrect === true && <p className="correct-feedback">Move is correct!</p>}
          {isCorrect === false && <p className="incorrect-feedback">Move is incorrect.</p>}
          <div className="button-container">
            <button className="go-back-button" onClick={goBack}>Go Back</button>
            <button className="next-puzzle-button" onClick={nextPuzzle}>Next Puzzle</button>
          </div>
        </div>
      );
      break;
    case 'knight':
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="puzzle-title">Chess Puzzle: Knight Puzzle</h2>
          <p className="puzzle-instructions">Drag the Knight to the right position to solve the puzzle:</p>
          <div className="chessboard-container">
            <Chessboard
              position={{ d4: 'wN' }} // Only the White Knight on d4
              width={300}
              draggable={true}
              dropOffBoard="trash" // Allow dragging off the board to reset
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove(sourceSquare, targetSquare)
              }
              squareStyles={
                lastMovedPiece
                  ? { [lastMovedPiece.target]: { backgroundColor: 'yellow' } }
                  : {}
              }
            />
          </div>
          {isCorrect === true && <p className="correct-feedback">Move is correct!</p>}
          {isCorrect === false && <p className="incorrect-feedback">Move is incorrect.</p>}
          <div className="button-container">
            <button className="go-back-button" onClick={goBack}>Go Back</button>
            <button className="next-puzzle-button" onClick={nextPuzzle}>Next Puzzle</button>
          </div>
        </div>
      );
      break;
    case 'pawn':
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="puzzle-title">Chess Puzzle: Pawn Puzzle</h2>
          <p className="puzzle-instructions">Drag the Pawn to the right position to solve the puzzle:</p>
          <div className="chessboard-container">
            <Chessboard
              position={{ d2: 'wP' }} // Only the White Pawn on d2
              width={300}
              draggable={true}
              dropOffBoard="trash" // Allow dragging off the board to reset
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove(sourceSquare, targetSquare)
              }
              squareStyles={
                lastMovedPiece
                  ? { [lastMovedPiece.target]: { backgroundColor: 'yellow' } }
                  : {}
              }
            />
          </div>
          {isCorrect === true && <p className="correct-feedback">Move is correct!</p>}
          {isCorrect === false && <p className="incorrect-feedback">Move is incorrect.</p>}
          <div className="button-container">
            <button className="go-back-button" onClick={goBack}>Go Back</button>
            <button className="next-puzzle-button" onClick={nextPuzzle}>Next Puzzle</button>
          </div>
        </div>
      );
      break;
    default:
      puzzleComponent = (
        <div className="puzzle-container1">
          <h2 className="main-title">Select a Chess Puzzle</h2>
          <ul>
          <li className="puzzle-option text-center" onClick={() => selectPuzzle('king')}>King Puzzle</li>
          <li className="puzzle-option text-center" onClick={() => selectPuzzle('queen')}>Queen Puzzle</li>
          <li className="puzzle-option text-center" onClick={() => selectPuzzle('rook')}>Rook Puzzle</li>
          <li className="puzzle-option text-center" onClick={() => selectPuzzle('bishop')}>Bishop Puzzle</li>
          <li className="puzzle-option text-center" onClick={() => selectPuzzle('knight')}>Knight Puzzle</li>
          <li className="puzzle-option text-center" onClick={() => selectPuzzle('pawn')}>Pawn Puzzle</li>
          </ul>
        </div>
      );
      break;
  }

  return <div className="chess-puzzle">{puzzleComponent}</div>;
};

export default ChessPuzzle;
