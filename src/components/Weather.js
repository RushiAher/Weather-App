// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=a7896fcd5baa619bbf54e3692d0fedcc

import React,{useState, useEffect} from "react";
import "./style.css";

const Weather = () => {
    const [searchValue, setsearchValue] = useState("pune");
    const [TempInfo, setTempInfo] = useState({})
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a7896fcd5baa619bbf54e3692d0fedcc`;
            let res = await fetch(url);
            let data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { speed } = data.wind;
            const {main:weathermood} = data.weather[0];
            const { country, sunset } = data.sys;
            console.log(temp, humidity, pressure, speed, weathermood);
            let sec = sunset;
            let date = new Date(sec * 1000);
            let timeStr = `${date.getHours()}:${date.getMinutes()}`
            const myNewWeatherInfo = {
                temp, humidity, pressure, speed, weathermood, country, timeStr,
            };
            setTempInfo(myNewWeatherInfo);
        
        } catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherInfo();
    }, [])
  return (
    <>
      <div className="main">
        <div className="wrap">
          <div className="search">
                      <input type="search" placeholder="search..." autoFocus
                          onChange={(event) => setsearchValue(event.target.value)}
                          value={searchValue}
                      />
            <button className="search-btn" onClick={getWeatherInfo}>Search</button>
          </div>
        </div>

        <div className="weather-card">
          <div className="temp">
            <i class="fa-solid fa-cloud-moon-rain"></i>
          </div>
          <div className="temp-desc">
            <span className="temprature">{TempInfo.temp}&deg;</span>
            <div className="desc-container">
              <span className="weather">{TempInfo.weathermood}</span>
              <span className="city-name">{TempInfo.country}</span>
            </div>
          </div>
          <div className="date">{new Date().toLocaleString()}</div>
          <div className="day-time">
            <span className="day-time-icon">
              <i class="fa-light fa-sunrise"></i>
            </span>
            <div className="day-container">
              <span className="time">{TempInfo.timeStr} PM</span>
              <span className="day-name">Sunset</span>
            </div>
          </div>
          <div className="humidity">
            <span className="humidity-icon">
              <i class="fa-solid fa-sunset"></i>
            </span>
            <div className="humidity-container">
                          <span>{TempInfo.humidity}</span>
              <span>Humidity</span>
            </div>
          </div>
          <div className="pressure">
            <span className="pressure-icon">
              <i class="fa-solid fa-sunset"></i>
            </span>
            <div className="pressure-container">
              <span >Pressure</span>
              <span>{TempInfo.pressure} MM</span>
            </div>
          </div>
          <div className="speed">
            <span className="speed-icon">
             <i class="fa-light fa-wind"></i>
            </span>
            <div className="speed-container">
              <span>Wind</span>
              <span>{TempInfo.speed}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
