"use client" 
import React, { useEffect, useState } from 'react';

import './Level2.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import step1Image from './images/step1.gif';
import step2Image from './images/step2.gif';
import step3Image from './images/step3.gif'; 
import step6Image from './images/step6.png'; 

const Level2 = () => {
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
      <h1>Discover The Special Rules Of Chess</h1>
      <p>There are a few special rules in chess that may not seem logical at first. They were created to make the game more fun and interesting.</p>

      <h2>How To Promote A Pawn In Chess</h2>
      <p>Pawns have another special ability and that is that if a pawn reaches the other side of the board it can become any other chess piece (called promotion) excluding a king (or pawn, for that matter).</p>
      <p>A pawn may be promoted to a knight, bishop, rook, or queen. A common misconception is that pawns may only be exchanged for a piece that has been captured. That is NOT true. A pawn is usually promoted to a queen. Only pawns may be promoted.</p>
      <div className="chess-image-container">
        <Image
          src={step1Image}
          alt="How to promote a pawn in chess"
          className="chess-image"
          layout="fill"
        />
      </div>

      <h2>How To Do  En Passant In Chess</h2>
      <p>The last rule about pawns is called “en passant,” which is French for “in passing”. If a pawn moves out two squares on its first move, and by doing so lands to the side of an opponents pawn (effectively jumping past the other pawns ability to capture it), that other pawn has the option of capturing the first pawn as it passes by.</p>
      <p>This special move must be done immediately after the first pawn has moved past, otherwise the option to capture it is no longer available. Click through the example below to better understand this odd, but important rule.</p>
      <div className="chess-image-container">
        <Image
          src={step2Image}
          alt="Chess en passant"
          className="chess-image"
          layout="fill"
        />
      </div>

      <h2>How To Castle In Chess</h2>
      <p>One other special chess rule is called castling. This move allows you to do two important things all in one move: get your king to safety (hopefully), and get your rook out of the corner and into the game. On a players turn he may move his king two squares over to one side and then move the rook from that sides corner to right next to the king on the opposite side. (See the example below.) However, in order to castle, the following conditions must be met:</p>
      <ul>
        <li>it must be that kings very first move</li>
        <li>it must be that rooks very first move</li>
        <li>there cannot be any pieces between the king and rook to move</li>
        <li>the king may not be in check or pass through check</li>
      </ul>
      <p>Notice that when you castle one direction the king is closer to the side of the board. That is called castling kingside. Castling to the other side, through where the queen sat, is called castling queenside. Regardless of which side, the king always moves only two squares when castling.</p>
      <div className="chess-image-container">
        <Image
          src={step3Image}
          alt="How to castle in chess"
          className="chess-image"
          layout="fill"
        />
      </div>

      <h2>Find Out Who Makes The First Move In Chess</h2>
      <p>The player with the white pieces always moves first. Therefore, players generally decide who will get to be white by chance or luck such as flipping a coin or having one player guess the color of the hidden pawn in the other players hand. White then makes a move, followed by black, then white again, then black, and so on until the end of the game. Being able to move first is a tiny advantage that gives the white player an opportunity to attack right away.</p>

      <h2>Review The Rules Of How To Win A Game Of Chess</h2>
      <p>There are several ways to end a game of chess: by checkmate, with a draw, by resignation, by forfeit on time...</p>

      <h3>How To Checkmate In Chess</h3>
      <p>The purpose of the game is to checkmate the opponents king. This happens when the king is put into check and cannot get out of check.</p>

      <div className="iframe-container">
        <iframe width="960" height="540" src="https://www.youtube.com/embed/5qY3aIp4sTw" title="The Fastest Checkmates in Chess" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div> 

      <h3>There are only three ways a king can get out of check:</h3>
      <ul>
        <li>move out of the way (though he cannot castle!)</li>
        <li>block the check with another piece or</li>
        <li>capture the piece threatening the king.</li>
      </ul>
      <div className="iframe-container">
      <iframe width="960" height="540" src="https://www.youtube.com/embed/vjJkdBXVgsk" title="Getting Out Of Check | How to Play Chess #shorts" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <p>If a king cannot escape checkmate then the game is over. Customarily the king is not captured or removed from the board, the game is simply declared over.</p>
      <div className="iframe-container">
      <iframe width="960" height="540" src="https://www.youtube.com/embed/uu7ISsU-Ufw" title="Checkmate | How to Play Chess #shorts" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <p>Checkmate can happen in the early stages of the game if one of the players does not act carefully. Below, you will find an example of the Fools mate, a checkmate that happens in just 2 moves.</p>
      <div className="iframe-container">
      <iframe width="960" height="540" src="https://www.youtube.com/embed/5qY3aIp4sTw" title="The Fastest Checkmates in Chess" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

      <h3>How To Draw A Chess Game</h3>
      <p>Occasionally chess games do not end with a winner, but with a draw. There are 5 reasons why a chess game may end in a draw:</p>
      <ul>
        <li>The position reaches a stalemate where it is one players turn to move, but his king is NOT in check and yet he does not have another legal move:</li>
        <li>The players may simply agree to a draw and stop playing</li>
        <li>There are not enough pieces on the board to force a checkmate (example: a king and a bishop vs. a king)</li>
        <li>A player declares a draw if the same exact position is repeated three times (though not necessarily three times in a row)</li>
        <li>Fifty consecutive moves have been played where neither player has moved a pawn or captured a piece</li>
      </ul>
      <div className="chess-image-container">
        <Image
          src={step6Image}
          alt="Chess stalemate"
          className="chess-image"
          layout="fill"
        />
      </div>
      {userDetails?.level === "level2" && (
        <button className="level-test-button" onClick={() => router.push('/levels/level3test')}>
          Take Level 2 Test to Proceed to Level 3
        </button>
      )}</div>
  );
};

export default Level2;