import React, { useEffect, useState } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  WeatherCard,
  WeatherList,
  DashboardMap,
} from "../components";
import { format } from "date-fns";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import weather_sun from "../assets/weather-sun.png";
import weather_night from "../assets/Weather-Night.png";
import weather_rain from "../assets/Weather-Rain.png";
import weather_cloudy from "../assets/Weather-Sun-Cloud.png";
import weather_sun_rain from "../assets/Weather-Sun-Rain.png";
import weather_thunder from "../assets/Weather-Thunder.png";
import { ReactComponent as WeatherRect } from "../assets/weather_rectangle.svg";

const currentDate = new Date();

const FarmerDashboard = () => {
  const [weatherData, setWeatherData] = useState({
    currentTemp: null,
    high: null,
    low: null,
    wind: null,
    humidity: null,
    precipitation: null,
    uvIndex: null,
    location: null,
    weatherCondition: null,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch user's current location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch location name (state and country) using reverse geocoding
            const locationName = await fetchLocationName(latitude, longitude);

            // Fetch weather data based on user's current location
            const weatherData = await fetchWeather(latitude, longitude);

            setWeatherData({ ...weatherData, location: locationName });
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      return `${data.address.state}, ${data.address.country}`;
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown";
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      // Fetch weather data based on latitude and longitude
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`
      );
      const data = await response.json();
      console.log("Fetched weather data:", data);

      const currentWeather = data.current || {};

      const currentTemp = currentWeather.temperature_2m || null;
      const wind = currentWeather.wind_speed_10m || null;
      const humidity = currentWeather.relative_humidity_2m || null;
      const precipitation = currentWeather.precipitation || null;
      const weatherCode = currentWeather.weather_code || null;
      const weatherCondition = getWeatherCondition(weatherCode);

      return {
        currentTemp,
        wind,
        humidity,
        precipitation,
        weatherCondition,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return {};
    }
  };

  const getWeatherCondition = (weatherCode) => {
    if (weatherCode === 3 || (weatherCode >= 30 && weatherCode <= 39)) {
      return "Cloudy";
    } else if (weatherCode >= 0 && weatherCode <= 19) {
      return "Sunny";
    } else if ((weatherCode >= 20 && weatherCode <= 29) || (weatherCode >= 40 && weatherCode <= 49)) {
      return "Rainy";
    } else if (weatherCode >= 50 && weatherCode <= 79) {
      return "Thunderstorm";
    } else if (weatherCode >= 80 && weatherCode <= 99) {
      return "Rainy";
    } else {
      return "Partly Cloudy";
    }
  };
  const isNightTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 19 || currentHour < 6;
  };
  
  const getWeatherLogo = (weatherCondition) => {
    if (isNightTime() && weatherCondition !== "Rainy" && weatherCondition !== "Thunderstorm") {
      return weather_night;
    }
  
    switch (weatherCondition) {
      case "Sunny":
        return weather_sun;
      case "Cloudy":
        return weather_cloudy;
      case "Rainy":
        return weather_rain;
      case "Thunderstorm":
        return weather_thunder;
      default:
        return weather_sun;
    }
  };
  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  

    return () => clearInterval(interval);
  }, []);
  

  const [currentTime, setCurrentTime] = useState(new Date());

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full mobile:ml-0 tablet:ml-0">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Dashboard</DashboardTitle>
          <div className="text-right">
            <div>
              <span className="text-xl sm:text-4xl">
                {format(currentTime, "h:mm:ss ")}
              </span>

              <span>{format(currentDate, "a")}</span>
            </div>
            <div>{format(currentDate, "EEEE, d MMMM, yyyy")}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 tablet:grid-cols-6 tablet:gap-2 mobile:flex flex-col">
          <div className="col-span-3 rounded border p-5 border-grayBorder tablet:col-span-4">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Geofenced Area
            </Typography>
            <DashboardMap className="z-0" />
          </div>
          <Card className="col-span-1 bg-skyBlue rounded p-5 tablet:col-span-2 tablet:p-2">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Weather
            </Typography>
            <CardBody className="p-0">
              <div className="relative py-10">
                <WeatherRect className="absolute mobile:hidden" />
                <div className="grid grid-cols-2">
                  <div className="z-10">
                    <h1 className="text-5xl font-bold p-5 pt-10 z-10 text-white mobile:text-black">
                      {Math.round(weatherData.currentTemp)}°C
                    </h1>
                  </div>
                  <img
                    className="object-cover object-top z-10 mt-[-50px]"
                    width={400}
                    src={getWeatherLogo(weatherData.weatherCondition)}
                    alt="weather"
                  />

                </div>
                <div className="grid grid-cols-3">
                  <p className="text-md px-5 col-span-2 text-white z-20 mobile:text-black">
                    {weatherData.location}
                  </p>
                  <p className="text-md text-right font-semibold col-span-1 px-5 text-white z-20 mobile:text-black">
                    {weatherData.weatherCondition}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <WeatherCard
                  icon="weatherIcon-1.svg"
                  title="Wind"
                  value={weatherData.wind}
                  constant="km/h"
                />
                <WeatherCard
                  icon="weatherIcon-2.svg"
                  title="Humidity"
                  value={weatherData.humidity}
                  constant="%"
                />
                <WeatherCard
                  icon="weatherIcon-3.svg"
                  title="Precipitation"
                  value={weatherData.precipitation || 0} // Display 0 if precipitation is null
                  constant="%"
                />

                <WeatherCard
                  icon="weatherIcon-4.svg"
                  title="UV Index"
                  value={8}
                  constant="UVI"
                />

              </div>
              <div className="mt-2">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mt-5"
                >
                  7-Day Forecast
                </Typography>
                <WeatherList />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
