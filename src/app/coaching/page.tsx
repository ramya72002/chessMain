// pages/account.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from next/link
import './coaching.scss';
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
        <h1>My Learning</h1>
       </header>

      <section className="courses-section">
        <div className="courses-header">
          <h3>Your Courses</h3>
        </div>

        <div className="course-card">
    <div className="course-status">
        <h4>Basics of Chess</h4>
        <Link href="/modules/m1">
            <span className="progress">In Progress</span>
        </Link>
    </div>
    <div className="progress-bar">
        <div className="progress-completed" style={{ width: '0%' }}></div>
    </div>
    <p className="completed-steps">0% COMPLETE | 0/94 Steps</p>
</div>

<div className="course-card">
    <div className="course-status">
        <h4>Good Bishop Bad Bishop</h4>
        <Link href="/notstarted">
            <span className="progress" style={{ backgroundColor: 'red' }}>Not Started</span>
        </Link>
    </div>
    <div className="progress-bar">
        <div className="progress-completed" style={{ width: '0%' }}></div>
    </div>
    <p className="completed-steps">0% COMPLETE | 0/94 Steps</p>
</div>

<div className="course-card">
    <div className="course-status">
        <h4>Basic Checkmates</h4>
        <Link href="/completed">
            <span className="progress" style={{ backgroundColor: 'green' }}>Completed</span>
        </Link>
    </div>
    <div className="progress-bar">
        <div className="progress-completed" style={{ width: '100%' }}></div>
    </div>
    <p className="completed-steps">100% COMPLETE | 94/94 Steps</p>
</div>

<div className="course-card">
    <div className="course-status">
        <h4>Basic Checkmates - 2</h4>
        <Link href="/register">
            <span className="progress" style={{ backgroundColor: 'blue' }}>Register</span>
        </Link>
    </div>
    <div className="progress-bar">
        <div className="progress-completed" style={{ width: '0%' }}></div>
    </div>
    <p className="completed-steps">0% COMPLETE | 0/94 Steps</p>
</div>

      </section>
    </div>
  );
};

export default MyAccount;
