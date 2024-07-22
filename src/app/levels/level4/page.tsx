"use client"
import React from 'react';
import './Level4.scss';
import Image from 'next/image';
import step1Image from './images/step1.png';

const Level4 = () => {
  return (
    <div className="chess-instructions">
      <h1><b>Practice By Playing Lots Of Games</b></h1>
      <p>The most important thing you can do to get better at chess is to play lots of chess! It doesnt matter if you play at home with friends or family, or play online, you have to play the game a lot to improve. These days its easy to find a game of chess online!</p>
      <div className="iframe-container">
      <iframe width="960" height="520" src="https://www.youtube.com/embed/Cwf-txEEcS0" title="Chess.com: Play, Learn, And Share" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>      </div>

      <h2>How To Play Chess Variants</h2>
      <p>While most people play standard chess rules, some people like to play chess with changes to the rules. These are called chess variants. Each variant has its own rules:</p>
      <ul>
        <li><strong>Chess960:</strong> In Chess960 (Fischer Random), the initial position of the pieces is set at random. Pawns keep their normal initial position but the rest of the pieces are arranged randomly.</li>
        <li><strong>King Of The Hill:</strong> In this format, the goal is to get your king to the center of the board or top of the hill.</li>
        <li><strong>Bughouse:</strong> This format is played in pairs. When one player captures a piece from the opponent, this piece will become available to his or her teammate. For example: If I play as White and my teammate, who is Black, takes a white knight from her opponent, in my turn I will have a knight that I can put on any free square on my board. I can do so in any of my future turns.</li>
        <li><strong>Crazyhouse:</strong> This is a very exciting format since it allows you to use the pieces you take from your opponent. That is, if I play as White and I take a black pawn from my opponent, that pawn will turn into a white pawn that I can put on the board as part of my army. I can do so in any of my future turns.</li>
        <li><strong>3-Check:</strong> In this format, the first player who checks the opponents king three times, wins.</li>
      </ul>

      <div className="variants-recommendation">
        <strong>Recommended Article :</strong> 5 Amazing Chess Variants
      </div>
      <h1>How To Play Chess960</h1>
      <p>Chess960 follows all the rules of standard chess, except for the starting position of pieces on the back rank, which are placed randomly in one of 960 possible positions. Castling is done just like in standard chess, with the King and Rook landing on their normal castled squares (g1 and f1, or c1 and d1). 960 plays just like standard chess, but with more variety in the opening.</p> 

      <div>
        <Image
          src={step1Image}
          alt="Chess pieces value"
          className="chess-image"
          // layout="fill" // Fill the container, can adjust sizing in CSS
        />
      </div>

      <h1>How To Play With Chess Tournament Rules</h1>
      <p>Many tournaments follow a set of common, similar rules. These rules do not necessarily apply to play at home or online, but you may want to practice with them anyway.</p>
      <h2>Touch-move</h2>
      <p>If a player touches one of their own pieces they must move that piece as long as it is a legal move. If a player touches an opponents piece, they must capture that piece. A player who wishes to touch a piece only to adjust it on the board must first announce the intention, usually by saying “adjust”.</p>

      <h2>Clocks and Timers</h2>
      <p>Most tournaments use timers to regulate the time spent on each game, not on each move. Each player gets the same amount of time to use for their entire game and can decide how to spend that time. Once a player makes a move they then touch a button or hit a lever to start the opponents clock. If a player runs out of time and the opponent calls the time, then the player who ran out of time loses the game (unless the opponent does not have enough pieces to checkmate, in which case it is a draw).</p>
    </div>
  );
};

export default Level4;