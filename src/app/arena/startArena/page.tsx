'use client';
import './startArena.scss'; // Import globally
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { ImageData } from '../../types/types';

const StartArena = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [Date, setDate] = useState<string>('');

  const [level, setLevel] = useState<string>('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const totalImages = images.length;

  const router = useRouter();

  useEffect(() => {
    // Extract query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const queryTitle = queryParams.get('title');
    const queryLevel = queryParams.get('level');
    const queryCategory = queryParams.get('category');
    const queryDate = queryParams.get('date_time');


    if (queryTitle) setTitle(decodeURIComponent(queryTitle));
    if (queryDate) setDate(decodeURIComponent(queryDate));

    if (queryCategory) setCategory(decodeURIComponent(queryCategory));
    if (queryLevel) setLevel(decodeURIComponent(queryLevel));
  }, []);

  useEffect(() => {
    // Fetch images when title and level are available
    if (title && level) {
      const fetchImages = async () => {
        try {
          const response = await axios.get(`https://backend-chess-tau.vercel.app/images/title?level=${encodeURIComponent(level)}&category=${encodeURIComponent(category)}&title=${encodeURIComponent(title)}`);
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
    const url = `/arena/insidepuzzlearena?file_id=${encodeURIComponent(image.id)}&title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&level=${encodeURIComponent(level)}`;
    router.push(url);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <div className="infoTable">
        <table>
          <thead>
            <tr>
            <th>Date Added</th>
              <th>Level</th>
              <th>Category</th>
              <th>Name</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{Date}</td>
              <td>{level}</td>
              <td>{category}</td>
              <td>{title}</td>
              <td>Not Started</td>
              <td>1/{totalImages}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 className="title">{title}</h1>
      <div className="imageGallery">
        {images.map((image,index) => (
          <div key={image.id} onClick={() => handleImageClick(image)} style={{ cursor: 'pointer' }}>
            <img src={imageUrls[image.id] || '/default-image.png'} alt={image.filename} />
            <div className="imageText">
              <button className="puzzleButton">Puzzle {index + 1}</button>
              <button className="statusButton">Not started</button>
              <button className="statusButton">Correct</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartArena;
