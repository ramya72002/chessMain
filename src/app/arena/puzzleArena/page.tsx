'use client';
import React, { useEffect, useState } from 'react';
import './puzzleArena.scss';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserDetails } from '../../types/types';

const PuzzleArena = () => {
  const router = useRouter();
  const levelMapping: Record<string, string> = {
    'level1': "Pawn",
    'level2': "Knight",
    'level3': "Bishop",
    'level4': "Rook",
    'level5': "Queen",
    'level6': "King"
  };
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [livePuzzles, setLivePuzzles] = useState<{ title: string; category: string; date_time: string }[]>([]);
  const [practicePuzzles, setPracticePuzzles] = useState<{ title: string; category: string; date_time: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

        if (storedUserDetails) {
          setUserDetails(storedUserDetails);
          try {
            const response = await axios.get(`https://backend-chess-tau.vercel.app/get_level?level=${levelMapping[storedUserDetails.level]}`);
            const data = response.data;

            if (data.image_sets && Array.isArray(data.image_sets)) {
              const livePuzzlesList = data.image_sets
                .filter((item: { live: string }) => item.live === 'Yes')
                .map((item: { title: string; category: string; date_time: string }) => ({
                  title: item.title,
                  category: item.category,
                  date_time: item.date_time
                }));

              const practicePuzzlesList = data.image_sets
                .filter((item: { live: string }) => item.live === 'No')
                .map((item: { title: string; category: string; date_time: string }) => ({
                  title: item.title,
                  category: item.category,
                  date_time: item.date_time
                }));

              setLivePuzzles(livePuzzlesList);
              setPracticePuzzles(practicePuzzlesList);
            } else {
              setError('Unexpected data structure received from the server.');
            }
          } catch (error) {
            setError('Failed to fetch level data. Please try again later.');
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
          {livePuzzles.length > 0 ? (
            livePuzzles.map((puzzle, index) => (
              <div className="practice-item" key={index}>
                <p>{puzzle.category}:{puzzle.title}</p>
                 <p>Date & Time: {puzzle.date_time}</p>
                <button className="start-button" onClick={() => handleButtonClick(puzzle.title)}>Start</button>
              </div>
            ))
          ) : (
            <p>No live puzzles available</p>
          )}
        </div>

        <div className="theme-practice">
          <p>Theme Based Practice</p>
          {practicePuzzles.length > 0 ? (
            practicePuzzles.map((puzzle, index) => (
              <div className="practice-item" key={index}>
                <p>{puzzle.category}:{puzzle.title}</p>
                <p>Date & Time: {puzzle.date_time}</p>
                <button className="start-button" onClick={() => handleButtonClick(puzzle.title)}>Start</button>
              </div>
            ))
          ) : (
            <p>No theme-based puzzles available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuzzleArena;
