"use client";
import React from 'react';
import './Afterschool.scss';
import { useRouter } from 'next/navigation';

// Define the course paths
const coursePaths: { [key: string]: string } = {
  'Basic Checkmates - 2': '/basic-checkmates-2/modules/m1',
  'Basics of Chess': '/modules/m1?afterschool=true',
  'Good Bishop Bad Bishop': '/good-bishop-bad-bishop/modules/m1',
  'Basic Checkmates': '/basic-checkmates/modules/m1'
};

// Define the course card styles
const courseStyles: { [key: string]: string } = {
  'Basic Checkmates - 2': 'recently-used',
  'Basics of Chess': 'shapes',
  'Good Bishop Bad Bishop': 'graphics',
  'Basic Checkmates': 'stickers'
};

const MyAccount = () => {
  const router = useRouter();

  const handleViewProgress = (courseTitle: string) => {
    const path = coursePaths[courseTitle];
    if (path) {
      router.push(path);
    } else {
      console.error('Path not found for course:', courseTitle);
    }
  };

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>After School Program</h1>
      </header>

      <section className="courses-section">
        <div className="courses-info">
          <h3>All Courses with Paths</h3>
        </div>

        {Object.entries(coursePaths).map(([course, path], index) => (
          <div key={index} className={`course-card ${courseStyles[course]}`}>
            <div className="course-info">
              <div className="course-status">
                <h4>{course}</h4>
                <button
                  className="progress"
                  style={{ backgroundColor: 'red' }}
                  onClick={() => handleViewProgress(course)}
                >
                  In Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyAccount;
