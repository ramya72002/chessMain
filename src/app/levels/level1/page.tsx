"use client"
import React, { useEffect, useState } from 'react';
import './Level1.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import step1Image from './images/step1.gif';
import step2Image from './images/step2.gif';
import step3Image from './images/step3.gif';
import step4Image from './images/step4.gif';
import step5Image from './images/step5.gif';
import step6Image from './images/step6.gif';
import step7Image from './images/step7.gif';

const Level1 = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<{ level: string | null } | null>(null);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

    if(userDetails){
      setUserDetails(userDetails)
    }
   
    console.log("localStorage",userDetails.level)
  }, []);

  return (
    <div className="chess-instructions">
      <h1>How To Setup The Chessboard</h1>
      <p>At the beginning of the game the chessboard is laid out so that each player has the white (or light) color square in the bottom right-hand side.</p>
      <div className="chess-image-container">
        <Image
          src={step1Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>
      <h2>Set up Chess Board</h2>
      <p>The chess pieces are then arranged the same way each time. The second row (or rank) is filled with pawns. The rooks go in the corners, then the knights next to them, followed by the bishops, and finally the queen, who always goes on her own matching color (white queen on white, black queen on black), and the king on the remaining square.</p>
      
      <h3>Chess board</h3>
      <p>Set up the pieces at the beginning of the game will be really easy.</p>
      
      <div className="explorer-recommendation">
        <strong>Explorer Recommended Tool : </strong> Train your vision of the board
      </div>
      
      <h1>How The Chess Pieces Move</h1>
      <p>Each of the 6 different kinds of pieces moves differently. Pieces cannot move through other pieces (though the knight can jump over other pieces), and can never move onto a square with one of their own pieces. However, they can be moved to take the place of an opponents piece which is then captured. Pieces are generally moved into positions where they can capture other pieces (by landing on their square and then replacing them), defend their own pieces in case of capture, or control important squares in the game.</p>
     
      <h2>How to Move the King in Chess</h2>
      <p>The king is the most important piece, but is one of the weakest. The king can only move one square in any direction - up, down, to the sides, and diagonally.</p>
      <p>The king may never move himself into check (where he could be captured). When the king is attacked by another piece this is called check.</p>
      <div className="king-movement">King Chess Movement</div>
      <div className="chess-image-container">
        <Image
          src={step2Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>
      

      <h2>How To Move The Queen In Chess</h2>
      <p>The queen is the most powerful piece. She can move in any one straight direction - forward, backward, sideways, or diagonally - as far as possible as long as she does not move through any of her own pieces.</p>
      <p>And, like with all pieces, if the queen captures an opponents piece her move is over. Notice how the white queen captures the black queen and then the black king is forced to move.</p>
      <div className="queen-movement">Queen Chess Movement</div>

      <div className="chess-image-container">
        <Image
          src={step3Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <h2>How To Move The Rook In Chess</h2>
      <p>The rook may move as far as it wants, but only forward, backward, and to the sides.</p>
      <p>The rooks are particularly powerful pieces when they are protecting each other and working together!</p>
      <div className="rook-movement">Rook Chess Movement</div>

      <div className="chess-image-container">
        <Image
          src={step4Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <h2>How To Move The Bishop In Chess</h2>
      <p>The bishop may move as far as it wants, but only diagonally. Each bishop starts on one color (light or dark) and must always stay on that color.</p>
      <p>Bishops work well together because they cover up each others weaknesses.</p>
      <div className="bishop-movement">Bishop Chess Movement</div>

      <div className="chess-image-container">
        <Image
          src={step5Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <h2>How To Move The Knight In Chess</h2>
      <p>Knights move in a very different way from the other pieces – going two squares in one direction, and then one more move at a 90-degree angle, just like the shape of an “L”.</p>
      <p>Knights are also the only pieces that can move over other pieces.</p>
      <div className="knight-movement">Knight Chess Movement</div>

      <div className="chess-image-container">
        <Image
          src={step6Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <h2>How To Move The Pawn In Chess</h2>
      <p>Pawns are unusual because they move and capture in different ways: they move forward but capture diagonally. Pawns can only move forward one square at a time, except for their very first move where they can move forward two squares.</p>
      <p>Pawns can only capture one square diagonally in front of them. They can never move or capture backward. If there is another piece directly in front of a pawn he cannot move past or capture that piece.</p>
      <div className="pawn-movement">Pawn Chess Movement</div>

      <div className="chess-image-container">
        <Image
          src={step7Image}
          alt="Set up Chess Board"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <div className="trophies-recommendation">
        <strong>Trophies Recommended Tool :</strong> Solitaire Chess (capture all your pieces)
      </div>
      
      {userDetails?.level === "level1" && (
        <button className="level-test-button" onClick={() => router.push('/levels/level2test')}>
          Take Level 1 Test to Proceed to Level 2
        </button>
      )}
    </div>
  );
};

export default Level1;
