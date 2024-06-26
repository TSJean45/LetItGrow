import React, { useState, useEffect } from "react";
import { DashboardSidebar, DashboardNavbar } from "../components";
import { RoughNotation } from "react-rough-notation";
import "./MyGarden.scss";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { plants } from "../constants/plants";
import Select from "react-select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Bars } from "react-loading-icons";
import { Button } from "@material-tailwind/react";
import germination from "../assets/germination.png";
import seedling from "../assets/seedling.png";
import vegetative from "../assets/vegetative-growth.png";
import buddev from "../assets/bud-development.png";
import flowering from "../assets/flowering.png";
import fruit from "../assets/fruit-formation.png";
import ripening from "../assets/ripening.png";
import tomato from "../assets/tomato.png";
import { Alert } from "@material-tailwind/react";
import * as Tabs from "@radix-ui/react-tabs";

const Groq = require("groq-sdk");
const groq = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: "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",
});

const PlantButton = ({ label, imageSrc, onClick, selected }) => {
  return (
    <Button className={`${selected ? "clicked" : ""} mb-10`} onClick={onClick}>
      <div className="font-bold text-black text-lg mb-5">{label}</div>
      <div className="object-fit flex justify-center">
        <img src={imageSrc} alt="" />
      </div>
    </Button>
  );
};

const tabItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
    name: "Temperature",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
    name: "Soil",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
    name: "Watering",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
    name: "Fertilizer",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
    name: "Lighting",
  },
];

const soil = [
  { label: "Loamy Soil", value: "Loamy Soil" },
  { label: "Sandy Soil", value: "Sandy Soil" },
  { label: "Clay Soil", value: "Clay Soil" },
  { label: "Silt Soil", value: "Silt Soil" },
  { label: "Peat Soil", value: "Peat Soil" },
  { label: "Chalky Soil", value: "Chalky Soil" },
  { label: "Rocky Soil", value: "Rocky Soil" },
  { label: "Acidic Soil", value: "Acidic Soil" },
  { label: "Saline Soil", value: "Saline Soil" },
  { label: "Alkaline Soil", value: "Alkaline Soil" },
];

const fertilizer = [
  { label: "All-purpose fertilizer", value: "All-purpose fertilizer" },
  { label: "Nitrogen-based fertilizer", value: "Nitrogen-based fertilizer" },
  {
    label: "Phosphorus-based fertilizer",
    value: "Phosphorus-based fertilizer",
  },
  { label: "Potassium-based fertilizer", value: "Potassium-based fertilizer" },
  { label: "Organic compost", value: "Organic compost" },
  { label: "Fish emulsion fertilizer", value: "Fish emulsion fertilizer" },
  { label: "Bone meal fertilizer", value: "Bone meal fertilizer" },
  { label: "Seaweed fertilizer", value: "Seaweed fertilizer" },
  { label: "Manure-based fertilizer", value: "Manure-based fertilizer" },
  { label: "Liquid kelp fertilizer", value: "Liquid kelp fertilizer" },
];

const light = [
  { label: "Sunlight", value: "Sunlight" },
  { label: "LED grow lights", value: "LED grow lights" },
  { label: "Fluorescent grow lights", value: "Fluorescent grow lights" },
  {
    label: "High-pressure sodium (HPS) grow lights",
    value: "High-pressure sodium (HPS) grow lights",
  },
  {
    label: "Metal halide (MH) grow lights",
    value: "Metal halide (MH) grow lights",
  },
  {
    label: "Compact fluorescent lamps (CFL)",
    value: "Compact fluorescent lamps (CFL)",
  },
  { label: "Incandescent grow lights", value: "Incandescent grow lights" },
  { label: "Halogen lamps", value: "Halogen lamps" },
  {
    label: "Ceramic metal halide (CMH) grow lights",
    value: "Ceramic metal halide (CMH) grow lights",
  },
  { label: "Induction grow lights", value: "Induction grow lights" },
];

