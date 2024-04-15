import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // Đặt ngày được chọn mặc định là ngày hiện tại

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const API_KEY = "b12c08c907a559eddbfe8d6bf1923e4b";

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        // Tạo danh sách các ngày duy nhất từ dữ liệu dự báo
        const dates = data.list.map(
          (forecast) => forecast.dt_txt.split(" ")[0]
        );
        const uniqueDates = [...new Set(dates)];
        setUniqueDates(uniqueDates);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [API_KEY, latitude, longitude]);

  // Hàm để lấy ngày hiện tại dưới dạng chuỗi YYYY-MM-DD
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app">
      <h1>
        <img
          src={require("./assets/default-icon.png")}
          alt="Default Icon"
          className="default-icon"
        />
      </h1>
      <h2>Weather Forecast</h2>

      <div className="date-selector">
        {uniqueDates.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={date === selectedDate ? "selected" : ""}
          >
            {date}
          </button>
        ))}
      </div>
      <div className="weather-cards-container">
        {weatherData &&
          weatherData.list &&
          weatherData.list.map((forecast, index) => {
            const date = forecast.dt_txt.split(" ")[0];
            const time = forecast.dt_txt.split(" ")[1];
            const temperature = forecast.main.temp;
            const weather = forecast.weather[0];
            const weatherIconURL = `https://openweathermap.org/img/wn/${weather.icon}.png`;

            // Nếu ngày được chọn không khớp với ngày trong dữ liệu, bỏ qua
            if (selectedDate && date !== selectedDate) {
              return null;
            }

            return (
              <div key={index} className="weather-card">
                <div className="weather-icon">
                  <img src={weatherIconURL} alt="Weather Icon" />
                </div>
                <div className="weather-details">
                  <h3>{time}</h3> {/* Chỉ hiển thị phần giờ và phút */}
                  <p> {temperature}°C</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
