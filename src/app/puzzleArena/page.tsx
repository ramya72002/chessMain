'use client';
import React, { useEffect, useState } from 'react';
import './puzzleArena.scss';
import { useRouter } from 'next/navigation';
import { UserDetails } from '../types/types';

const PuzzleArena = () => {
  const router = useRouter();
  const handleButtonClick = (title:string) => {
    

       // Assuming the route for /startArena accepts query parameters
      router.push(`/startArena?title=${encodeURIComponent(title)}`);
    };
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
      const fetchUserDetails = async () => {
        if (typeof window !== 'undefined') {
          const userDetailsString = localStorage.getItem('userDetails');
          const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

          setUserDetails(storedUserDetails);
          // You can add logic to handle userDetailsString here
        }
      };
    
      fetchUserDetails();
    }, []);
    

  return (
    <div className="puzzle-arena-container">
      <div className="top-section">
        <div className="left-section">
          <img src="/images/puzzlearena.png" alt="Puzzle Arena" />
        </div>
        
        <div className="right-section">
          <div className="header">
            <p>Hi {userDetails ? userDetails.name : 'Student'}</p>
            <p>Your Puzzle Arena Score is .....</p>
          </div>
          
          <div className="arena-scores">
            <div className="score-item">Opening Arena</div>
            <div className="score-item">Middlegame Arena</div>
            <div className="score-item">Endgame Arena</div>
            <div className="total-score">Puzzle Arena Score <span>276</span></div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="theme-practice live-arena">
          <p>Live Arena</p>
          <div className="practice-item">
            <p>Upcoming Live Arena</p>
            <p>05-Aug-2024</p>
            <p>10:00 A.M</p>
            <button className="start-button" onClick={() => handleButtonClick('UpcomingLiveArena')}>Join</button>
          </div>
        </div>
        
        <div className="theme-practice">
          <p>Theme Based Practice</p>
          <div className="practice-item">
            <p>Endgame: Advanced Checkmates</p>
            <p>Not Started</p>
            <p>0/10</p>
            <button className="start-button" onClick={() => handleButtonClick('EndgameAdvancedCheckmates')}>Start</button>
          </div>
          <div className="practice-item">
            <p>Middlegame: Tactical Motifs</p>
            <p>Started</p>
            <p>2/10</p>
            <button className="return-button" onClick={() => handleButtonClick('MiddlegameTacticalMotifs')}>Return</button>
          </div>
          <div className="practice-item">
            <p>Opening: Puzzles</p>
            <p>Completed</p>
            <p>8/10</p>
            <button className="completed-button" onClick={() => handleButtonClick('OpeningPuzzles')}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleArena;
