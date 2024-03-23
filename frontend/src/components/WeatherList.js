import React from "react";
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
} from "weather-icons-react";

const WeatherList = () => {
  // Define weather data as an array of objects
  const weatherData = [
    { day: "Today", icon: <WiDaySunnyOvercast size={35} color="#2F5F8A" />, temperature: "31°C / 28°C" },
    { day: "Tuesday", icon: <WiRainMix size={35} color="#2F5F8A" />, temperature: "27°C / 24°C" },
    { day: "Wednesday", icon: <WiDayCloudy size={35} color="#2F5F8A" />, temperature: "29°C / 28°C" },
    { day: "Thursday", icon: <WiDayRainMix size={35} color="#2F5F8A" />, temperature: "28°C / 26°C" },
    { day: "Friday", icon: <WiThunderstorm size={35} color="#2F5F8A" />, temperature: "26°C / 24°C" },
    { day: "Saturday", icon: <WiDaySunnyOvercast size={35} color="#2F5F8A" />, temperature: "31°C / 28°C" },
    { day: "Sunday", icon: <WiDaySunnyOvercast size={35} color="#2F5F8A" />, temperature: "31°C / 28°C" },
  ];

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
