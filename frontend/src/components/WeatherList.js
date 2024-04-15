import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  WiDaySunnyOvercast,
  WiRainMix,
  WiDayCloudy,
  WiDayRainMix,
  WiThunderstorm,
  WiDaySunny,
} from "weather-icons-react";

const WeatherList = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/melaka?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cprecip%2Cprecipprob%2Cwindspeed%2Cuvindex%2Cconditions%2Cdescription&include=days%2Ccurrent&key=CW6UA3S2S4WSWTBWBBZ7V6MCP&contentType=json");
      const data = await response.json();
      const days = data?.days || [];
      const formattedData = days.slice(0, 7).map((day, index) => ({
        day: index === 0 ? "Today" : new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long' }),
        icon: getWeatherIcon(day.conditions),
        temperature: `${Math.round(day.tempmax)}°C / ${Math.round(day.tempmin)}°C`

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

  const getWeatherIcon = (conditions) => {
    if (!conditions) {
      return null; // or some default icon
    }

    if (conditions.toLowerCase().includes("thunderstorm")) {
      return <WiThunderstorm size={35} color="#2F5F8A" />;
    } else if (conditions.toLowerCase().includes("rain") && conditions.toLowerCase().includes("overcast")) {
      return <WiRainMix size={35} color="#2F5F8A" />;
    } else if (conditions.toLowerCase().includes("rain") && conditions.toLowerCase().includes("partially cloudy")) {
      return <WiDayRainMix size={35} color="#2F5F8A" />;
    } else if (conditions.toLowerCase().includes("partially cloudy")) {
      return <WiDayCloudy size={35} color="#2F5F8A" />;
    } else if (conditions.toLowerCase().includes("clear")) {

      return <WiDaySunny size={35} color="#2F5F8A" />;
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
