import React from "react";

const WeatherCard = ({ date, temperature, weather }) => {
  const formattedDate = new Date(date).toLocaleString();

  const getWeatherIcon = () => {
    if (weather && weather.icon) {
      switch (weather.icon) {
        case "01d":
          return "../assets/sunny.png";
        case "02d":
        case "03d":
        case "04d":
          return "../assets/cloudy.png";
        case "09d":
        case "10d":
          return "../assets/rainy.png";
        case "11d":
          return "../assets/thunderstorm.png";
        default:
          return "../assets/sunny.png";
      }
    }
    return "../assets/sunny.png"; // Default icon
  };

  return (
    <div className="weather-card">
      <div className="weather-icon">
        <img src={getWeatherIcon()} alt="Weather Icon" />
      </div>
      <div className="weather-details">
        <h3>Date: {formattedDate}</h3>
        <p>Temperature: {temperature}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
