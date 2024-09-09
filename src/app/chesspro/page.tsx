import React from 'react';
import './chesspro.scss';

const ChessRegistration = () => {
  return (
    <div className="registration-container">
      <header className="registration-header">
        <div className="image-container">
          <img src="/images/chesspro.png" alt="Delaware Chess Champs Logo" className="logo" />
          <img src="/images/schoolname.png" alt="Mount Pleasant Elementary School" className="school-title" />
        </div>
        <h2>Chess Program: Fall 2024</h2>
      </header>

      <p className="program-description">
        The Chess After-School Program gives students a fun and engaging way to learn the game while building critical thinking and problem-solving skills.
        Through interactive lessons and games, students will master key strategies, improve focus, and boost confidence, all in a supportive environment.
      </p>

      <div className="training-info">
        <p><strong>10 Week Training [K-5 Students]</strong></p>
        <p>25 Sep 2024 to 18 Dec 2024</p>
        <p>[No classes on 27 Nov 2024]</p>
        <p>3:30 PM - 4:30 PM</p>
      </div>

      <form className="registration-form">
        <div className="input-group">
          <label>Parent's Name</label>
          <div className="input-row">
            <input type="text" placeholder="First" />
            <input type="text" placeholder="Last" />
          </div>
        </div>

        <div className="input-group">
          <label>Child's Name</label>
          <div className="input-row">
            <input type="text" placeholder="First" />
            <input type="text" placeholder="Last" />
          </div>
        </div>

        <div className="input-group">
          <label>Child's Grade</label>
          <select>
            <option value="">Dropdown</option>
            <option value="K">K</option>
            <option value="1">1st Grade</option>
            <option value="2">2nd Grade</option>
            <option value="3">3rd Grade</option>
            <option value="4">4th Grade</option>
            <option value="5">5th Grade</option>
          </select>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter Email" />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input type="tel" placeholder="Enter Phone Number" />
        </div>

        <div className="input-group">
          <label>Address</label>
          <input type="text" placeholder="Address Line 1" />
          <input type="text" placeholder="Address Line 2" />
          <div className="input-row">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip Code" />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="payment-button">Make Payment</button>
          <button type="button" className="assistance-button">Request Financial Assistance</button>
        </div>
      </form>
    </div>
  );
};

export default ChessRegistration;
