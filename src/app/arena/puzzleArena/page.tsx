'use client';
import React, { useEffect, useState } from 'react';
import './puzzleArena.scss';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserDetails } from '../../types/types';

const PuzzleArena = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        
        if (storedUserDetails) {
          setUserDetails(storedUserDetails);
          try {
            const response = await axios.get(`https://backend-chess-tau.vercel.app/get_level?level=${storedUserDetails.level}`);
            const data = response.data;

            // Log the data to check its structure
            console.log('API response data:', data);

            // Adjust based on the actual structure of data
            if (data.image_sets && Array.isArray(data.image_sets)) {
              // Extract titles from the image_sets array
              const titlesList = data.image_sets.map((item: { title: string }) => item.title);
              setTitles(titlesList);
            } else {
              console.error('Unexpected data structure:', data);
            }
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
      router.push(`/arena/startArena?title=${encodeURIComponent(title)}&level=${encodeURIComponent(userDetails.level)}`);
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
            <button className="start-button" onClick={() => handleButtonClick('UpcomingLiveArena')}>Join</button>
          </div>
        </div>
        
        <div className="theme-practice">
          <p>Theme Based Practice</p>
          {titles.map((title, index) => (
            <div className="practice-item" key={index}>
              <p>{title}</p>
              <p>Status</p>
              <p>0/10</p>
              <button className="start-button" onClick={() => handleButtonClick(title)}>Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PuzzleArena;
