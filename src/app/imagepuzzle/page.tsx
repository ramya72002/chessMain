'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImagePuzzle.scss';

interface Image {
  id: string;
  filename: string;
  url: string;
}

const ImagePuzzle: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get('https://backend-chess-tau.vercel.app/get')
      .then(response => {
        setImages(response.data.images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = () => {
    if (selectedFiles) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach(file => {
        formData.append('images', file);
      });

      axios.post('https://backend-chess-tau.vercel.app/upload', formData)
        .then(response => {
          console.log(response.data.message);
          fetchImages();
        })
        .catch(error => {
          console.error('Error uploading images:', error);
        });
    }
  };

  return (
    <div className="image-puzzle">
      <h1>Image Puzzle</h1>
      <div className="upload-section">
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Images</button>
      </div>
      <div className="images-grid">
        {images.map(image => (
          <div key={image.id} className="image-container">
            <img src={`https://backend-chess-tau.vercel.app${image.url}`} alt={image.filename} />
            <p>{image.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePuzzle;
