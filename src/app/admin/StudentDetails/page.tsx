/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDetails.scss';  
import { Student } from '../../types/types';
import { FaTrash } from 'react-icons/fa';  

const StudentDetails = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);  

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('https://backend-chess-tau.vercel.app/studentList')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  };

  const deleteStudent = (email: string) => {
    axios.delete('https://backend-chess-tau.vercel.app/del-student', { data: { email } })
      .then(() => {
        fetchStudents(); // Fetch the updated list after deletion
        setConfirmDelete(null); // Reset confirmation state
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  const handleDeleteClick = (email: string) => {
    setConfirmDelete(email); // Set the email to confirm deletion
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      deleteStudent(confirmDelete);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null); // Cancel deletion
  };

  return (
    <div className="student-details-container">
      {students.map((student, index) => (
        <div key={index} className="student-box">
          <img src={student.image} alt={student.name} className="student-image" />
          <div className="student-info">
            <h3 className="student-name">{student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Level: {student.level}</p>
            {student.scores && (
              <p>
                Arena Scores: "Opening": {student.scores.Opening}, "Middlegame": {student.scores.Middlegame}, 
                "Endgame": {student.scores.Endgame}, "Mixed": {student.scores.Mixed}
              </p>
            )}
          </div>
          <div className="delete-container">
            {confirmDelete === student.email ? (
              <div className="confirm-delete">
                <button onClick={handleConfirmDelete} className="confirm-button">Confirm Delete</button>
                <button onClick={handleCancelDelete} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <FaTrash 
                className="delete-icon" 
                onClick={() => handleDeleteClick(student.email)} 
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentDetails;
