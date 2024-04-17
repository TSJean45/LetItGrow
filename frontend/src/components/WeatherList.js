import React, { useEffect, useState, useCallback } from "react";
import { List, ListItem, ListItemPrefix, Card, Typography } from "@material-tailwind/react";
import { WiDaySunnyOvercast, WiRainMix, WiDayCloudy, WiDayRainMix, WiThunderstorm, WiDaySunny } from "weather-icons-react";

const WeatherList = () => {
  const [weatherData, setWeatherData] = useState([]);
  
  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&forecast_days=8`);
        const data = await response.json();
        console.log("Fetched data:", data);
        const { time, weather_code, temperature_2m_max, temperature_2m_min } = data.daily;

        const formattedData = time.map((day, index) => ({
          day: index === 0 ? "Today" : new Date(day).toLocaleDateString('en-US', { weekday: 'long' }),
          icon: getWeatherIcon(weather_code[index]),
          temperature: `${Math.round(temperature_2m_max[index])}°C / ${Math.round(temperature_2m_min[index])}°C`
        }));

        setWeatherData(formattedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherData(latitude, longitude);
        }, (error) => {
          console.error("Error getting geolocation:", error);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode >= 0 && weatherCode <= 19) {
      return <WiDaySunny size={35} color="#2F5F8A" />;
    } else if ((weatherCode >= 20 && weatherCode <= 29) || (weatherCode >= 40 && weatherCode <= 49)) {
      return <WiRainMix size={35} color="#2F5F8A" />;
    } else if (weatherCode >= 30 && weatherCode <= 39) {
      return <WiDayCloudy size={35} color="#2F5F8A" />;
    } else if (weatherCode >= 50 && weatherCode <= 79) {
      return <WiThunderstorm size={35} color="#2F5F8A" />;
    } else if (weatherCode >= 80 && weatherCode <= 99) {
      return <WiDayRainMix size={35} color="#2F5F8A" />;
    } else {
      return <WiDaySunnyOvercast size={35} color="#2F5F8A" />;
    }
  };

  return (
    <Card>
      <List className="bg-white text-black font-bold">
        {weatherData.map((weather, index) => (
          <ListItem key={index} className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  {weather.day}
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center w-14">{weather.icon}</div>
              <div className="flex items-center justify-between w-24">
                <Typography variant="small" color="gray" className="font-normal">
                  {weather.temperature}
                </Typography>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default WeatherList;
