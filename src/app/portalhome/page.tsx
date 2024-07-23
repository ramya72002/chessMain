'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './portal.scss'; // Import the styles

const PortalHome = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>(null); // State to store user details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [selectedLevel, setSelectedLevel] = useState<number>(1); // State to manage selected level
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null); // State to manage hovered level

  useEffect(() => {
    // Fetch user details based on email from local storage
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        if (email) {
          const response = await axios.get(`https://backend-chess-tau.vercel.app/getuserdetails?email=${email}`);
          setUserDetails(response.data.data); // Assuming response.data.data contains user details
          console.log("uuuuuuuuuuuu",response)
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div style={{ color: "white",fontSize:"25px",fontWeight:"bold" }}>Quick Start</div>
      <div className="statsContainer">
        <div className="statBox">
          <div style={{ color: "blue",fontSize:"20px",fontWeight:"bold" }}>You collected:</div>
          <div style={{ color: "blue",fontSize:"20px" }}>{userDetails?.collected || 0}</div>
        </div>
        <div className="statBox">
          <div style={{ color: "green",fontSize:"20px" ,fontWeight:"bold" }}>Puzzle Score</div>
          <div style={{ color: "green",fontSize:"20px" }}>{userDetails?.puzzle_score || 0}</div>
        </div>
        <div className="statBox">
          <div style={{ color: "red" ,fontSize:"20px",fontWeight:"bold" }}>Time spent reading:</div>
          <div style={{ color: "red",fontSize:"20px" }}>{userDetails?.timeSpent || '0 h 0 m'}</div>
        </div>
      </div>

      <div className="levelsContainer">
        {['1', '2', '3', '4'].map((level, index) => (
          <React.Fragment key={level}>
            {index > 0 && (
              <svg style={{ width: '50px', height: '50px', overflow: 'visible' }}>
                <line x1="0" y1="60" x2="100" y2="60" stroke="gray" strokeWidth="3" />
              </svg>
            )}
            <div style={{ position: 'relative' }}>
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
