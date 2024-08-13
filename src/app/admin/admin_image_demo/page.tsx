'use client';
import React, { useState, useEffect } from 'react';
import './admin_image_demo.scss';

interface PuzzleData {
  date_time: string;
  level: string;
  category: string;
  title: string;
  live: string;
  file_ids: string[];
}

const Admin_image_demo = () => {
  const [puzzleData, setPuzzleData] = useState<PuzzleData[]>([]);
  const [formData, setFormData] = useState({
    level: '',
    category: '',
    title: '',  // Changed from 'name' to 'title'
    live: '',
    date_time: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/imagesets');
        const data = await response.json();
        setPuzzleData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      setFiles(e.target.files);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddImage = (puzzleIndex: number, puzzleNumber: number) => {
    const formDataToSend = new FormData();

    // Append form data specific to the puzzle being edited
    formDataToSend.append('level', puzzleData[puzzleIndex].level);
    formDataToSend.append('category', puzzleData[puzzleIndex].category);
    formDataToSend.append('title', puzzleData[puzzleIndex].title);
    formDataToSend.append('live', puzzleData[puzzleIndex].live);
    formDataToSend.append('date_time', puzzleData[puzzleIndex].date_time);

    if (files) {
      formDataToSend.append('images', files[0]); // Assuming single file upload
    }

    fetch('http://127.0.0.1:80/upload', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          alert('Image added successfully!');
          const updatedPuzzleData = [...puzzleData];
          updatedPuzzleData[puzzleIndex].file_ids[puzzleNumber - 1] = result.file_id; // Update the puzzle with the new file_id
          setPuzzleData(updatedPuzzleData);
        } else {
          alert('Error: ' + result.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while uploading the image.');
      });
  };

  return (
    <>
      <form className="admin-image-form" onSubmit={(e) => e.preventDefault()}>
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
          required={formData.live === 'Yes'}
          disabled={formData.live !== 'Yes'}
        />

        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          required
        />
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
          {puzzleData.map((puzzle, index) => (
            <tr key={index}>
              <td>{new Date(puzzle.date_time).toLocaleDateString()}</td>
              <td>{puzzle.level}</td>
              <td>{puzzle.category}</td>
              <td>{puzzle.title}</td>
              <td>{puzzle.live}</td>
              {Array.from({ length: 10 }, (_, i) => (
                <td key={i}>
                  {i < puzzle.file_ids.length ? (
                    <button type="button">View/Edit</button>
                  ) : (
                    <button type="button" onClick={() => handleAddImage(index, i + 1)}>Add</button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin_image_demo;
