//not in use
'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './admin_get_puzzle_images.scss'; // Import SCSS directly

interface Image {
  id: string;
  filename: string;
  url: string;
}

const AdminGetPuzzleImages: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:80/images/${title}`);
      setImages(response.data.images);
      setError('');
    } catch (err) {
      console.error(err);
      setError('No images found with the given title');
      setImages([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={title} 
          onChange={handleChange} 
          placeholder="Enter title" 
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <p>{image.filename}</p>
            <img src={`http://127.0.0.1:80/image/${image.id}`} alt={image.filename} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminGetPuzzleImages;
