import React, { useState, useEffect } from "react";
import {
  Typography,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Alert,
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { WeatherCard } from "../components";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
    exclamation: (
      <>
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

const ActivePlant = ({ activeCard }) => {
  console.log("in active plant: ", activeCard);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [isIOTConnected, setIsIOTConnected] = useState(false);

  useEffect(() => {
    const iotConnected = activeCard && activeCard.temperature !== null;
    setIsIOTConnected(iotConnected);
  }, [activeCard]);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 flex justify-center">
          <div className="w-3/4 space-y-2 h-96">
            {isIOTConnected ? (
              <WeatherCard
                icon="weatherIcon-10.svg"
                title="Room Temperature"
                value={activeCard.temperature}
                constant="°C"
              />
            ) : (
              <div className="overflow-hidden flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-ful">
                  <Alert
                    variant="outlined"
                    style={{ marginRight: 0 }}
                    className="text-left font-bold"
                  >
                    No paired thermometer.{" "}
                    <Link
                      to={`/RoomTemperature/${activeCard.id}`}
                      className="underline"
                    >
                      Click Here{" "}
                    </Link>
                    to start pairing.
                  </Alert>
                </div>
              </div>
            )}
            <Card className="w-full">
              <CardBody className="p-3 flex items-center">
                <CircularProgressbarWithChildren
                  value={16.67}
                  styles={buildStyles({
                    backgroundColor: "#7F9F80",
                    pathColor: `rgba(127, 159, 128, 1), ${16.67 / 100})`,
                  })}
                  strokeWidth={12}
                >
                  <div style={{ fontSize: 40, color: "black", marginTop: -5 }}>
                    <strong>1 / 6 </strong>
                  </div>
                  <div style={{ fontSize: 15, color: "black", marginTop: -5 }}>
                    have been watered
                  </div>
                </CircularProgressbarWithChildren>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="col-span-2 flex items-start flex-col">
          <div className="border w-full border-gray-300 h-96 overflow-y-auto p-5">
            <Alert variant="outlined" icon={<Icon type={activeCard.icon} />}>
              <div className="flex items-center justify-between">
                <div>{activeCard.alert}</div>
                {activeCard.button && (
                  <Button
                    size="md"
                    color="green"
                    className="ml-40 py-0 text-sm"
                    onClick={handleOpen}
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

export default ActivePlant;
