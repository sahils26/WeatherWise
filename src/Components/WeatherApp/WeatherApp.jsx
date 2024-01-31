import React from "react";
import {
  TiWeatherCloudy,
  TiWeatherPartlySunny,
  TiWeatherSunny,
  TiWeatherShower,
} from "react-icons/ti";
import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [city, setCity] = useState(""); // State to store user input for city
  const [loading, setLoading] = useState(true);

  // Function to fetch weather data
  const fetchWeatherDataByCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86174692b107bb76a072867acf5d259f`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Function to fetch weather data by coordinates
  const fetchWeatherDataByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=86174692b107bb76a072867acf5d259f`
      );
      console.log("hey");
      setCurrentWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data by coordinates:", error);
    }
    setLoading(false);
  };

  // Function to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherDataByCity();
    } else {
      getUserLocation();
    }
  }, [city]);

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

  return (
    // <div className='mx-auto'>
    //     <div>WeatherApp</div>
    //     <div className='flex justify-center mx-auto GeeksForGeeks '>
    //         <form className=''>
    //             <div className='flex relative m-1 p-2 '>
    //                 <input type='text' placeholder='Enter city name' name='cityName' className='rounded-2xl p-2 '/>
    //                 <button className='absolute -right-7 top-4'>
    //                     <FaSearch size={25}/>
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    // </div>

    <div className="min-h-screen flex items-center justify-center ">
      <div className="template p-8 rounded-md shadow-md min-w-[1000px] flex items-center justify-center ">
        <div className="">
          {loading ? (
            <div className="beautiful-loader flex  items-center justify-center text-slate-400 text-2xl font-mono " >...</div>
          ) : (
            <div>
              <h1 className="text-5xl font-extrabold text-white font-mono mb-4">
                Weather App
              </h1>

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
                  <h2 className="text-xl text-white font-semibold my-3">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl text-white font-bold mt-2">
                      {Math.round(weather.main.temp - 273.15)}°C
                    </p>
                    <div className="text-7xl mt-2 text-white ">
                      {getWeatherIcon(weather.weather[0].icon)}
                    </div>
                  </div>
                  <p className="text-white px-1">
                    {weather.weather[0].description}
                  </p>
                </div>
              )}

              {weather && (
                <div className="mt-4 transition-all bg-black bg-opacity-60 p-5 min-w-96 flex rounded-2xl justify-between">
                  <p className="text-md font-semibold text-slate-300 transition-all p-2 flex flex-col items-center">
                    Humidity:
                    <div className="p-1">{weather.main.humidity}%</div>
                  </p>
                  <p className="text-md font-semibold text-slate-300 transition-all p-2 flex flex-col items-center">
                    Wind:
                    <div className="p-1">{weather.wind.speed} m/s</div>
                  </p>
                  <p className="text-md font-semibold text-slate-300 transition-all p-2 flex flex-col items-center">
                    Feels like:
                    <div className="p-1">
                      {Math.round(weather.main.feels_like - 273.15)}°C
                    </div>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
