import React, { useEffect, useRef } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
} from "../components";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Alert,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import cucumberVideo from "../assets/cucumber.mp4";
import tomatoVideo from "../assets/tomato.mp4";
import ReactPlayer from "react-player";

function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    );
  }

const AutomatedDisease = () => {

  const data = [
    {
      label: "Drone A",
      value: "dronea",
      field: "Cucumber Farm",
      icon: Square3Stack3DIcon,
      videoUrl: cucumberVideo,
      disease: "Disease detected in the video is yellow vein mosaic virus."
    },
    {
      label: "Drone B",
      value: "droneb",
      field: "Tomato Farm",
      icon: UserCircleIcon,
      videoUrl: tomatoVideo,
      disease: "Disease detected in the video is yellow vein mosaic virus."
    },
    {
      label: "Drone C",
      value: "dronec",
      field: "Tomato Farm",
      icon: Cog6ToothIcon,
      videoUrl: tomatoVideo,
      disease: "Disease detected in the video is yellow vein mosaic virus."
    },
  ];

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center"></div>
        <DashboardTitle>Automated Disease Detection</DashboardTitle>
      </div>
      <div className="w-full px-24 py-4">
        <Tabs value="dashboard">
          <TabsHeader>
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, videoUrl, field, disease }) => (
              <TabPanel key={value} value={value}>
                <Alert className="font-bold mt-5 rounded-none" color="green">{field}</Alert>
                <ReactPlayer url={videoUrl} width="640" height="100" controls />
                <Alert className="mt-5" icon={<Icon />}>{disease}</Alert>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default AutomatedDisease;
