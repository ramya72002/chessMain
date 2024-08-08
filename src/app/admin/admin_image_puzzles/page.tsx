'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin_image_puzzles.scss';

interface ImageSet {
  title: string;
  file_ids: string[];
}

const AdminImagePuzzles: React.FC = () => {
  const [imageSets, setImageSets] = useState<ImageSet[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchImageSets();
  }, []);

  const fetchImageSets = () => {
    setLoading(true);
    axios.get('https://backend-chess-tau.vercel.app/get')
      .then(response => {
        setImageSets(response.data.image_sets);
        setLoading(false);
        fetchAllImages(response.data.image_sets);
      })
      .catch(error => {
        setErrorMessage('Error fetching images.');
        setLoading(false);
        console.error('Error fetching images:', error);
      });
  };

  const fetchAllImages = (imageSets: ImageSet[]) => {
    imageSets.forEach(set => {
      set.file_ids.forEach(fileId => {
        fetchImageFile(fileId);
      });
    });
  };

  const fetchImageFile = (fileId: string) => {
    axios.post('https://backend-chess-tau.vercel.app/image_get_fileid', { file_id: fileId }, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        setImageUrls(prevState => ({ ...prevState, [fileId]: url }));
      })
      .catch(error => {
        console.error(`Error fetching image with file ID ${fileId}:`, error);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value);
  };

  const handleUpload = () => {
    if (selectedFiles && selectedTitle) {
      const formData = new FormData();
      formData.append('title', selectedTitle);
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
      setErrorMessage('Please select files and choose a title.');
    }
  };

  const handleDelete = (title: string) => {
    if (window.confirm(`Are you sure you want to delete the image set titled "${title}"?`)) {
      axios.delete('http://127.0.0.1:80/delete-arena-title', {
        data: { title }
      })
        .then(response => {
          console.log(response.data.message);
          fetchImageSets();
        })
        .catch(error => {
          setErrorMessage(`Error deleting image set titled "${title}".`);
          console.error('Error deleting image set:', error);
        });
    }
  };
  
  return (
    <div className="image-puzzle">
      <h1>Image Puzzle</h1>
      <div className="upload-section">
        <select value={selectedTitle} onChange={handleTitleChange}>
          <option value="">Select a title</option>
          {imageSets.map(set => (
            <option key={set.title} value={set.title}>
              {set.title}
            </option>
          ))}
        </select>
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
              <button onClick={() => handleDelete(set.title)} className="delete-button">Delete</button>
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
