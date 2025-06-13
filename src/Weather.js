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
    setData(null);

    try {
      const apiKey = "5f114b623b2c42d49c3102625230807";
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
      );

      if (response.data.error) {
        setError(response.data.error.message || "City not found.");
        return;
      }

      setData(response.data);
      // updateBackground(response.data.current.condition.text); // Only if you have this function
    } catch (err) {
      setError("Failed to fetch weather data. Please try another location.");
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
              {loading ? <span className="spinner"></span> : <span>Search</span>}
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
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="temperature-display">
                  <div className="temp-value">
                    {data.current.temp_c}°<span>C</span>
                  </div>
                  <img src={Worldtemp} alt="Weather icon" className="weather-icon" />
                </div>
                <p className="weather-condition">{data.current.condition.text}</p>
                <p className="feels-like">
                  Feels like: {data.current.feelslike_c}°C
                </p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span>💨 Wind</span>
                <strong>{data.current.wind_kph} km/h</strong>
              </div>
              <div className="detail-item">
                <span>💧 Humidity</span>
                <strong>{data.current.humidity}%</strong>
              </div>
              <div className="detail-item">
                <span>🌡 Pressure</span>
                <strong>{data.current.pressure_mb} mb</strong>
              </div>
              <div className="detail-item">
                <span>👁 Visibility</span>
                <strong>{data.current.vis_km} km</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
