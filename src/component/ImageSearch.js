import React, { useState, useEffect } from 'react';
import './ImageSearch.css';

function ImageSearch() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Fetch images from Unsplash API
    fetchImages();
  }, [page, query]);

  const fetchImages = () => {
    const accessKey = 'foW53BDc17GpHshU5wvheO-Af884fYpcgrn_iGEmXN0';
    const perPage = 10; // Number of images per page
    const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (page === 1) {
          // If it's the first page or a new search, replace the existing images with the new ones
          setImages(data);
        } else {
          // Otherwise, append the new images to the existing ones
          setImages((prevImages) => [...prevImages, ...data]);
        }
      })
      .catch((error) => console.error('Error fetching images:', error));
  };

  const searchPhotos = () => {
    // When the "Search" button is clicked, reset the page to 1
    setPage(1);
    
    // Clear existing images
    setImages([]);
    
    // Fetch images with the new query
    fetchImages();
  };

  const loadMoreImages = () => {
    // Increment the page number to fetch the next page
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Unsplash Images</h1>
      <div className="form">
        <label className="label" htmlFor="query">
          {' '}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" onClick={searchPhotos}>
          Search
        </button>
      </div>
      <div className="card-list">
        {images.map((image) => (
          <img
            className="card--image"
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            width="100%"
            height="50%"
          />
        ))}
      </div>
      <button onClick={loadMoreImages}>Load More</button>
    </div>
  );
}

export default ImageSearch;
