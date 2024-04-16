import React, { useState, useEffect } from "react";
import { mapContents } from "../constants";
import {
  Alert,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { WeatherCard } from "../components";
import CircularProgress from "@mui/joy/CircularProgress";
import { Link } from "react-router-dom";

function Icon({ type }) {
  const iconPaths = {
    bell: (
      <>
        <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
        <path
          fill-rule="evenodd"
          d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
          clip-rule="evenodd"
        />
      </>
    ),
    tick: (
      <>
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"
        />
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      {iconPaths[type]}
    </svg>
  );
}

const MapDetails = ({ sectionId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [mapData, setMapData] = useState(null);
  const [isIOTConnected, setIsIOTConnected] = useState(false);
  const section = mapContents.find((s) => s.id === sectionId);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(`/soil-monitoring/${section.id}`);
        const data = await response.json();
        console.log("Map data:", data);

        const iotConnected = data.moisture && data.ph;

        console.log(iotConnected);

        setIsIOTConnected(iotConnected);

        if (!iotConnected) {
          console.log("IOT is not connected");
          return;
        }

        setMapData(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, [sectionId, section.id]);

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
            {isIOTConnected ? (
              <>
                <WeatherCard
                  icon="weatherIcon-5.svg"
                  title="Soil Temperature"
                  value={(mapData && mapData.temp) ?? "N/A"}
                  constant="°C"
                />
                <WeatherCard
                  icon="weatherIcon-6.svg"
                  title="Soil Moisture"
                  value={(mapData && mapData.moisture) ?? "N/A"}
                  constant="%"
                />
                <WeatherCard
                  icon="weatherIcon-7.svg"
                  title="PH Value"
                  value={(mapData && mapData.ph) ?? "N/A"}
                  constant="pH"
                />
                <WeatherCard
                  icon="weatherIcon-8.svg"
                  title="Land Fertility"
                  value={(mapData && mapData.fertility) ?? "N/A"}
                />
                <WeatherCard
                  icon="weatherIcon-9.svg"
                  title="Light Intensity"
                  value={(mapData && mapData.light) ?? "N/A"}
                />
              </>
            ) : (
              <div className="h-full overflow-hidden flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-ful">
                  {/* ! icon */}
                  <div className="flex items-center justify-center h-20 w-20 bg-white rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-20 w-20 text-gray-500"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4v.01"
                      />
                    </svg>
                  </div>
                  <Typography className="text-lg text-center text-gray-500 font-bold mt-2">
                    Haven’t paired with the soil monitoring device.{" "}
                    <Link
                      to={`/SoilMonitoring/${section.id}`}
                      className="underline"
                    >
                      Click Here{" "}
                    </Link>
                    to start pairing.
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 flex items-start flex-col mt-5">
          <Alert className="text-xl h-12 flex items-center justify-between bg-lightGreen text-black font-bold relative">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-lightGreen rounded-full flex items-center justify-center mr-2">
                {/* Circular progress bar */}
                <CircularProgress
                  size="lg"
                  color="success"
                  determinate
                  value={section.percentage}
                >
                  {section.percentage}%
                </CircularProgress>
              </div>
              <div className="ml-2">{section.pMessage}</div>
            </div>
          </Alert>
          <div className="mt-6 border w-full border-gray-300 h-96 overflow-y-auto p-5">
            <Alert variant="outlined" icon={<Icon type={section.icon} />}>
              <div className="flex items-center justify-between">
                <div>{section.status}</div>
                {section.button && (
                  <Button
                    onClick={handleOpen}
                    size="md"
                    color="green"
                    className="ml-40 py-0 text-sm"
                  >
                    Done
                  </Button>
                )}
              </div>
            </Alert>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Are you done watering this area?</DialogHeader>
              <DialogBody>
                Update your water tracking activity to done.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleOpen}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>

            <Timeline className="mt-5">
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader className="h-3">
                  <TimelineIcon />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none"
                  >
                    Sunday, 30 December, 2024
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 03:00 PM
                  </Typography>
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 10:00 AM
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader className="h-3">
                  <TimelineIcon />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none"
                  >
                    Saturday, 29 December, 2024
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 10:00 AM
                  </Typography>
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 6:00 PM
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader className="h-3">
                  <TimelineIcon />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none"
                  >
                    Saturday, 29 December, 2024
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 10:00 AM
                  </Typography>
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 6:00 PM
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader className="h-3">
                  <TimelineIcon />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none"
                  >
                    Saturday, 29 December, 2024
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 10:00 AM
                  </Typography>
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 6:00 PM
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader className="h-3">
                  <TimelineIcon />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none"
                  >
                    Friday, 28 December, 2024
                  </Typography>
                </TimelineHeader>
                <TimelineBody>
                  <Typography
                    variant="small"
                    color="gary"
                    className="font-normal text-gray-600"
                  >
                    Finished watering at 10:00 AM
                  </Typography>
                </TimelineBody>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDetails;
