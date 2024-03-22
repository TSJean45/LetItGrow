import React from "react";
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
import weather_logo from "../assets/weather-sun.png";
import { ReactComponent as WeatherRect } from "../assets/weather_rectangle.svg";

const currentDate = new Date();

const FarmerDashboard = () => {
  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" farmName="Farm A"/>
        <div className="flex justify-between items-center">
          <DashboardTitle>Dashboard</DashboardTitle>
          <div className="text-right">
            <div>
              <span className="text-4xl">
                {format(currentDate, "h:mm:ss ")}
              </span>
              <span>{format(currentDate, "a")}</span>
            </div>
            <div>{format(currentDate, "EEEE, d MMMM, yyyy")}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 rounded border p-5 border-grayBorder">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Geofenced Area
            </Typography>
            <DashboardMap className="z-0"/>
          </div>
          <Card className="col-span-1 bg-skyBlue rounded p-5">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Weather
            </Typography>
            <CardBody className="p-0">
              <div className="relative py-10">
                <WeatherRect className="absolute" />
                <div className="grid grid-cols-2">
                  <div className="z-10">
                    <h1 className="text-5xl font-bold p-5 z-10 text-white">
                      30°C
                    </h1>
                    <p className="text-sm px-5 text-white">H: 31°C L: 28°C</p>
                  </div>
                  <img
                    className="object-cover object-top z-10 mt-[-50px]"
                    width={400}
                    src={weather_logo}
                    alt="weather"
                  />
                </div>
                <div className="grid grid-cols-3">
                  <p className="text-md px-5 col-span-2 text-white z-20">
                    Ayer Keroh, Melaka
                  </p>
                  <p className="text-md text-right font-semibold col-span-1 px-5 text-white z-20">
                    Sunny
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <WeatherCard
                  icon="weatherIcon-1.svg"
                  title="Wind"
                  value={12}
                  constant="km/h"
                />
                <WeatherCard
                  icon="weatherIcon-2.svg"
                  title="Humidity"
                  value={50}
                  constant="%"
                />
                <WeatherCard
                  icon="weatherIcon-3.svg"
                  title="Precipitation"
                  value={10}
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
                <Typography variant="h5" color="blue-gray" className="mt-5">
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
