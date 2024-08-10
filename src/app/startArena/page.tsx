'use client';
import './startArena.scss'; // Import globally
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { ImageData } from '../types/types';

const StartArena = () => {
  const [title, setTitle] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryTitle = queryParams.get('title');
    const queryLevel = queryParams.get('level');

    if (queryTitle) setTitle(queryTitle);
    if (queryLevel) setLevel(queryLevel);
  }, []);

  useEffect(() => {
    if (title && level) {
      const fetchImages = async () => {
        try {
          const response = await axios.get(`https://backend-chess-tau.vercel.app/images/${title}?level=${level}`);
          const imagesData: ImageData[] = response.data.images;

          setImages(imagesData);
          fetchAllImages(imagesData); // Fetch the image files
        } catch (err) {
          console.error(err);
          setError('Failed to fetch images');
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [title, level]);

  const fetchAllImages = (imageSets: ImageData[]) => {
    imageSets.forEach(image => {
      fetchImageFile(image.id);
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

  const handleImageClick = (image: ImageData) => {
    const url = `/insidepuzzlearena?file_id=${image.id}&title=${encodeURIComponent(title)}&level=${encodeURIComponent(level)}`;
    router.push(url);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <div className="imageGallery">
        {images.map((image) => (
          <div key={image.id} onClick={() => handleImageClick(image)} style={{ cursor: 'pointer' }}>
            <img src={imageUrls[image.id] || ''} alt={image.filename} />
          </div>
        ))}
      </div >
    </div>
  );
};

export default StartArena;
