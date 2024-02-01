import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  TiWeatherCloudy,
  TiWeatherPartlySunny,
  TiWeatherSunny,
  TiWeatherShower,
} from "react-icons/ti";

export const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(""); // State to store user input for city

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
        return <TiWeatherSunny />;
      case "01n":
        return <TiWeatherSunny />;
      case "02d":
        return <TiWeatherPartlySunny />;
      case "02n":
        return <TiWeatherPartlySunny />;
      case "03d":
      case "03n":
        return <TiWeatherCloudy />;
      case "04d":
      case "04n":
        return <TiWeatherCloudy />;
      case "09d":
      case "09n":
        return <TiWeatherShower />;
      case "10d":
      case "10n":
        return <TiWeatherShower />;
      case "11d":
      case "11n":
        return <TiWeatherShower />;
      case "13d":
      case "13n":
        return <TiWeatherShower />;
      case "50d":
      case "50n":
        return <TiWeatherCloudy />;
      default:
        return null;
    }
  };

  // Function to fetch weather data
  const fetchWeatherDataByCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86174692b107bb76a072867acf5d259f`
      );
      console.log("fetch weather data by city name");
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherDataByCity();
    }
  }, [city]);

  return (
    <div>
      <div className=" lg:max-w-[500px] mb-12">
        <div className="mb-4">
          <label
            htmlFor="city"
            className="text-sm font-medium text-slate-200 block italic"
          >
            Enter City:
          </label>
          <input
            type="text"
            id="city"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 opacity-45 rounded-2xl"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder=" New York"
          />
        </div>

        {weather && (
          <div>
            <h2 className="text-xl text-slate-100 font-semibold ">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-slate-100 px-1">{weather.weather[0].description}</p>
          </div>
        )}

        {weather && (
          <div className=" transition-all bg-black bg-opacity-60 p-1 min-w-96 min-h-80 flex rounded-full justify-between flex-col items-center border-t-4 border-gradient-t-dark-blue-to-black mx-4 shadow-black shadow-2xl">
            <p className="text-4xl text-slate-300 font-bold p-2">
              {Math.round(weather.main.temp - 273.15)}°C
            </p>

            <div className="flex ">
              <p className="text-lg font-semibold text-slate-300 transition-all p-2 flex flex-col items-center">
                Humidity:
                <div className="p-2">{weather.main.humidity}%</div>
              </p>
              <div className="text-7xl p-2 text-white ">
                {getWeatherIcon(weather.weather[0].icon)}
              </div>
              <p className="text-lg font-semibold text-slate-300 transition-all p-2 flex flex-col items-center">
                Wind:
                <div className="p-1">{weather.wind.speed} m/s</div>
              </p>
            </div>

            <p className="text-lg font-semibold text-slate-300 transition-all p-2 flex flex-col items-center">
              Feels like:
              <div className="">
                {Math.round(weather.main.feels_like - 273.15)}°C
              </div>
            </p>
          </div>

        
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
