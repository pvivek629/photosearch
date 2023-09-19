import React, { useState, useEffect } from 'react';
import './ImageSearch.css';

function ImageSearch() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {

    fetchImages();
  }, [page, query]);

  const fetchImages = () => {
    fetch(`/api/images?query=${query}&page=1`)
    .then((response) => response.json())
    .then((data) => { 
      if (page === 1) {

        setImages(data);
      } else {
       
        setImages((prevImages) => [...prevImages, ...data]);
      }
    })
    .catch((error) => console.error('Error fetching images:', error));
  };

  const searchPhotos = () => {
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=4UhQL7IdZ55_AGB-WhQQNVlxTwun4XNQI0lXn6L-gqM`)
    .then(response => response.json())
    .then((data) => {
      if (page === 1) {
        
       
        setImages(data.results);
      } else {
        
        setImages((prevImages) => [...prevImages, ...data]);
      }
    })
  
      
      
    
  };

  const loadMoreImages = () => {
    
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
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
      <div className='d-flex justify-content-center align-items-center mt-5 h1'>
        <button className='loadbutton' onClick={loadMoreImages}>Load More</button>
      </div>
      
    </div>
  );
}

export default ImageSearch;
