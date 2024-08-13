import React, { useState } from 'react';
import axios from 'axios';
import './model.scss';

interface FileData {
  id: string;
  solution: string;
  sid_link: string;
}

interface PuzzleData {
  _id: string;
  date_time: string;
  level: string;
  category: string;
  title: string;
  live: string;
  file_ids: { [columnName: string]: FileData };
}

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleData: PuzzleData | null;
  columnName: string | null;
}

const Model: React.FC<ModelProps> = ({ isOpen, onClose, puzzleData, columnName }) => {
  const [sidLink, setSidLink] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

 

  const handleSubmit = async () => {
    if (!puzzleData || !columnName) return;

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
        setSuccess('Puzzle updated successfully');
        setError(null);
      }
    } catch (error) {
      setSuccess(null);
      setError('Error updating puzzle');
    }
  };

  if (!isOpen || !puzzleData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Puzzle Details</h2>
        <p><strong>Date Time:</strong> {puzzleData.date_time}</p>
        <p><strong>Level:</strong> {puzzleData.level}</p>
        <p><strong>Category:</strong> {puzzleData.category}</p>
        <p><strong>Title:</strong> {puzzleData.title}</p>
        <p><strong>Live:</strong> {puzzleData.live}</p>
        <p><strong>Column Name:</strong> {columnName}</p>
        
        <div className="form-group">
          <label>SID Link:</label>
          <input
            type="text"
            value={sidLink}
            onChange={(e) => setSidLink(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Solution:</label>
          <input
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>Submit</button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Model;
