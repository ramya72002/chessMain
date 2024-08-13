'use client'
import React, { useState, useEffect } from 'react';
import './admin_image_demo.scss';
import Model from '../admin_image_model/page'; // Adjust the path as needed

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

const Admin_image_demo: React.FC = () => {
  const [puzzleData, setPuzzleData] = useState<PuzzleData[]>([]);
  const [formData, setFormData] = useState({
    level: '',
    category: '',
    title: '',
    live: '',
    date_time: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedPuzzle, setSelectedPuzzle] = useState<{ puzzle: PuzzleData | null; column: string | null }>({ puzzle: null, column: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/imagesets');
        if (!response.ok) {
          throw new Error('Failed to fetch puzzle data');
        }
        const data = await response.json();
        console.log('Fetched puzzle data:', data); // Log data to check structure
        setPuzzleData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      setFiles(e.target.files);
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('level', formData.level);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('live', formData.live);
    formDataToSend.append('date_time', formData.date_time);

    if (files) {
      Array.from(files).forEach(file => formDataToSend.append('images', file));
    }

    try {
      const response = await fetch('http://127.0.0.1:80/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Upload failed');
      }

      alert('Images uploaded successfully!');
      setFormData({
        level: '',
        category: '',
        title: '',
        live: '',
        date_time: '',
      });
      setFiles(null);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading the images.');
    }
  };

  const handleAddImage = (puzzleIndex: number, puzzleKey: string) => {
    console.log(`Add new image to puzzle ${puzzleIndex} with key ${puzzleKey}`);
    // Implement image addition logic here
  };

  const handleViewEdit = async (puzzleIndex: number, puzzleKey: string) => {
    const puzzle = puzzleData[puzzleIndex];
    const puzzleFile = puzzle.file_ids[puzzleKey];

    if (!puzzleFile) {
      console.log('Puzzle file does not exist.');
      return;
    }

    try {
      const apiUrl = `http://127.0.0.1:80/getpuzzleid?level=${encodeURIComponent(puzzle.level)}&category=${encodeURIComponent(puzzle.category)}&title=${encodeURIComponent(puzzle.title)}&live=${encodeURIComponent(puzzle.live)}&puzzle_number=${puzzleKey.replace('puzzle', '')}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error fetching puzzle data');
      }

      const data = await response.json();
      setSelectedPuzzle({ puzzle: data, column: puzzleKey });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching puzzle data:', error);
      alert('An error occurred while fetching the puzzle data.');
    }
  };
  
  return (
    <>
      <form className="admin-image-form" onSubmit={handleSubmit}>
        <select name="level" value={formData.level} onChange={handleChange} required>
          <option value="">Select Level</option>
          <option value="Pawn">Pawn</option>
          <option value="Knight">Knight</option>
          <option value="Bishop">Bishop</option>
          <option value="Rook">Rook</option>
          <option value="Queen">Queen</option>
          <option value="King">King</option>
        </select>

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Opening">Opening</option>
          <option value="Middlegame">Middlegame</option>
          <option value="Endgame">Endgame</option>
          <option value="Mixed">Mixed</option>
        </select>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          required
        />

        <select name="live" value={formData.live} onChange={handleChange} required>
          <option value="">Live?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="datetime-local"
          name="date_time"
          value={formData.date_time}
          onChange={handleChange}
        />

        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <table className="puzzles-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Level</th>
            <th>Category</th>
            <th>Title</th>
            <th>Live</th>
            {Array.from({ length: 10 }, (_, i) => (
              <th key={i}>Puzzle {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {puzzleData.map((puzzle, puzzleIndex) => (
            <tr key={puzzle._id}>
              <td>{puzzle.date_time}</td>
              <td>{puzzle.level}</td>
              <td>{puzzle.category}</td>
              <td>{puzzle.title}</td>
              <td>{puzzle.live}</td>
              {Array.from({ length: 10 }, (_, i) => (
                <td key={i}>
                  {puzzle.file_ids[`puzzle${i + 1}`] ? (
                    <button onClick={() => handleViewEdit(puzzleIndex, `puzzle${i + 1}`)}>View/Edit</button>
                  ) : (
                    <button onClick={() => handleAddImage(puzzleIndex, `puzzle${i + 1}`)}>Add Image</button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        puzzleData={selectedPuzzle.puzzle || null}
        columnName={selectedPuzzle.column || null}
      />
    </>
  );
};

export default Admin_image_demo;
