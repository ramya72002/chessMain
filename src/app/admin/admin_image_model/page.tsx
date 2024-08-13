import React from 'react';
import './model.scss'
interface PuzzleData {
  _id: string;
  date_time: string;
  level: string;
  category: string;
  title: string;
  live: string;
  file_ids: { [key: string]: any };
}

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleData: PuzzleData | null;
}

const Model: React.FC<ModelProps> = ({ isOpen, onClose, puzzleData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Edit Puzzle</h2>
        {puzzleData && (
          <div className="puzzle-info">
            <p><strong>Level:</strong> {puzzleData.level}</p>
            <p><strong>Category:</strong> {puzzleData.category}</p>
            <p><strong>Title:</strong> {puzzleData.title}</p>
            <p><strong>Live:</strong> {puzzleData.live}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Model;
