// pages/account.tsx
"use client";
import React, { useEffect, useState } from 'react';
import './learning.scss';
import { UserDetails } from '../types/types'; // Import the type if you have it defined

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>My Account</h1>
        <p>Welcome to your account. Manage profile, courses, and orders here.</p>
      </header>

      <section className="account-summary">
        <h2>{userDetails ? userDetails.name : 'Student'}</h2> {/* This is where the name will be displayed */}

        <div className="stats">
          <div className="stat-item">
            <span>0</span>
            <p>Courses</p>
          </div>
          <div className="stat-item">
            <span>0</span>
            <p>Completed</p>
          </div>
          <div className="stat-item">
            <span>0</span>
            <p>Certificates</p>
          </div>
          <div className="stat-item">
            <span>0</span>
            <p>Points</p>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="courses-header">
          <h3>Your Courses</h3>
          <button className="expand-all">Expand All</button>
        </div>

        <div className="course-card">
          <div className="course-status">
            <h4>Certified Ethereum Developer Program</h4>
            <span className="progress">In Progress</span>
          </div>
          <div className="progress-bar">
            <div className="progress-completed" style={{ width: '0%' }}></div>
          </div>
          <p className="completed-steps">0% COMPLETE | 0/94 Steps</p>

          <table className="course-table">
            <thead>
              <tr>
                <th>Quizzes</th>
                <th>Certificate</th>
                <th>Score</th>
                <th>Statistics</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Introduction to Blockchain Quiz</td>
                <td>20%</td>
                <td>20%</td>
                <td>May 20, 2023 4:42 pm</td>
                <td>May 20, 2023 4:42 pm</td>
              </tr>
              {/* Add more rows as necessary */}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;
