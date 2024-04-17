import React, { useState, useEffect } from 'react'
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
} from "../components";
import img from "../assets/cropYield-1.png";
import img2 from "../assets/cropYield-2.png";
import {
  Option,
  Select,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

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

  const [selectedCrop, setSelectedCrop] = useState("");
  const [growingArea, setGrowingArea] = useState();
  const [fertilizerAmount, setFertilizerAmount] = useState();
  const [annualRainfall, setAnnualRainfall] = useState();
  const [pesticideAmount, setPesticideAmount] = useState();
  const [resultData, setResultData] = useState(null);

  const handleCrop = (selectedOption) => {
    setGrowingArea(selectedOption);
    console.log(selectedOption)
  };

  const handleArea = (selectedOption) => {
    setGrowingArea(selectedOption);
    console.log(selectedOption)
  };

  const handleFertilizer = (selectedOption) => {
    setFertilizerAmount(selectedOption);
  };

  const handleRain = (selectedOption) => {
    setAnnualRainfall(selectedOption);
  };

  const handlePesticide = (selectedOption) => {
    setPesticideAmount(selectedOption);
  };

  useEffect(() => {
    console.log(resultData);
  }, [resultData]);

  const handlePrediction = () => {
    try {
      const data = {
        area: parseFloat(growingArea),
        rain: parseFloat(annualRainfall),
        fertilizer: parseFloat(fertilizerAmount),
        pesticide: parseFloat(pesticideAmount),
      };

      console.log(data);

      fetch('http://localhost:5000/yield_prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from backend:', data)
          if (data.prediction) {
            setResultData(data.prediction)
          } else {
            console.error('No prediction data received')
          }
        })
        .catch((error) => {
          console.error('Error sending data to backend:', error)
        })
    } catch (error) {
      console.error('Error in handlePrediction:', error)
    }
  }

  const getContent = () => {
    if (!pred) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="h-80 object-cover object-center"
            src={img}
            alt="loading img"
          />
          <Typography className="font-bold text-2xl">
            Choose a Crop To Estimate Its Potential Yield
          </Typography>
        </div>
      )
    } else if (pred === 'first') {
      return (
        <>
          <div className="relative flex w-full my-5">
            <Input
              label="Growing Area"
              onChange={e => handleArea(e.target.value)}
            />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Button
                ripple={false}
                variant="text"
                className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
              >
                Hectare
              </Button>
            </div>
          </div>
          <div className="relative flex w-full my-5">
            <Input
              label="Fertilizer Used Amount"
              onChange={e =>  handleFertilizer(e.target.value)}
            />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Button
                ripple={false}
                variant="text"
                className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
              >
                KG
              </Button>
            </div>
          </div>
          <div className="relative flex w-full my-5">
            <Input
              label="Annual Rainfall"
              onChange={e =>  handleRain(e.target.value)}
            />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Button
                ripple={false}
                variant="text"
                className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
              >
                MM
              </Button>
            </div>
          </div>
          <div className="relative flex w-full my-5">
            <Input
              label="Pesticide Used Amount"
              onChange={e =>  handlePesticide(e.target.value)}
            />
            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
              <Button
                ripple={false}
                variant="text"
                className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
              >
                KG
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handlePrediction}
              className="bg-mediumGreen"
              disabled={disableButton}
            >
              Predict Yield
            </Button>
          </div>
        </>
      );
    } else if (pred === "second") {
      return (
        <>
        <Typography className="font-bold text-2xl">Waiting For Input</Typography>
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="h-80 object-cover object-center"
            src={img2}
            alt="loading img"
          />
        </div>
      );
    }
  }

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Crop Yield Prediction</DashboardTitle>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="col-span-1 border-solid border-2 rounded p-5 h-100">
            <Typography className="font-bold text-2xl mb-5">
              Input Predicton Details
            </Typography>
            <Select label="Select Crop" onChange={handleValueChange}>
              {cropOptions.map(({ label, value, pred }) => (
                <Option key={value} value={value}>
                  <div className="flex items-center">
                    <span>{label}</span>
                  </div>
                </Option>
              ))}
            </Select>
            <div>{getContent()}</div>
          </div>
          <div className="col-span-1 border-solid border-2 rounded p-5">
            {getRightContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropForecast
