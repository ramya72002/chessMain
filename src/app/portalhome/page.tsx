'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './portal.scss';
import { UserDetails } from '../types/types';

const Hero = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        
        if (storedUserDetails && storedUserDetails.image) {
          setUserDetails(storedUserDetails);
        }

        const email = storedUserDetails?.email;

        try {
          if (email) {
            const response = await axios.get(`https://backend-chess-tau.vercel.app/getuserdetails?email=${email}`);
            setUserDetails(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const getActiveClass = (level: string) => {
    if (!userDetails) return '';
    
    const levelMap: { [key: string]: number } = {
      level1: 1,
      level2: 2,
      level3: 3,
      level4: 4,
      level5: 5,
    };
  
    const userLevel = levelMap[userDetails.level];
    const currentLevel = levelMap[level];
  
    return currentLevel <= userLevel ? 'active' : 'inactive';
  };
  

  return (
    <div className="hero">
      <div className="header">
        <h2>Hi {userDetails ? userDetails.name : 'Sumit'}</h2>
        <p>Your chess journey so far...</p>
      </div>

      <div className="chess-journey">
        <div className="level">
          <svg className="connector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
            <line x1="0" y1="5" x2="1000" y2="5" stroke="white" strokeWidth="5"/>
          </svg>
          <div className={`step ${getActiveClass('level1')}`}>
            <div className="icon pawn">♙</div>
            <p>Pawn</p>
            <p>(Beginner)</p>
          </div>
          <div className={`step ${getActiveClass('level2')}`}>
            <div className="icon knight">♞</div>
            <p>Knight</p>
            <p>(Intermediate)</p>
          </div>
          <div className={`step ${getActiveClass('level3')}`}>
            <div className="icon bishop">♝</div>
            <p>Bishop</p>
            <p>(Proficient)</p>
          </div>
          <div className={`step ${getActiveClass('level4')}`}>
            <div className="icon rook">♜</div>
            <p>Rook</p>
            <p>(Advanced)</p>
          </div>
          <div className={`step ${getActiveClass('level5')}`}>
            <div className="icon queen">♛</div>
            <p>Queen</p>
            <p>(Expert)</p>
    </div>
  </div>
  
</div>


      <div className="journey">
        <div className="level">
          <h3>Level Details</h3>
          <div className="steps">
            <div className="step">
              <div className="icon">♟️</div>
              <div>
                <h4>4. Pawn</h4>
                <p>Players who are preparing for casual tournaments and need to refine their middlegame tactics and overall strategy.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon">♞</div>
              <div>
                <h4>5. Knight</h4>
                <p>Players who are competing in club-rated tournaments and need to focus on game analysis and improving their overall play.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon">♝</div>
              <div>
                <h4>6. Bishop</h4>
                <p>Players who have some tournament experience and need to learn advanced endgames, opening responses, and notation.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon">♜</div>
              <div>
                <h4>7. Rook</h4>
                <p>Players who are preparing for regional tournaments and need to work on tournament preparation and advanced strategies.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon">♛</div>
              <div>
                <h4>8. Queen</h4>
                <p>Players who are ready for professional tournaments and need to refine advanced strategies and compete at a higher level.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="label">Puzzle Arena</div>
          <div className="number">276</div>
          <img src="/images/puzzlearena1.png" alt="Puzzle Arena Icon" className="stat-icon" />
        </div>
        <div className="stat">
          <div className="label">Puzzle Racer</div>
          <div className="number">16</div>
          <img src="/images/puzzleracer.png" alt="Puzzle Racer Icon" className="stat-icon" />
        </div>
        <div className="stat">
          <div className="label">Puzzle Racer</div>
          <div className="number">16</div>
        </div>
      </div>

      <div className="activities">
        <h3>Upcoming Activities</h3>
        <div className="activity">
          <div className="details">
            <div>Casual Tournament</div>
            <div>05-Aug-2024</div>
            <div>10:00 A.M</div>
          </div>
          <button className="details-button">Details</button>
        </div>
        <div className="activity">
          <div className="details">
            <div>Casual Tournament</div>
            <div>05-Aug-2024</div>
            <div>10:00 A.M</div>
          </div>
          <button className="details-button">Details</button>
        </div>
        <div className="activity">
          <div className="details">
            <div>Casual Tournament</div>
            <div>05-Aug-2024</div>
            <div>10:00 A.M</div>
          </div>
          <button className="details-button">Details</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
