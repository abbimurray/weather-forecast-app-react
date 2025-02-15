import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ce98174c1ed73daee3c9b162b0de7fa6&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError('');
        console.log(response.data);
      } catch (err) {
        setError('Location not found. Please try again.');
        setData({});
      }
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <p className="searchLabel">Enter a location to get the current weather</p>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div className="container">

        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <>
                <p>{data.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </>
            ) : null}
          </div>
        </div>


        <div className="bottom">
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} m/s</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;