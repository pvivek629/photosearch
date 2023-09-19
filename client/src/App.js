import React from 'react';
import './App.css';
import SearchPhoto from './component/SearchPhoto';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageSearch from './component/ImageSearch';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title text-center">Photo Gallery</h1>
        {/* <SearchPhoto/> */}
        <ImageSearch/>
      </div>
    </div>
  );
}

export default App;