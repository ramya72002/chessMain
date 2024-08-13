'use client';
import React, { useState, useEffect } from 'react';
import './admin_image_demo.scss';

const Admin_image_demo = () => {
  const [formData, setFormData] = useState({
    level: '',
    category: '',
    title: '',
    live: '',
    date_time: '',
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [puzzlesData, setPuzzlesData] = useState([]);

  // Fetch puzzles data on component mount
  useEffect(() => {
    const fetchPuzzlesData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/imagesets');
        const data = await response.json();
        setPuzzlesData(data);
      } catch (error) {
        console.error('Error fetching puzzles data:', error);
        alert('An error occurred while fetching puzzles data.');
      }
    };

    fetchPuzzlesData();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files) {
      alert('Please select files to upload.');
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof typeof formData]);
    }

    for (let i = 0; i < files.length; i++) {
      formDataToSend.append('images', files[i]);
    }

    try {
      const response = await fetch('http://127.0.0.1:80/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Images uploaded successfully! File IDs: ' + result.file_ids.join(', '));
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading images.');
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

        <button type="submit">Submit</button>
      </form>

      {/* Display puzzles data in a table */}
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
          {puzzlesData.map((puzzle: any, index: number) => (
            <tr key={index}>
              <td>{new Date(puzzle.date_time).toLocaleDateString()}</td>
              <td>{puzzle.level}</td>
              <td>{puzzle.category}</td>
              <td>{puzzle.title}</td>
              <td>{puzzle.live ? 'Yes' : 'No'}</td>
              {Array.from({ length: 10 }, (_, i) => (
                <td key={i}>
                  {puzzle[`puzzle${i + 1}`] ? (
                    <button>View/Edit</button>
                  ) : (
                    <button>Add</button>
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
