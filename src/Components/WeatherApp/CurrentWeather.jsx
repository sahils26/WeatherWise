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
import WeatherApp from "./WeatherApp";

export const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch weather data by coordinates
  const fetchWeatherDataByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=86174692b107bb76a072867acf5d259f`
      );
      console.log("response", response.data);
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
    getUserLocation();
  }, []);

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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="template p-8 rounded-md shadow-md  flex items-center justify-center ">
        <div className="">
          {loading ? (
            <div className="beautiful-loader flex  items-center justify-center text-slate-400 text-2xl font-extralight">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col items-center m-2 justify-between ">
              <div className="lg:min-w-[500px]  m-4 relative ">
                <h1 className="text-3xl font-extrabold text-slate-300 m-2 absolute -top-16">
                  ------Weather Wise------
                </h1>
                <div className="min-w-[1000px] font-mono">
                  <h1 className="text-4xl font-bold text-white font-mono ">
                    {currentWeather.name}, {currentWeather.sys.country}
                  </h1>
                  <div className="flex items-center justify-between">
                    <p className="text-5xl text-white font-bold font-mono ">
                      {Math.round(currentWeather.main.temp - 273.15)}°C
                    </p>
                    <div className="flex flex-col items-center justify-center px-3">
                      <p className="text-7xl text-white">  
                        {getWeatherIcon(currentWeather.weather[0].icon)}
                      </p>
                        <p className="text-slate-200 italic">~{currentWeather.weather[0].description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center font-mono">
                  <div className="mt-4 transition-all bg-black bg-opacity-40 p-5 min-w-full flex rounded-2xl justify-between ">
                    <p className="text-xl font-semibold text-slate-200 transition-all p-1 flex flex-col items-center">
                      Humidity:
                      <div className="p-1">{currentWeather.main.humidity}%</div>
                    </p>
                    <p className="text-xl font-semibold text-slate-200 transition-all p-1 flex flex-col items-center">
                      Wind:
                      <div className="p-1">{currentWeather.wind.speed} m/s</div>
                    </p>
                    <p className="text-xl font-semibold text-slate-200 transition-all p-1 flex flex-col items-center">
                      Feels like:
                      <div className="p-1">
                        {Math.round(currentWeather.main.feels_like - 273.15)}°C
                      </div>
                    </p>
                  </div>

                  
                </div>
              </div>

              <WeatherApp />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
