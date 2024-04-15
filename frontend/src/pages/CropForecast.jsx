import React, { useState, useEffect } from "react";
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
import GaugeComponent from "react-gauge-component";
import { cropConstants } from "../constants";

const CropForecast = () => {
  const [pred, setPred] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [growingArea, setGrowingArea] = useState();
  const [fertilizerAmount, setFertilizerAmount] = useState();
  const [annualRainfall, setAnnualRainfall] = useState();
  const [pesticideAmount, setPesticideAmount] = useState();
  const [resultData, setResultData] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

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
  ];

  const handleValueChange = (val) => {
    setSelectedCrop(val);
    const type = cropOptions.find((option) => option.value === val);
    if (type) {
      setPred(type.pred);
    }
    console.log(selectedCrop);
  };

  const handleArea = (selectedOption) => {
    setGrowingArea(selectedOption);
    validateInputs(
      selectedOption,
      fertilizerAmount,
      annualRainfall,
      pesticideAmount
    );
  };

  const handleFertilizer = (selectedOption) => {
    setFertilizerAmount(selectedOption);
    validateInputs(
      growingArea,
      selectedOption,
      annualRainfall,
      pesticideAmount
    );
  };

  const handleRain = (selectedOption) => {
    setAnnualRainfall(selectedOption);
    validateInputs(
      growingArea,
      fertilizerAmount,
      selectedOption,
      pesticideAmount
    );
  };

  const handlePesticide = (selectedOption) => {
    setPesticideAmount(selectedOption);
    validateInputs(
      growingArea,
      fertilizerAmount,
      annualRainfall,
      selectedOption
    );
  };

  useEffect(() => {
    console.log(resultData);
  }, [resultData]);

  const validateInputs = (area, fertilizer, rainfall, pesticide) => {
    if (
      area === undefined ||
      fertilizer === undefined ||
      rainfall === undefined ||
      pesticide === undefined ||
      area.trim() === "" ||
      fertilizer.trim() === "" ||
      rainfall.trim() === "" ||
      pesticide.trim() === ""
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const handlePrediction = () => {
    try {
      const data = {
        area: parseFloat(growingArea),
        rain: parseFloat(annualRainfall),
        fertilizer: parseFloat(fertilizerAmount),
        pesticide: parseFloat(pesticideAmount),
        cropLabel: selectedCrop,
      };

      console.log(data);

      fetch("http://localhost:5000/yield_prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from backend:", data);
          if (data.prediction) {
            setResultData(data.prediction);
          } else {
            console.error("No prediction data received");
          }
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } catch (error) {
      console.error("Error in handlePrediction:", error);
    }
  };

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
      );
    } else if (pred === "first") {
      return (
        <>
          <div className="relative flex w-full my-5">
            <Input
              label="Total Land Area"
              onChange={(e) => handleArea(e.target.value)}
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
              label="Total Amount of Fertilizer Used"
              onChange={(e) => handleFertilizer(e.target.value)}
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
              label="Annual Rainfall Received in The Region"
              onChange={(e) => handleRain(e.target.value)}
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
              label="Total Amount of Pesticide Used"
              onChange={(e) => handlePesticide(e.target.value)}
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
    }
  };

  const getRightContent = () => {
    if (!pred) {
      return null; // Hide the right container when !pred
    } else if (!resultData) {
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
        </>
      );
    } else {
      return (
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            subArcs: cropConstants[selectedCrop]?.subArcLimits.map((limit, index) => ({
              limit,
              color: index === 0 ? "#EA4228" : index === 1 ? "#F5CD19" : "#5BE12C",
              tooltip: { text: index === 0 ? "Below Average" : index === 1 ? "Average" : "Above Average" },
            })) || [],
          }}
          pointer={{
            color: "#345243",
            type: "arrow",
            length: 0.2,
            width: 5,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) =>
                value.toFixed(0) + " Production/Unit Area",
              style: {
                fontSize: "50px",
                fontWeight: "bold",
                fill: "#000000",
                textShadow: "none",
              },
            },
            tickLabels: {
              hideMinMax: true, // Hide min and max labels
            },
          }}
          value={resultData}
          minValue={cropConstants[selectedCrop]?.min || 0} 
          maxValue={cropConstants[selectedCrop]?.max || 0} 
        />
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
  );
};

export default CropForecast;
