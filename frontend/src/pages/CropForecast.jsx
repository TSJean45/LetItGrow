import React, { useState } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
} from "../components";
import img from "../assets/cropYield-1.png";
import {
  Option,
  Select,
  Typography,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

const CropForecast = () => {
  const [pred, setPred] = useState("");
  const units = ["acre", "in", "cm"];
  const [selectedUnit, setSelectedUnit] = useState(units[0]);

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const handleValueChange = (val) => {
    setPred(val);
    console.log(val);
  };

  const cropOptions = [
    { label: "Banana", value: "banana", pred: "first" },
    { label: "Chilli", value: "chilli", pred: "first" },
    { label: "Corn", value: "corn", pred: "first" },
    { label: "Peanut", value: "peanut", pred: "first" },
    { label: "Potato", value: "potato", pred: "first" },
    { label: "Rice", value: "rice", pred: "first" },
    { label: "Sugarcane", value: "sugarcane", pred: "first" },
    { label: "Sweet Potato", value: "sweetpotato", pred: "first" },
    { label: "Tapioca", value: "tapioca", pred: "first" },
    { label: "Wheat", value: "wheat", pred: "first" },
    { label: "Rubber", value: "rubber", pred: "second" },
  ];

  const handlePrediction = async () => {
    // Get the values directly from the input elements
    const areaValue = document.getElementById("areaInput").value;
    const fertilizerValue = document.getElementById("fertilizerInput").value;
    const rainfallValue = document.getElementById("rainfallInput").value;
    const pesticideValue = document.getElementById("pesticideInput").value;

    try {
      const response = await axios.post(
        "http://localhost:5000/yield_prediction",
        {
          areaValue,
          fertilizerValue,
          rainfallValue,
          pesticideValue,
        }
      );
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error("Error sending prediction data:", error);
    }
  };

  const getContent = () => {
    if (!pred) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="h-96 object-cover object-center"
            src={img}
            alt="loading img"
          />
          <Typography className="font-bold text-2xl">
            Choose a Crop To Estimate Its Potential Yield
          </Typography>
        </div>
      );
    } else if (pred === "first") {
      return (
        <>
          <div className="relative flex w-full max-w-[24rem]">
            <Input label="Growing Area" id="areaInput" name="area" />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
                  >
                    {selectedUnit}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {units.map((unit) => (
                    <MenuItem key={unit} onClick={() => handleUnitChange(unit)}>
                      {unit}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              label="Fertilizer Used Amount"
              id="fertilizerInput"
              name="fertilizer"
            />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
                  >
                    {selectedUnit}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {units.map((unit) => (
                    <MenuItem key={unit} onClick={() => handleUnitChange(unit)}>
                      {unit}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="relative flex w-full max-w-[24rem]">
            <Input label="Annual Rainfall" id="rainfallInput" name="rainfall" />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
                  >
                    {selectedUnit}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {units.map((unit) => (
                    <MenuItem key={unit} onClick={() => handleUnitChange(unit)}>
                      {unit}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              label="Pesticide Used Amount"
              id="pesticideInput"
              name="pesticide"
            />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
                  >
                    {selectedUnit}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {units.map((unit) => (
                    <MenuItem key={unit} onClick={() => handleUnitChange(unit)}>
                      {unit}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>
          <Button onClick={handlePrediction}>Predict Yield</Button>
        </>
      );
    } else if (pred === "second") {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Typography className="font-bold text-2xl">
            Content for Second Option
          </Typography>
        </div>
      );
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Crop Yield Prediction</DashboardTitle>
        </div>
        <div className="mt-10">
          <Select label="Select Crop" value={pred} onChange={handleValueChange}>
            {cropOptions.map(({ label, value, pred }) => (
              <Option key={value} value={pred}>
                <div className="flex items-center">
                  <span>{label}</span>
                </div>
              </Option>
            ))}
          </Select>
          <div>{getContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default CropForecast;
