'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './insidepuzzlearena.scss';

const PuzzlePageClient = () => {
  const searchParams = useSearchParams();
  const fileId = searchParams.get('file_id') || '66bb8396af2a1e3287996406'; // Default file_id
  const title = searchParams.get('title') || 'Title';
  const level = searchParams.get('level') || 'level';
  const category = searchParams.get('category') || 'Category';

  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchImageFile(fileId); // Call API with fileId

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [fileId]);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      if (interval) {
        window.clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
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
    
    
    // Construct the URL with default parameters and the file_id
    const url = `https://backend-chess-tau.vercel.app/images/solutions?title=${title}&level=${level}&category=${category}&id=${id}`;
  
    axios.get(url, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        setImageSrc(url);
      })
      .catch(error => {
        console.error(`Error fetching image with file ID ${id}:`, error);
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

  return (
    <div className="puzzle-container">
      <h1>{title}</h1>
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
          <h2>Puzzle - 1</h2>
          <button className="timer-btn" onClick={handleStartTimer}>
            Start Timer
            <div className="timer-display">
              <h3>: {formatTime(timer)}</h3>
            </div>
          </button>
          <button className="solution-btn">
            <img src="/images/solution.png" alt="Solution" />Solution
          </button>
          <button className="ask-sid-btn">
            <img src="/images/sid.png" alt="Ask SID" />
            Ask SID
          </button>
        </div>
      </div>
      <div className="response-buttons">
        <button className="correct-btn">Got it Right</button>
        <button className="incorrect-btn">Missed It</button>
      </div>
      <p className="explanation">
        * You ‘Got it Right’ because you were able to correctly identify the first two moves as mentioned in the ‘Solution’ tab above, else you would have marked as ‘Missed it’, correct?
      </p>
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
