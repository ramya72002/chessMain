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
  file_ids?: FileIds;
  total_title_category_score?: number;
};

type Scores = {
  Opening: number;
  Middlegame: number;
  Endgame: number;
  Mixed: number;
  total: number;
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
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>({
    Opening: 0,
    Middlegame: 0,
    Endgame: 0,
    Mixed: 0,
    total: 0
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  
        if (storedUserDetails) {
          setUserDetails(storedUserDetails);
          try {
            // Ensure fetch only happens once
            if (!dataFetched) {
              setDataFetched(true);
  
              // Fetch scores from API
              const scoreResponse = await axios.post('https://backend-chess-tau.vercel.app/calculate_scores', {
                email: storedUserDetails.email
              });
              if (scoreResponse.data.success) {
                const fetchedScores = scoreResponse.data.scores as Scores;
                setScores({
                  Opening: fetchedScores.Opening || 0,
                  Middlegame: fetchedScores.Middlegame || 0,
                  Endgame: fetchedScores.Endgame || 0,
                  Mixed: fetchedScores.Mixed || 0,
                  total: Object.values(fetchedScores).reduce((a, b) => (typeof b === 'number' ? a + b : a), 0)
                });
              } else {
                setError('Failed to fetch scores.');
              }
  
              const response = await axios.get(`https://backend-chess-tau.vercel.app/get_level?level=${levelMapping[storedUserDetails.level]}`);
              const data = response.data;
  
              if (data.image_sets && Array.isArray(data.image_sets)) {
                const fetchPuzzles = async (liveStatus: string) => {
                  return Promise.all(
                    data.image_sets
                      .filter((item: { live: string }) => item.live === liveStatus)
                      .map(async (item: Puzzle) => {
                        try {
                          const arenaUserResponse = await axios.get('https://backend-chess-tau.vercel.app/get_Arena_user', {
                            params: {
                              email: storedUserDetails.email,
                              category: item.category,
                              title: item.title,
                              date_time: item.date_time,
                              file_ids: item.file_ids || {}
                            }
                          });
  
                          const total_title_category_score = arenaUserResponse.data.success
                            ? Object.values(arenaUserResponse.data.puzzleArena).reduce(
                                (total: number, puzzle: any) => total + puzzle.score,
                                0
                              )
                            : 0;
  
                          return {
                            ...item,
                            total_title_category_score
                          };
                        } catch (error) {
                          console.error(`Error fetching arena data for ${liveStatus} puzzle ${item.title}:`, error);
                          return {
                            ...item,
                            total_title_category_score: 0
                          };
                        }
                      })
                  );
                };
  
                const livePuzzlesList = await fetchPuzzles('Yes');
                const practicePuzzlesList = await fetchPuzzles('No');
  
                setLivePuzzles(livePuzzlesList);
                setPracticePuzzles(practicePuzzlesList);
              } else {
                setError('Unexpected data structure received from the server.');
              }
            }
          } catch (error) {
            setError('Failed to fetch level data. Please try again later.');
            console.error('Error fetching level data:', error);
          }
        }
      }
    };
  
    fetchUserDetails();
  }, [dataFetched]);

  const handleButtonClick = async (title: string, category: string, date_time: string, puzzle_no: number, score: string) => {
    const userDetailsString = localStorage.getItem('userDetails');
    const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    const email = storedUserDetails.email;
    if (email) {
      console.log("pppno", puzzle_no);

      const createArenaApiUrl = 'https://backend-chess-tau.vercel.app/create_Arena_user';
      const imagesApiUrl = `https://backend-chess-tau.vercel.app/images/title?level=${encodeURIComponent(levelMapping[storedUserDetails.level])}&category=${encodeURIComponent(category)}&title=${encodeURIComponent(title)}`;
      
      try {
        // 1. Call the /create_Arena_user API first
        const createArenaResponse = await axios.post(createArenaApiUrl, {
          email,
          category,
          title,
          puzzle_no
        });

        console.log('Create Arena API Response:', createArenaResponse.data);

        if (createArenaResponse.data.success) {
          // 2. Directly proceed to fetching the images without calling /get_Arena_user API
          const imagesResponse = await axios.get(imagesApiUrl);
          console.log('Images API Response:', imagesResponse.data);

          // Navigate to the startArena page with additional parameters
          router.push(`/arena/startArena?title=${encodeURIComponent(title)}&level=${encodeURIComponent(levelMapping[storedUserDetails.level])}&category=${encodeURIComponent(category)}&date_time=${encodeURIComponent(date_time)}&score=${encodeURIComponent(score)}`);
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
            <div className="score-item1">Opening Arena :        <span>   {scores.Opening}</span></div>
            <div className="score-item2">Middlegame Arena :   <span>{scores.Middlegame}</span></div>
            <div className="score-item3">Endgame Arena : <span>{scores.Endgame}</span></div>
            <div className="score-item">Mixed Arena : <span>{scores.Mixed}</span></div>
            <div className="total-score">Puzzle Arena Score : <span>{scores.total}</span></div>
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
                <p>Total Score: {puzzle.total_title_category_score}/{Object.keys(puzzle.file_ids || {}).length}</p>
                <button className="start-button" onClick={() => handleButtonClick(puzzle.title, puzzle.category, puzzle.date_time, Object.keys(puzzle.file_ids || {}).length, `${puzzle.total_title_category_score}/${Object.keys(puzzle.file_ids || {}).length}`)}>View</button>
              </div>
            ))
          ) : (
            <p>No live puzzles available</p>
          )}
        </div>

        <div className="theme-practice practice-arena">
          <p>Practice Arena</p>
          {practicePuzzles.length > 0 ? (
            practicePuzzles.map((puzzle, index) => (
              <div className="practice-item" key={index}>
                <p>{puzzle.category}:{puzzle.title}</p>
                <p>Date & Time: {puzzle.date_time}</p>
                <p>Total Score: {puzzle.total_title_category_score}/{Object.keys(puzzle.file_ids || {}).length}</p>
                <button className="start-button" onClick={() => handleButtonClick(puzzle.title, puzzle.category, puzzle.date_time, Object.keys(puzzle.file_ids || {}).length, `${puzzle.total_title_category_score}/${Object.keys(puzzle.file_ids || {}).length}`)}>View</button>
              </div>
            ))
          ) : (
            <p>No practice puzzles available</p>
          )}
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PuzzleArena;
