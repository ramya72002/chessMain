'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './model.scss';
import { ModelProps } from './types/types';

const Modal: React.FC<ModelProps> = ({ isOpen, onClose, puzzleData, columnName }) => {
  const [sidLink, setSidLink] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
console.log("ppppp",puzzleData)
  const handleSubmit = async () => {
    if (!puzzleData) return;

    if (!sidLink || !solution) {
      setError('SID Link and Solution fields cannot be empty.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put('https://backend-chess-tau.vercel.app/get_puzzle_sol', {
        level: puzzleData.level,
        category: puzzleData.category,
        title: puzzleData.title,
        live: puzzleData.live,
        column_name: columnName,
        sid_link: sidLink,
        solution: solution,
      });
      
      if (response.status === 200) {
        setSuccess('Puzzle updated successfully u can close this window and reopen for changes');
        setError(null);
        setSidLink('');  // Clear the input fields after successful submission
        setSolution('');
      }
    } catch (error) {
      setSuccess(null);
      setError('Error updating puzzle');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !puzzleData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Puzzle Details</h2>
        <p><strong>Date Time:</strong> {puzzleData?.date_time}</p>
        <p><strong>Level:</strong> {puzzleData?.level}</p>
        <p><strong>Category:</strong> {puzzleData?.category}</p>
        <p><strong>Title:</strong> {puzzleData?.title}</p>
        <p><strong>Live:</strong> {puzzleData?.live ? 'Yes' : 'No'}</p>
        <p><strong>Column Name:</strong> {columnName}</p>
        <p><strong>Solution:</strong> {puzzleData.file_ids[columnName].solution}</p>
        <p><strong>SID Link:</strong> {puzzleData.file_ids[columnName].sid_link}</p>
        <p> if u want to update solution and sid link plz update below</p>
        
        <div className="form-group">
          <label>SID Link:</label>
          <input
            type="text"
            value={sidLink}
            onChange={(e) => setSidLink(e.target.value)}
            placeholder="Enter SID Link"
          />
        </div>
        
        <div className="form-group">
          <label>Solution:</label>
          <input
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Enter Solution"
          />
        </div>

        <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Submit'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Modal;
