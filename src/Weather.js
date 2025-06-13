import React from "react";
import "./Weather.css";
import axios from "axios";
import Worldtemp from "./Worldtemp.png";

function Weather() {
  const [city, setCity] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const apiKey = "5f114b623b2c42d49c3102625230807";
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      setData(response.data);
    } catch (err) {
      setError("City not found. Please try another location.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Weather Forecast</h1>
          <p className="app-subtitle">Get real-time weather updates</p>
        </header>

        <form onSubmit={fetchWeatherData} className="search-form">
          <div className="search-container">
            <input
              type="text"
              name="city"
              className="search-input"
              placeholder="Enter city name..."
              value={city}
              onChange={handleChange}
              aria-label="City search input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>

        {data && (
          <div className="weather-card">
            <div className="weather-main">
              <div className="weather-current">
                <h2 className="city-name">
                  {data.location.name}, {data.location.country}
                </h2>
                <p className="current-time">
                  {new Date(data.location.localtime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <div className="temperature-display">
                  <div className="temp-value">
                    {data.current.temp_c}°<span>C</span>
                  </div>
                  <img
                    src={Worldtemp}
                    alt="Weather icon"
                    className="weather-icon"
                  />
                </div>
                <p className="weather-condition">{data.current.condition.text}</p>
                <p className="feels-like">
                  Feels like: {data.current.feelslike_c}°C
                </p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                </svg>
                <div>
                  <span>Wind</span>
                  <strong>{data.current.wind_kph} km/h</strong>
                </div>
              </div>

              <div className="detail-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                </svg>
                <div>
                  <span>Humidity</span>
                  <strong>{data.current.humidity}%</strong>
                </div>
              </div>

              <div className="detail-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
                </svg>
                <div>
                  <span>Pressure</span>
                  <strong>{data.current.pressure_mb} mb</strong>
                </div>
              </div>

              <div className="detail-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                </svg>
                <div>
                  <span>Visibility</span>
                  <strong>{data.current.vis_km} km</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;