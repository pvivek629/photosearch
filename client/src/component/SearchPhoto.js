import React, { useState } from 'react'
// import Unsplash, { toJson } from "unsplash-js";
import Unsplash, {toJson} from "unsplash-js";
import './SearchPhoto.css';


const unsplash = new Unsplash({
  accessKey: "foW53BDc17GpHshU5wvheO-Af884fYpcgrn_iGEmXN0",
  secret:"Q5METckz5OA_EgkqTbIi14gwNNvDOfFkA1haHpzlP1g"
});

function SearchPhoto() {
    const [query, setQuery] = useState("");
    console.log(query);
    const [pics, setPics] = useState([]);

    
const searchPhotos = async (e) => {
  e.preventDefault();
  unsplash.search
    .photos(query)
    .then(toJson)
    .then((json) => {
      console.log(json);
      setPics(json.results); 
    });
};

  return (
    <>
    <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
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
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pics.map((pic) =>
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="100%"
              height="50%"
            ></img>
          </div>)}
      </div>  
    </>
  )
}

export default SearchPhoto;