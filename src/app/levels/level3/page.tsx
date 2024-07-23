"use client"
import React, { useEffect, useState } from 'react';

import './Level3.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import step6Image from './images/step6.gif'; 

const Level3 = () => {
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
      <h2>Study Basic Chess Strategies</h2>
      <p>There are four simple things that every chess player should know:</p>

      <h3>Protect Your King</h3>
      <p>Get your king to the corner of the board where he is usually safer. Dont put off castling. You should usually castle as quickly as possible. Remember, it doesnt matter how close you are to checkmating your opponent if your own king is checkmated first!</p>

      <h3>Dont Give Pieces Away</h3>
      <p>Dont carelessly lose your pieces! Each piece is valuable and you cant win a game without pieces to checkmate. There is an easy system that most players use to keep track of the relative value of each chess piece. How much are the chess pieces worth?</p>
      <ul>
        <li>A pawn is worth 1</li>
        <li>A knight is worth 3</li>
        <li>A bishop is worth 3</li>
        <li>A rook is worth 5</li>
        <li>A queen is worth 9</li>
        <li>The king is infinitely valuable</li>
      </ul>
      <p>At the end of the game, these points dont mean anything—it is simply a system you can use to make decisions while playing, helping you know when to capture, exchange, or make other moves.</p>

      <div className="chess-image-container">
        <Image
          src={step6Image}
          alt="Chess pieces value"
          className="chess-image"
          layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <h3>Control The Center Of The Chessboard</h3>
      <p>You should try and control the center of the board with your pieces and pawns. If you control the center, you will have more room to move your pieces and will make it harder for your opponent to find good squares for his pieces. In the example above white makes good moves to control the center while black plays bad moves.</p>
      <div className="iframe-container">
      <iframe width="960" height="520" src="https://www.youtube.com/embed/xjwTVIERKjM" title="Moving &amp; Capturing | How to Play Chess" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>      
      </div>

      <h3>Use All Of Your Chess Pieces</h3>
      <p>In the example above white got all of his pieces in the game! Your pieces dont do any good when they are sitting back on the first row. Try and develop all of your pieces so that you have more to use when you attack the king. Using one or two pieces to attack will not work against any decent opponent.</p>
      <div className="iframe-container">
      <iframe width="960" height="520" src="https://www.youtube.com/embed/ffRmXZZDuWM" title="Good Moves | How to Play Chess" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      {userDetails?.level === "level3" && (
        <button className="level-test-button" onClick={() => router.push('/levels/level4test')}>
          Take Level 3 Test to Proceed to Level 4
        </button>
      )}</div>
  );
};

export default Level3;