const MyGarden = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selection, setSelection] = useState("");
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultButton, setResultButton] = useState("Temperature");

  // get the selected value/adjustments of the plants
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [current, setCurrent] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [temperature, setTemperature] = useState(50);
  const [watering, setWatering] = useState(50);
  const [selectedSoil, setSelectedSoil] = useState(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [selectedLight, setSelectedLight] = useState(null);
  const [page1Complete, setPage1Complete] = useState(false);
  const [page2Complete, setPage2Complete] = useState(false);

  const handleResultClick = (button) => {
    setResultButton(button);
  };

  // species of plant
  const handlePlantChange = (selected) => {
    console.log("Selected Plant:", selected);

    setSelectedPlant(selected);
    setCurrent(selected);
    setPage1Complete(true);
  };

  // growing stage
  const handleStageChange = (selectedStage) => {
    setSelectedStage(selectedStage);
    console.log(selectedStage);
    setPage1Complete(true);
  };

  // temperature
  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
    setPage2Complete(true);
  };

  // watering
  const handleWateringChange = (event, newValue) => {
    setWatering(newValue);
    setPage2Complete(true);
  };

  // soil
  const handleSoilChange = (selectedOption) => {
    console.log("Selected Soil:", selectedOption.value);
    setSelectedSoil(selectedOption.value);
    setPage2Complete(true);
  };

  // fertilizer
  const handleFertilizerChange = (selectedOption) => {
    console.log("Selected Fertilizer:", selectedOption.value);
    setSelectedFertilizer(selectedOption.value);
    setPage2Complete(true);
  };

  // light
  const handleLightChange = (selectedOption) => {
    console.log("Selected Light:", selectedOption.value);
    setSelectedLight(selectedOption.value);
    setPage2Complete(true);
  };

  const handleNext = (selected) => {
    if (selected === "plus") {
      setSelection(selected);
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
    } else {
      setSelectedPlant(selected);
      setSelection(""); // Reset the selection state after setting the plant
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
    }
  };

  const passPlant = (selected) => {
    setSelectedPlant(selected);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
  };

  const handleCancel = () => {
    navigate("/");
  };

  const result = async () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
    const data = {
      plant: selectedPlant,
      stage: selectedStage,
      temperature: temperature,
      watering: watering,
      soil: selectedSoil,
      fertilizer: selectedFertilizer,
      light: selectedLight,
    };

    console.log("Data received: ", data);

    setLoading(true);
    try {
      // Call Groq function to get plant simulation results for each message content
      const [
        survivalResult,
        tempSummaryResult,
        soilSummaryResult,
        wateringSummaryResult,
        fertilizerSummaryResult,
        lightSummaryResult,
      ] = await Promise.all([
        getGroqPlantSimulation(createSurvivalMessageContent(data), data),
        getGroqPlantSimulation(createTempSummaryMessageContent(data), data),
        getGroqPlantSimulation(createSoilSummaryMessageContent(data), data),
        getGroqPlantSimulation(createWateringSummaryMessageContent(data), data),
        getGroqPlantSimulation(
          createFertilizerSummaryMessageContent(data),
          data
        ),
        getGroqPlantSimulation(createLightSummaryMessageContent(data), data),
      ]);

      // Check if simulation results are not undefined or null
      if (
        survivalResult &&
        tempSummaryResult &&
        soilSummaryResult &&
        wateringSummaryResult &&
        fertilizerSummaryResult &&
        lightSummaryResult
      ) {
        setResultData({
          survival: survivalResult,
          tempSummary: tempSummaryResult,
          soilSummary: soilSummaryResult,
          wateringSummary: wateringSummaryResult,
          fertilizerSummary: fertilizerSummaryResult,
          lightSummary: lightSummaryResult,
        });
      } else {
        console.error("Invalid data received from Groq.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving data from Groq:", error);
      setLoading(false);
    }
  };

  // Helper functions to create different message contents
  const createSurvivalMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. 
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Based on these conditions, reply only one sentence using this template, "Unfortunately, your plant did not survive!" or "Congratulations your plant survives!" Remove sentences after the first sentence.`;
  };

  const createTempSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about temperature, temperature and only only temperature.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the temperature conditions and any suggestions for improvement only for temperature. 
    For suggestions, keep it within 3 most important suggestions.
    For suggestions,  make sure you use * at the start of each of the sentences. At the end of each suggestions sentences add <br/> and at the beginning of the first suggestions add <br/>. At the end of the whole paragraph do not add <br/>. Within a same suggestion do not use point form. 
    
    Ignore other conditions and suggestions that are not related to temperature.
    Remove any words that are not temperature.
    Take note, at the end of each suggestions sentences add <br/>, add <br/> add <br/> and at the beginning of the first suggestions add <br/>. `;
  };

  const createSoilSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about soil, soil and only only soil.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the soil conditions and any suggestions for improvement only for soil. 
    For suggestions, keep it within 3 most important suggestions.
    For suggestions, make sure you use * at the start of each of the sentences. At the end of each suggestions sentences add <br/> and at the beginning of the first suggestions add <br/>. At the end of the whole paragraph do not add <br/>. Within a same suggestion do not use point form. 
    Ignore other conditions and suggestions that are not related to soil.
    Remove any words that are not soil.
    Take note, at the end of each suggestions sentences add <br/>, add <br/> add <br/> and at the beginning of the first suggestions add <br/>. `;
  };

  const createWateringSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about watering, watering and only only watering.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the watering choice and any suggestions for improvement only for watering. 
    For suggestions, keep it within 3 most important suggestions.
    For suggestions,  make sure you use * at the start of each of the sentences. At the end of each suggestions sentences add <br/> and at the beginning of the first suggestions add <br/>. At the end of the whole paragraph do not add <br/>. Within a same suggestion do not use point form. 
    Ignore other conditions and suggestions that are not related to watering.
    Remove any words that are not watering.
    Take note, at the end of each suggestions sentences add <br/>, add <br/> add <br/> and at the beginning of the first suggestions add <br/>. `;
  };

  const createFertilizerSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about fertilizer, fertilizer and only only fertilizer.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the fertilizer choice and any suggestions for improvement only for fertilizer. 
    For suggestions, keep it within 3 most important suggestions.
    For suggestions, make sure you use * at the start of each of the sentences. At the end of each suggestions sentences add <br/> and at the beginning of the first suggestions add <br/>. At the end of the whole paragraph do not add <br/>. Within a same suggestion do not use point form. 
    Ignore other conditions and suggestions that are not related to fertilizer.
    Remove any words that are not fertilizer.
    Take note, at the end of each suggestions sentences add <br/>, add <br/> add <br/> and at the beginning of the first suggestions add <br/>. `;
  };

  const createLightSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about lighting, lighting and only only lighting.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the lighting choice and any suggestions for improvement only for lighting. 
    For suggestions, keep it within 3 most important suggestions.
    For suggestions, make sure you use * at the start of each of the sentences. At the end of each suggestions sentences add <br/> and at the beginning of the first suggestions add <br/>. At the end of the whole paragraph do not add <br/>. Within a same suggestion do not use point form. 
    Ignore other conditions and suggestions that are not related to lighting.
    Remove any words that are not lighting.
    Take note, at the end of each suggestions sentences add <br/>, add <br/> add <br/> and at the beginning of the first suggestions add <br/>.
     `;
  };

  const getGroqPlantSimulation = async (messageContent, data) => {
    try {
      console.log("Received data:", data);
      // Replace the slots in messageContent with actual data values
      messageContent = messageContent.replace(
        /\${(.*?)}/g,
        (match, property) => {
          return data[property.trim()] || match;
        }
      );

      // Call Groq SDK to get plant simulation
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: messageContent, // Pass the modified messageContent
          },
        ],
        model: "mixtral-8x7b-32768",
      });

      // Extract the content of the message
      const simulationResult = response.choices[0]?.message?.content || "";

      return simulationResult;
    } catch (error) {
      console.error("Error retrieving data from Groq:", error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  return (
    <div className="MyGarden overflow-hidden">
      <DashboardSidebar type="personal" />
      <div className="ml-20 w-full px-2 py-5 sm:px-4 max-h-full mobile:ml-0 tablet:ml-0">
        <DashboardNavbar identity="personal" name="Personal" />
      </div>

      {/* select or add new plant in my garden */}
      {currentStep === 0 && (
        <div className="add-plant">
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <RoughNotation
              type="highlight"
              show={true}
              color="#DFEFCD"
              animationDelay="10"
              animationDuration="2000"
              padding="0"
              strokeWidth="0"
              style={{
                fontSize: "50px",
                fontFamily: "baloo",
              }}
            >
              My Garden
            </RoughNotation>
          </div>

          <plants>
            <button onClick={() => handleNext("plus")}>
              <FaPlus size={40} />
              <p>add new plant</p>
            </button>
          </plants>
        </div>
      )}

      {/* add new plant */}
      {currentStep === 1 && (
        <div className="plant-info">
          {selection === "plus" && (
            <searchbar>
              <Select
                options={plants}
                onChange={(selectedOption) =>
                  handlePlantChange(selectedOption.value)
                }
                required
                isSearchable={false}
                placeholder="Plant Species"
              />
            </searchbar>
          )}
          <div className="stages">
            <h4>Current Stages of Plants/Tree Growth</h4>

            <selection required>
              <PlantButton
                label="Germination"
                imageSrc={germination}
                onClick={() => handleStageChange("Germination")}
                selected={selectedStage === "Germination"}
              />
              <PlantButton
                label="Seedling"
                imageSrc={seedling}
                onClick={() => handleStageChange("Seedling")}
                selected={selectedStage === "Seedling"}
              />
              <PlantButton
                label="Vegetative Growth"
                imageSrc={vegetative}
                onClick={() => handleStageChange("Vegetative Growth")}
                selected={selectedStage === "Vegetative Growth"}
              />
              <PlantButton
                label="Bud Development"
                imageSrc={buddev}
                onClick={() => handleStageChange("Bud Development")}
                selected={selectedStage === "Bud Development"}
              />
              <PlantButton
                label="Flowering"
                imageSrc={flowering}
                onClick={() => handleStageChange("Flowering")}
                selected={selectedStage === "Flowering"}
              />
              <PlantButton
                label="Fruit Formation"
                imageSrc={fruit}
                onClick={() => handleStageChange("Fruit Formation")}
                selected={selectedStage === "Fruit Formation"}
              />
              <PlantButton
                label="Ripening"
                imageSrc={ripening}
                onClick={() => handleStageChange("Ripening")}
                selected={selectedStage === "Ripening"}
              />
            </selection>
          </div>

          <button
            className="proceed font-bold p-3"
            onClick={() => handleNext("plus")}
            disabled={!page1Complete}
          >
            Proceed to Simulation
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="simulation">
          <h4>Set Simulation Environment</h4>
          <adjustment>
            <temperature>
              <p>Temperature(°C)</p>
              <Box sx={{ width: 500 }}>
                <Slider
                  defaultValue={50}
                  min={-50}
                  max={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={handleTemperatureChange}
                />
              </Box>
            </temperature>
            <watering>
              <p>Watering (ml)</p>
              <Box sx={{ width: 500 }}>
                <Slider
                  defaultValue={50}
                  min={0}
                  max={600}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  color="secondary"
                  onChange={handleWateringChange}
                />
              </Box>
            </watering>

            <soil>
              <p>Soil Condition</p>

              <Select
                options={soil}
                onChange={handleSoilChange}
                isSearchable={false}
              />
            </soil>
            <fertilizer>
              <p>Fertilizer</p>

              <Select
                options={fertilizer}
                onChange={handleFertilizerChange}
                isSearchable={false}
              />
            </fertilizer>
            <light>
              <p>Light</p>

              <Select
                options={light}
                onChange={handleLightChange}
                isSearchable={false}
              />
            </light>

            <button
              className="confirm"
              onClick={result}
              disabled={!page2Complete}
            >
              Confirm
            </button>
          </adjustment>
        </div>
      )}

      {currentStep === 3 && (
        <div className="simulation">
          <results>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <RoughNotation
                type="highlight"
                show={true}
                color="#DFEFCD"
                animationDelay="10"
                animationDuration="2000"
                padding="0"
                strokeWidth="0"
                style={{
                  fontSize: "50px",
                  fontFamily: "open sans",
                  fontWeight: "700",
                }}
              >
                Results
              </RoughNotation>
            </div>
            {loading && <p>Loading...</p>}

            {resultData && (
              <div>
                <Alert>{resultData.survival}</Alert>
                <div className="detailed-result">
                  <RoughNotation
                    type="highlight"
                    show={true}
                    color="#DFEFCD"
                    animationDelay="10"
                    animationDuration="2000"
                    padding="0"
                    strokeWidth="0"
                    style={{
                      fontSize: "30px",
                      fontFamily: "baloo",
                      fontWeight: "500",
                      marginBottom: "2rem",
                      marginTop: "4rem",
                    }}
                  >
                    Detailed Analysis
                  </RoughNotation>
                  <div>
                    <Tabs.Root
                      className="max-w-screen-xl mx-auto px-4 md:px-8"
                      defaultValue="Temperature"
                      onValueChange={(value) => handleResultClick(value)}
                    >
                      <Tabs.List
                        className="w-full border-b flex items-left gap-x-3 overflow-x-auto text-sm"
                        aria-label="Manage your account"
                      >
                        {tabItems.map((item, idx) => (
                          <Tabs.Trigger
                            key={idx}
                            className="group outline-none py-1.5 border-b-2 border-white text-darkGreen data-[state=active]:border-darkGreen data-[state=active]:text-dullGreen"
                            value={item.name}
                          >
                            <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-dullGreen group-hover:bg-gray-50 group-active:bg-lightGreen font-medium">
                              {item.icon}
                              {item.name}
                            </div>
                          </Tabs.Trigger>
                        ))}
                      </Tabs.List>
                      {tabItems.map((item, idx) => (
                        <Tabs.Content
                          key={idx}
                          className="py-6"
                          value={item.name}
                        >
                          {resultButton === "Temperature" && (
                            <div className="temp-content">
                              <h3
                                className="py-2"
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "baloo",
                                  fontWeight: "500",
                                }}
                              >
                                Temperature Summary:
                              </h3>
                              <p>
                                {resultData.tempSummary
                                  .split("<br/>")
                                  .map((line, index) => (
                                    <React.Fragment key={index}>
                                      {line.includes("*")
                                        ? line.replace(/\*/g, "❄️")
                                        : line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            </div>
                          )}
                          {resultButton === "Soil" && (
                            <div className="soil-content">
                              <h3
                                className="py-2"
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "baloo",
                                  fontWeight: "500",
                                }}
                              >
                                Soil Summary:
                              </h3>
                              <p>
                                {resultData.soilSummary
                                  .split("<br/>")
                                  .map((line, index) => (
                                    <React.Fragment key={index}>
                                      {line.includes("*")
                                        ? line.replace(/\*/g, "🌱")
                                        : line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            </div>
                          )}
                          {resultButton === "Watering" && (
                            <div className="water-content">
                              <h3
                                className="py-2"
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "baloo",
                                  fontWeight: "500",
                                }}
                              >
                                Watering Summary:
                              </h3>
                              <p>
                                {resultData.wateringSummary
                                  .split("<br/>")
                                  .map((line, index) => (
                                    <React.Fragment key={index}>
                                      {line.includes("*")
                                        ? line.replace(/\*/g, "💧")
                                        : line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            </div>
                          )}
                          {resultButton === "Fertilizer" && (
                            <div className="fertilizer-content">
                              <h3
                                className="py-2"
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "baloo",
                                  fontWeight: "500",
                                }}
                              >
                                Fertilizer Summary:
                              </h3>
                              <p>
                                {resultData.fertilizerSummary
                                  .split("<br/>")
                                  .map((line, index) => (
                                    <React.Fragment key={index}>
                                      {line.includes("*")
                                        ? line.replace(/\*/g, "🍂")
                                        : line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            </div>
                          )}
                          {resultButton === "Lighting" && (
                            <div className="light-content">
                              <h3
                                className="py-2"
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "baloo",
                                  fontWeight: "500",
                                }}
                              >
                                Lighting Summary:
                              </h3>
                              <p>
                                {resultData.lightSummary
                                  .split("<br/>")
                                  .map((line, index) => (
                                    <React.Fragment key={index}>
                                      {line.includes("*")
                                        ? line.replace(/\*/g, "☀️")
                                        : line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            </div>
                          )}
                        </Tabs.Content>
                      ))}
                    </Tabs.Root>
                  </div>
                </div>
              </div>
            )}
          </results>
        </div>
      )}
    </div>
  );
};

export default MyGarden;
