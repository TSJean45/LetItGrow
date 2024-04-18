import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
} from "../components";
import { RoughNotation } from "react-rough-notation";
import plantsimulation1 from "../assets/plant-simulation1.png";
import "./PlantSimulation.scss";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const PlantSimulation = () => {
  return (
    <div className="overflow-hidden plant-simulation">
      <DashboardSidebar type="personal" />
      <div className="ml-20 w-full px-2 py-2 sm:px-4 max-h-full">
        <DashboardNavbar identity="personal" name="Personal" />
        <div className="flex items-center justify-center">
          <DashboardTitle>Plant Condition Simulation</DashboardTitle>
        </div>
        <h4 className="flex justify-center">
          Ever found yourself frustrated by wilting plants or uncertain about
          the best care regimen?
        </h4>

        <div className="mt-10 flex justify-center">
          <Card className="w-full max-w-[60rem] flex-row shadow-none">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-3/5 shrink-0 rounded-r-none"
            >
              <img
                src={plantsimulation1}
                alt="card"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                It's not just about gardening—
              </Typography>
              <Typography color="gray" className="mb-8 text-center font-normal">
                It's a journey of discovery, where you uncover the secrets of
                cultivation and safeguard against real-world horticultural
                mishaps. Say goodbye to green woes and hello to a flourishing,
                foolproof garden adventure!
              </Typography>
              <a href="/MyGarden" className="inline-block">
                <Button className="mt-4 bg-mediumGreen">Start Now</Button>
              </a>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlantSimulation;
