'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './insidepuzzlearena.scss';

const PuzzlePageClient = () => {
  const searchParams = useSearchParams();
  const fileId = searchParams.get('file_id') || '66bb8396af2a1e3287996406'; // Default file_id
  const title = searchParams.get('title') || 'Mastering Pawn Structure';
  const level = searchParams.get('level') || 'Pawn';
  const category = searchParams.get('category') || 'Middlegame';
  const puzzle_number = searchParams.get('puzzle_number') || '1';

  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [solutions, setSolutions] = useState<{ id: string; move: string; sid_link: string; solution: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'move' | 'solution' | 'sid'>('move'); // Default to 'move'
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    fetchImageFile(fileId); // Call API with fileId
    fetchSolutions(); // Fetch solutions

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [fileId]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timer]);

  const fetchImageFile = (id: string) => {
    axios.post(
        'https://backend-chess-tau.vercel.app/image_get_fileid',
        { file_id: id },
        { responseType: 'blob' }
      )
      .then(response => {
        const url = URL.createObjectURL(
          new Blob([response.data], { type: response.headers['content-type'] })
        );
        setImageSrc(url);
      })
      .catch(error => {
        console.error(`Error fetching image with file ID ${id}:`, error);
      });
  };

  const fetchSolutions = () => {
    axios.get(`https://backend-chess-tau.vercel.app/images/solutions?title=${title}&level=${level}&category=${category}&id=${fileId}`)
      .then(response => {
        setSolutions(response.data.images);
        console.log(`Fetched solutions:`, response.data.images);
      })
      .catch(error => {
        console.error('Error fetching solutions:', error);
      });
  };

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShowSolution = () => {
    setActiveTab('solution');
  };

  const handleShowSidLink = () => {
    setActiveTab('sid');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Category</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{level}</td>
              <td>{category}</td>
              <td>{title}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="puzzle-content">
        <div className="chessboard">
          {imageSrc ? (
            <img src={imageSrc} alt="Chessboard" />
          ) : (
            <p>Loading image...</p>
          )}
          <div className="move-indicator">Black to Move</div>
        </div>
        <div className="puzzle-info">
          <h2>Puzzle{puzzle_number}</h2>
          <button className="timer-btn" onClick={handleStartTimer}>
            Start/Stop Timer
          </button>
          <button className="solution-btn" onClick={handleShowSolution}>
            Solution
          </button>
          {activeTab === 'solution' && solutions.length > 0 && (
            <div className="solution-content">
              <p>{solutions[0].solution}</p>
            </div>
          )}
          <button className="ask-sid-btn" onClick={handleShowSidLink}>
            Ask Sid
          </button>
          {activeTab === 'sid' && solutions.length > 0 && (
            <div className="sid-link-content">
              <p>{solutions[0].sid_link}</p>
            </div>
          )}
          
        </div>
        
      </div>
      <div className="response-buttons">
        <button className="correct-btn">Got it Right</button>
        <button className="incorrect-btn">Missed It</button>
      </div>
      
      <div className="navigation-buttons">
        <button className="nav-btn">Previous</button>
        <button className="nav-btn">Next</button>
      </div>
    </div>
  );
};

const PuzzlePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PuzzlePageClient />
    </Suspense>
  );
};

export default PuzzlePage;
