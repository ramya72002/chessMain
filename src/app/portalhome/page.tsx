import React from 'react';
import './portal.scss';

const Hero = () => {
  return (
    <div className="hero">
      <div className="header">
        <h2>Hi Sumit</h2>
        <p>Your chess journey so far.....</p>
      </div>

      <div className="chess-journey">
  <div className="level">
  <svg className="connector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
      <line x1="0" y1="5" x2="1000" y2="5" stroke="white" stroke-width="5"/>
    </svg>
    <div className="step">
      <div className="icon pawn">♙</div>
      <p>Pawn</p>
      <p>(Beginner)</p>
    </div>
    <div className="step active">
      <div className="icon knight">♞</div>
      <p>Knight</p>
      <p>(Intermediate)</p>
    </div>
    <div className="step">
      <div className="icon bishop">♝</div>
      <p>Bishop</p>
      <p>(Proficient)</p>
    </div>
    <div className="step">
      <div className="icon rook">♜</div>
      <p>Rook</p>
      <p>(Advanced)</p>
    </div>
    <div className="step">
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
