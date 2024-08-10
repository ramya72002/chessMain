'use client';
import React, { useEffect, useState } from 'react';
import './puzzleArena.scss';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserDetails } from '../types/types';

const PuzzleArena = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        
        if (storedUserDetails) {
          setUserDetails(storedUserDetails);
          try {
            const response = await axios.get(`https://backend-chess-tau.vercel.app/get_level?level=${storedUserDetails.level}`);
            setLevelData(response.data);  // Assuming the response has relevant data
          } catch (error) {
            console.error('Error fetching level data:', error);
          }
        }
      }
    };
    
    fetchUserDetails();
  }, []);

  const handleButtonClick = (title: string) => {
    if (userDetails?.level) {
      router.push(`/startArena?title=${encodeURIComponent(title)}&level=${encodeURIComponent(userDetails.level)}`);
    }
  };

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
            <button className="start-button" onClick={() => handleButtonClick('Upcoming Live Arena')}>Join</button>
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
