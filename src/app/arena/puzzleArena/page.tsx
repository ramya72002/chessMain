'use client';
import React, { useEffect, useState } from 'react';
import './puzzleArena.scss';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserDetails } from '../../types/types';

// Define types for file_ids and puzzles
type FileIdDetail = {
  id: string;
  move: string;
  sid_link: string;
  solution: string;
};

type FileIds = {
  [key: string]: FileIdDetail;
};

type Puzzle = {
  title: string;
  category: string;
  date_time: string;
  file_ids?: FileIds; // file_ids is an optional dictionary of FileIdDetail
};

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
  const [livePuzzles, setLivePuzzles] = useState<Puzzle[]>([]);
  const [practicePuzzles, setPracticePuzzles] = useState<Puzzle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails  = userDetailsString ? JSON.parse(userDetailsString) : null; 
        const email=storedUserDetails.email
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
              console.log("count", data.image_sets);
              
              const livePuzzlesList = data.image_sets
                .filter((item: { live: string }) => item.live === 'Yes')
                .map((item: Puzzle) => ({
                      title: item.title,
                      category: item.category,
                      date_time: item.date_time,
                      file_ids: item.file_ids || {}  // Include file_ids, default to empty object if not present
                  }));
          
              const practicePuzzlesList = data.image_sets
                .filter((item: { live: string }) => item.live === 'No')
                .map((item: Puzzle) => ({
                  title: item.title,
                  category: item.category,
                  date_time: item.date_time,
                  file_ids: item.file_ids || {}  // Include file_ids, default to empty object if not present
                  }));
          
              setLivePuzzles(livePuzzlesList);
              setPracticePuzzles(practicePuzzlesList);
              console.log("li", livePuzzlesList);
              console.log("nli", practicePuzzlesList);
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

  const handleButtonClick = async (title: string, category: string, date_time: string,puzzle_no:number) => {
    if (userDetails?.email) { 
      console.log("pppno",puzzle_no)
  
      const createArenaApiUrl = 'https://backend-chess-tau.vercel.app/create_Arena_user';
      const imagesApiUrl = `https://backend-chess-tau.vercel.app/images/title?level=${encodeURIComponent(levelMapping[userDetails.level])}&category=${encodeURIComponent(category)}&title=${encodeURIComponent(title)}`;
    
      try {
        // 1. Call the /create_Arena_user API first
        const createArenaResponse = await axios.post(createArenaApiUrl, {
          email: userDetails.email,
          category,
          title,
          puzzle_no
        });
  
        console.log('Create Arena API Response:', createArenaResponse.data);
  
        if (createArenaResponse.data.success) {
          // 2. Proceed with the existing logic after successful Arena creation
          const imagesResponse = await axios.get(imagesApiUrl);
          console.log('Images API Response:', imagesResponse.data);
  
          // Navigate to the startArena page with additional parameters
          router.push(`/arena/startArena?title=${encodeURIComponent(title)}&level=${encodeURIComponent(levelMapping[userDetails.level])}&category=${encodeURIComponent(category)}&date_time=${encodeURIComponent(date_time)}`);
        } else {
          setError('Failed to create or update PuzzleArena. Please try again later.');
        }
          
      } catch (error) {
        console.error('Error during API calls:', error);
        setError('An error occurred while processing your request. Please try again later.');
      }
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
            <p className='title'>Puzzle Arena Performance Summary</p>
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
                <p>Score: 1/{Object.keys(puzzle.file_ids || {}).length}</p>
                {/* Dynamically calculate puzzle_no */}
                {(() => {
                  const puzzle_no = Object.keys(puzzle.file_ids || {}).length;
                  return (
                    <>
                       <button className="start-button" onClick={() => handleButtonClick(puzzle.title, puzzle.category, puzzle.date_time, puzzle_no)}>View</button>
                    </>
                  );
                })()}
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
                <p>Score: 1/{Object.keys(puzzle.file_ids || {}).length}</p>
                {(() => {
                  const puzzle_no = Object.keys(puzzle.file_ids || {}).length;
                  return (
                    <>
                       <button className="start-button" onClick={() => handleButtonClick(puzzle.title, puzzle.category, puzzle.date_time, puzzle_no)}>View</button>
                    </>
                  );
                })()}              </div>
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
