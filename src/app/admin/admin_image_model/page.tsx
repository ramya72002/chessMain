'use client'
import React, { useState, useEffect } from 'react';

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
  file_ids: { [key: string]: FileData };
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleData: FileData | null;
  onSubmit: (data: FileData) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, puzzleData, onSubmit }) => {
  const [solution, setSolution] = useState(puzzleData?.solution || '');
  const [sidLink, setSidLink] = useState(puzzleData?.sid_link || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...puzzleData!, solution, sid_link: sidLink });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h3>Edit Puzzle</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Solution</label>
            <input
              type="text"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              required
            />
          </div>
          <div>
            <label>AskSid Link</label>
            <input
              type="text"
              value={sidLink}
              onChange={(e) => setSidLink(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
