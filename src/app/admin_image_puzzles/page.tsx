'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin_image_puzzles.scss';

interface Image {
  id: string;
  filename: string;
  url: string;
}

interface ImageSet {
  title: string;
  file_ids: string[];
}

const AdminImagePuzzles: React.FC = () => {
  const [imageSets, setImageSets] = useState<ImageSet[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchImageSets();
  }, []);

  const fetchImageSets = () => {
    setLoading(true);
    axios.get('https://backend-chess-tau.vercel.app/get')
      .then(response => {
        setImageSets(response.data.image_sets);
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage('Error fetching images.');
        setLoading(false);
        console.error('Error fetching images:', error);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpload = () => {
    if (selectedFiles && title) {
      const formData = new FormData();
      formData.append('title', title);
      Array.from(selectedFiles).forEach(file => {
        formData.append('images', file);
      });

      axios.post('https://backend-chess-tau.vercel.app/upload', formData)
        .then(response => {
          console.log(response.data.message);
          fetchImageSets();
        })
        .catch(error => {
          setErrorMessage('Error uploading images.');
          console.error('Error uploading images:', error);
        });
    } else {
      setErrorMessage('Please select files and enter a title.');
    }
  };

  return (
    <div className="image-puzzle">
      <h1>Image Puzzle</h1>
      <div className="upload-section">
        <input type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <div className="image-sets">
          {imageSets.map(set => (
            <div key={set.title} className="image-set">
              <h2>{set.title}</h2>
              <div className="images-grid">
                {set.file_ids.map(fileId => (
                  <div key={fileId} className="image-container">
                    <img src={`https://backend-chess-tau.vercel.app/image/${fileId}`} alt="Puzzle" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminImagePuzzles;
