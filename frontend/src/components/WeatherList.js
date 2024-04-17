import React, { useEffect, useState, useCallback } from "react";
import { List, ListItem, ListItemPrefix, Card, Typography } from "@material-tailwind/react";
import { WiDaySunnyOvercast, WiRainMix, WiDayCloudy, WiDayRainMix, WiThunderstorm, WiDaySunny } from "weather-icons-react";

const WeatherList = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max");
      const data = await response.json();
      console.log("Fetched data:", data);
      const { time, weather_code, temperature_2m_max, temperature_2m_min } = data.daily;
  
      const formattedData = time.map((day, index) => ({
        day: new Date(day).toLocaleDateString('en-US', { weekday: 'long' }),
        icon: getWeatherIcon(weather_code[index]),
        temperature: `${Math.round(temperature_2m_max[index])}°C / ${Math.round(temperature_2m_min[index])}°C`
      }));
  
      setWeatherData(formattedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeatherData();
    };

    fetchData();
  }, [fetchWeatherData]);

  const getWeatherIcon = (weatherCode) => {
    // Return appropriate weather icon based on weather code range
    if (weatherCode >= 0 && weatherCode <= 19) {
      // No precipitation, fog, ice fog, duststorm, etc.
      return <WiDaySunny size={35} color="#2F5F8A" />;
    } else if ((weatherCode >= 20 && weatherCode <= 29) || (weatherCode >= 40 && weatherCode <= 49)) {
      // Precipitation, fog, ice fog
      return <WiRainMix size={35} color="#2F5F8A" />;
    } else if (weatherCode >= 30 && weatherCode <= 39) {
      // Duststorm, sandstorm, drifting or blowing snow
      return <WiDayCloudy size={35} color="#2F5F8A" />;
    } else if (weatherCode >= 50 && weatherCode <= 79) {
      // Showery precipitation, or precipitation with current or recent thunderstorm
      return <WiThunderstorm size={35} color="#2F5F8A" />;
    } else if (weatherCode >= 80 && weatherCode <= 99) {
      // Rain shower(s), snow shower(s), thunderstorm, etc.
      return <WiDayRainMix size={35} color="#2F5F8A" />;
    } else {
      // Default icon
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
