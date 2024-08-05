import React from 'react';
import './portal.scss';

const Hero = () => {
  return (
    <div className="hero">
      <div className="header">
        <h2>Hi Sumit</h2>
        <p>Your chess journey so far.....</p>
      </div>
      <div className="journey">
        <div className="level">
          <h3>BEGINNER</h3>
          <div className="steps">
            <div className="step">
              <div className="icon">🧭</div>
              <div>
                <h4>1. Explorer</h4>
                <p>For absolute beginners who are just starting out and need to learn the basics of chess.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon">💡</div>
              <div>
                <h4>2. Enthusiasts</h4>
                <p>Players who have grasped the basics and are ready to learn fundamental strategies and opening principles.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon">📈</div>
              <div>
                <h4>3. Advanced</h4>
                <p>Players who have a solid understanding of basic strategies and are ready to learn basic endgames and improve their tactical skills.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="level">
          <h3>INTERMEDIATE</h3>
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
          <div className="number">276</div>
          <div className="label">Puzzle Arena</div>
        </div>
        <div className="stat">
          <div className="number">16</div>
          <div className="label">Puzzle Racer</div>
        </div>
        <div className="stat">
          <div className="number">16</div>
          <div className="label">Puzzle Racer</div>
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
