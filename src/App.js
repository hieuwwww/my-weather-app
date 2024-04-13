import React, { useState, useEffect } from "react";
import "./App.css";
import weatherImage from "./assets/weather-image.png"; // Import hình ảnh vào từ đường dẫn tương đối

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "b12c08c907a559eddbfe8d6bf1923e4b";
  const LAT = 21.0285;
  const LON = 105.8542;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [API_KEY, LAT, LON]);

  // Mapping weather icons to corresponding image paths
  const weatherIcons = {
    "01d": require("./assets/sunny.png"),
    "02d": require("./assets/cloudy.png"),
    "03d": require("./assets/cloudy.png"),
    "04d": require("./assets/cloudy.png"),
    "09d": require("./assets/rainy.png"),
    "10d": require("./assets/rainy.png"),
    "11d": require("./assets/thunderstorm.png"),
  };

  return (
    <div className="app">
      <div className="lebron">
        <h1>
          <img
            src={require("./assets/default-icon.png")}
            alt="Default Icon"
            className="default-icon"
          />
        </h1>
      </div>

      <h2> Weather Forecast</h2>
      <div className="weather-cards-container">
        {weatherData &&
          weatherData.list &&
          weatherData.list.map((forecast, index) => {
            const date = new Date(forecast.dt_txt).toLocaleString();
            const temperature = forecast.main.temp;
            const weather = forecast.weather[0];
            const weatherIcon = weatherIcons[weather.icon] || weatherImage; // Sử dụng biến đã import

            return (
              <div key={index} className="weather-card">
                <div className="weather-icon">
                  <img src={weatherIcon} alt="Weather Icon" />
                </div>
                <div className="weather-details">
                  <h3>Date: {date}</h3>
                  <p>Temperature: {temperature}°C</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
