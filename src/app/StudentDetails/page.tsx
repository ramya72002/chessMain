'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDetails.scss'; // Import your CSS file for styling
import { Student } from '../types/types';

const StudentDetails = () => {
   const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://127.0.0.1:80/studentList')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  return (
    <div className="student-details-container">
      {students.map((student, index) => (
        <div key={index} className="student-box">
          <img src={student.image} alt={student.name} className="student-image" />
          <div className="student-info">
            <h3 className="student-name">{student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Level: {student.level}</p>
            <p>Puzzle Score: {student.puzzle_score}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentDetails;
