import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  WeatherComponent,
} from "../components";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import weather_logo from "../assets/weather-sun.png";
import { ReactComponent as WeatherRect } from "../assets/weather_rectangle.svg";

const currentDate = new Date();

const PersonalDashboard = () => {
  return (
    <div>
      <DashboardSidebar />
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <DashboardNavbar />
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
        <div className="grid grid-cols-6 gap-4 mt-4 sm:mt-6">
          {" "}
          {/* Adjusted margin */}
          <div className="col-span-4">
            <WeatherComponent />
          </div>
          <Card className="col-span-2 bg-skyBlue max-h-screen rounded p-5">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Weather
            </Typography>
            <CardBody>
              <div className="relative py-10">
                <WeatherRect className="absolute top-0 right-0" />
                <div className="grid grid-cols-2">
                  <div className="z-10">
                    <h1 className="text-6xl font-bold p-2 z-10 text-white">
                      30°C
                    </h1>
                    <p className="text-sm px-2 text-white">H: 31°C L: 28°C</p>
                  </div>
                  <img
                    className="object-cover object-top z-10 mt-[-50px]"
                    width={400}
                    src={weather_logo}
                    alt="weather"
                  />
                </div>
                <div className="grid grid-cols-3">
                  <p className="text-lg px-2 col-span-2 text-white z-20">
                    Ayer Keroh, Melaka
                  </p>
                  <p className="text-lg text-right col-span-1 px-2 text-white z-20">
                    Summer
                  </p>
                </div>
              </div>
              
            </CardBody>

            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
