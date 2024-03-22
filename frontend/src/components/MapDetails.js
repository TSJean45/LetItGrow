import React from "react";
import { mapContents } from "../constants";
import { Alert } from "@material-tailwind/react";
import { WeatherCard } from "../components";

const MapDetails = ({ sectionId }) => {
  // Find the section with the matching ID
  const section = mapContents.find((s) => s.id === sectionId);

  if (!section) {
    return <div>No section found with ID: {sectionId}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 ">
          <Alert className="text-3xl flex items-center justify-center bg-ultLightGreen text-black font-bold">
            {section.name}
          </Alert>
          <hr className="border-t-4 border-dullGreen mt-2"></hr>
        </div>
        <div className="col-span-1 flex justify-end">
          <img src={require(`../assets/${section.image}`)} alt="map" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 flex justify-center">
          <div className="w-3/4 space-y-2">
            <WeatherCard
              icon="weatherIcon-5.svg"
              title="Soil Temperature"
              value={section.temp}
              constant="°C"
            />
            <WeatherCard
              icon="weatherIcon-6.svg"
              title="Soil Moisture"
              value={section.moisture}
              constant="%"
            />
            <WeatherCard
              icon="weatherIcon-7.svg"
              title="PH Value"
              value={section.ph}
              constant="pH"
            />
            <WeatherCard
              icon="weatherIcon-8.svg"
              title="Land Fertility"
              value={section.fertility}
            />
            <WeatherCard
              icon="weatherIcon-9.svg"
              title="Light Intensity"
              value={section.light}
            />
          </div>
        </div>
        <div className="col-span-2 flex items-start">
          <Alert className="text-2xl mt-2 flex items-center justify-between bg-lightGreen text-black font-bold relative">
            <div className="flex items-center">
              <div className="w-12 h-12 relative mr-4">
                <div className="absolute w-full h-full bg-gray-200 rounded-full"></div>
                <div
                  className="absolute w-full h-full bg-green-500 rounded-full clip-progress"
                  style={{
                    clipPath: `circle(${section.percentage}% at center)`,
                  }}
                ></div>
                <div className="absolute w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {section.percentage}%
                  </span>
                </div>
              </div>
              <div>{section.pMessage}</div>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default MapDetails;
