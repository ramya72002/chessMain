'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './admin_image_puzzles.scss';

interface ImageSet {
  level: string;
  title: string;
  file_ids: string[];
}

const AdminImagePuzzles: React.FC = () => {
  const [imageSets, setImageSets] = useState<ImageSet[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  const fetchImageSets = async (level: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://backend-chess-tau.vercel.app/get_level?level=${level}`);
      setImageSets(response.data.image_sets);
      setLoading(false);
      fetchAllImages(response.data.image_sets);
    } catch (error) {
      setErrorMessage('Error fetching images.');
      setLoading(false);
      console.error('Error fetching images:', error);
    }
  };

  const fetchAllImages = (imageSets: ImageSet[]) => {
    imageSets.forEach(set => {
      if (set.file_ids) {
        set.file_ids.forEach(fileId => {
          fetchImageFile(fileId);
        });
      }
    });
  };

  const fetchImageFile = async (fileId: string) => {
    try {
      const response = await axios.post('https://backend-chess-tau.vercel.app/image_get_fileid', { file_id: fileId }, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      setImageUrls(prevState => ({ ...prevState, [fileId]: url }));
    } catch (error) {
      console.error(`Error fetching image with file ID ${fileId}:`, error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value;
    setSelectedLevel(level);
  };

  const handleFetchImages = () => {
    if (selectedLevel) {
      fetchImageSets(selectedLevel);
    } else {
      setErrorMessage('Please select a level.');
    }
  };

  const handleUpload = async () => {
    if (selectedFiles && selectedTitle && selectedLevel) {
      setLoading(true);  // Start loading

      const formData = new FormData();
      formData.append('level', selectedLevel);
      formData.append('title', selectedTitle);
      Array.from(selectedFiles).forEach(file => {
        formData.append('images', file);
      });

      try {
        const response = await axios.post('https://backend-chess-tau.vercel.app/upload', formData);
        console.log(response.data.message);
        fetchImageSets(selectedLevel);
      } catch (error) {
        setErrorMessage('Error uploading images.');
        console.error('Error uploading images:', error);
      } finally {
        setLoading(false);  // End loading
      }
    } else {
      setErrorMessage('Please select files, level, and enter a title.');
    }
  };

  const handleDelete = async (title: string, level: string) => {
    if (!title || !level) {
      setErrorMessage('Title and level must be defined.');
      return;
    }
  
    if (window.confirm(`Are you sure you want to delete the image set with level "${level}" and title "${title}"?`)) {
      try {
        const response = await axios.delete('https://backend-chess-tau.vercel.app/delete-arena-title', {
          data: { title, level }
        });
        console.log(response.data.message);
        fetchImageSets(selectedLevel);
      } catch (error) {
        setErrorMessage(`Error deleting image set with level "${level}" and title "${title}": ${error}`);
        console.error('Error deleting image set:', error);
      }
    }
  };
  

  return (
    <div className="image-puzzle">
      <h1>Image Puzzle</h1>
      <div className="upload-section">
        <select value={selectedLevel} onChange={handleLevelChange}>
          <option value="">Select Level</option>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={`level${i + 1}`}>{`level${i + 1}`}</option>
          ))}
        </select>
        <button onClick={handleFetchImages}>Fetch Images</button>
        <input
          type="text"
          value={selectedTitle}
          onChange={handleTitleChange}
          placeholder="Enter a title without any spaces"
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {loading ? (
        <p>Loading... Please wait, updating...</p>
      ) : errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <div className="image-sets">
          {imageSets.map(set => (
            <div key={`${set.title}-${set.level}`} className="image-set">
               <h2>{set.title} - {set.level || 'No Level'}</h2>
               <div className="center-button-container">
              <button onClick={() => handleDelete(set.title, set.level || '')} className="delete-button">Delete</button>
              </div>
              <div className="images-grid">
                {set.file_ids.map(fileId => (
                  <div key={fileId} className="image-container">
                    {imageUrls[fileId] ? (
                      <img src={imageUrls[fileId]} alt="Puzzle" />
                    ) : (
                      <p>Loading image...</p>
                    )}
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
