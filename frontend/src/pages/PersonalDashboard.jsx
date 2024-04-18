import React, { useState, useEffect } from "react";

import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  WeatherCard,
  WeatherList,
  PersonalCarousel,
  ActivePlant,
} from "../components";
import { format } from "date-fns";
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Button,
  Dialog,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import weather_logo from "../assets/weather-sun.png";
import { ReactComponent as WeatherRect } from "../assets/weather_rectangle.svg";

const PersonalDashboard = () => {
  const [value, setValue] = useState("melaka");
  const [activeCard, setActiveCard] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const currentDate = new Date();

  const handleValueChange = (val) => {
    setValue(val);
  };

  useEffect(() => {
    setActiveCard(jsonData[0]); // Set active card when jsonData changes (after fetch)
  }, [jsonData]);

  const handleActiveCardChange = (activeCardData) => {
    setActiveCard(activeCardData);
    console.log(activeCard)
  };
  const locationOptions = [
    { label: "All", value: "all" },
    { label: "Indoor", value: "indoor" },
    { label: "Outdoor", value: "outdoor" },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch("/personal-plant/all"); // Assuming this endpoint returns all map data
        const data = await response.json();
        console.log("Personal plant data:", data);
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="personal" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="personal" name="Personal" />
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
            <div className="flex justify-between items-center">
              <div className="w-48">
                <Select
                  label="Select Location"
                  value={value}
                  onChange={handleValueChange}
                >
                  {locationOptions.map(({ label, value }) => (
                    <Option key={value} value={value}>
                      <span className="font-bold">{label}</span>
                    </Option>
                  ))}
                </Select>
              </div>
              <Button
                onClick={handleOpen}
                className="flex items-center gap-3 bg-mediumGreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Add New Plant
              </Button>
              <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
              >
                <Card className="mx-auto w-full max-w-[24rem]">
                  <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                      New Plant
                    </Typography>
                    <Input label="Plant Name" size="lg" />
                    <Select label="Plant Variety">
                      <Option>Loreum Poseum</Option>
                      <Option>Loreum Poseum</Option>
                    </Select>
                    <Select label="Location">
                      <Option>Loreum Poseum</Option>
                      <Option>Loreum Poseum</Option>
                      <Option>Loreum Poseum</Option>
                      <Option>Loreum Poseum</Option>
                    </Select>
                    <Input label="Planting Date" size="lg" />
                    <Input label="Notes" size="lg" />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleOpen} fullWidth>
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Dialog>
            </div>
            <div className="flex items-center justify-center mt-5">
              <PersonalCarousel
                items={jsonData}
                setActiveCard={handleActiveCardChange}
              />
            </div>
            {activeCard && <ActivePlant activeCard={activeCard} />}
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

export default PersonalDashboard;
