'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './portal.scss'; // Import the styles

const PortalHome = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        if (email) {
          const response = await axios.get(`https://backend-chess-tau.vercel.app/getuserdetails?email=${email}`);
          setUserDetails(response.data.data);
          const level = response.data.data.level.replace('level', '');
          setSelectedLevel(parseInt(level, 10));
          localStorage.setItem('userDetails', JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLevelClick = (level: string) => {
    if (parseInt(level) <= selectedLevel) {
      router.push(`/levels/level${level}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header">Quick Start</div>
      <div className="statsContainer">
        <div className="statBox">
          <div className="statTitle">You collected:</div>
          <div className="statValue">{userDetails?.collected || 0}</div>
        </div>
        <div className="statBox">
          <div className="statTitle">Puzzle Score</div>
          <div className="statValue">{userDetails?.puzzle_score || 0}</div>
        </div>
        <div className="statBox">
          <div className="statTitle">Time spent reading:</div>
          <div className="statValue">{userDetails?.timeSpent || '0 h 0 m'}</div>
        </div>
      </div>

      <div className="levelsContainer">
        {['1', '2', '3', '4'].map((level, index) => (
          <React.Fragment key={level}>
            {index > 0 && (
              <svg className="connector">
                <line x1="0" y1="60" x2="100" y2="60" stroke="gray" strokeWidth="3" />
              </svg>
            )}
            <div className="levelWrapper">
              <button
                className={parseInt(level) <= selectedLevel ? "levelButton" : "levelButtonDisabled"}
                onClick={() => handleLevelClick(level)}
                onMouseOver={() => setHoveredLevel(level)}
                onMouseOut={() => setHoveredLevel(null)}
                onTouchStart={() => setHoveredLevel(level)}
                onTouchEnd={() => setHoveredLevel(null)}
                disabled={parseInt(level) > selectedLevel}
              >
                {parseInt(level) <= selectedLevel ? (
                  <>
                    <img src={`/images/chess_piece_${level}.png`} alt={`Level ${level} icon`} />
                    <div className="levelLabel">{getLevelLabel(level)}</div>
                  </>
                ) : (
                  <FontAwesomeIcon icon={faLock} />
                )}
              </button>
              {parseInt(level) > selectedLevel && hoveredLevel === level && (
                <div className="tooltip">Complete previous levels to unlock this</div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};  

const getColor = (level: string) => {
  switch (level) {
    case '1': return '#ff7043'; // Bright orange
    case '2': return '#ffeb3b'; // Bright yellow
    case '3': return '#8bc34a'; // Bright green
    case '4': return '#29b6f6'; // Bright blue
    default: return '#4caf50'; // Default green
  }
};

const getLevelLabel = (level: string) => {
  switch (level) {
    case '1': return 'Never Played';
    case '2': return 'Beginner';
    case '3': return 'Intermediate';
    case '4': return 'Expert';
    default: return '';
  }
};

export default PortalHome;
