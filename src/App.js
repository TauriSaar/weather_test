import './App.css';
import { useState } from 'react';
import { createMockServer } from './createMockServer';
import config from './config';

if(process.env.NODE_ENV === 'development') {
  createMockServer();
}

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const buttonClickHandler = () => {
    const apiKey = config.apiKey;

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
      .then((result) => result.json())
      .then((cities) => {
        setSearchResults(
          cities.map((city) => ({
            name: city.name,
            country: city.country,
            lat: city.lat,
            lon: city.lon
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <input type="text" data-testid="search-input" onChange={inputChangeHandler} />
      <button data-testid="search-button" onClick={buttonClickHandler}>
        Search
      </button>
  
      <div data-testid="search-results">
        {searchResults.map((city) => (
          <div key={`${city.lat}-${city.con}`}>{city.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
