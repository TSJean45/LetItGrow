import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  WeatherCard,
  WeatherList,
  DashboardMap,
} from "../components";
import { Typography } from "@material-tailwind/react";


const SpaceMapping = () => {
  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A"/>
        <div className="flex justify-between items-center">
          <DashboardTitle>Dashboard</DashboardTitle>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 rounded border p-5 border-grayBorder">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Geofenced Area
            </Typography>
            <DashboardMap className="z-0"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceMapping;
